<template>
    <div class="page-wrap" ref="wrap">
        <vxe-grid
            v-if="!errorMsg"
            ref="table"
            border
            resizable
            highlight-hover-row
            show-overflow
            header-cell-class-name="page-table-header-cell"
            :height="height"
            :loading="loading"
            :checkbox-config="checkboxConfig"
            :sort-config="{ showIcon: false }"
            :data="dataSource"
            :context-menu="{ body: { options: buttons }, visibleMethod, className: 'context-menu' }"
            :columns="fixedColumns"
            :seq-config="{ startIndex: (tablePage.currentPage - 1) * tablePage.pageSize }"
            :pager-config="{
                border: true,
                background: true,
                size: 'small',
                align: 'center',
                pageSizes: [20, 50, 100],
                layouts: [
                    'PrevJump',
                    'PrevPage',
                    'Number',
                    'NextPage',
                    'NextJump',
                    'Sizes',
                    'FullJump',
                    'Total'
                ],
                ...tablePage
            }"
            @cell-context-menu="cellContextMenuEvent"
            @cell-click="cellClickEvent"
            @context-menu-click="contextMenuClickEvent"
            @checkbox-change="checkboxChange"
            @checkbox-all="checkboxAll"
            @page-change="pageChange"
        />
        <div v-else :style="{ height: height + 'px' }" class="error">
            <span>{{ errorMsg }},请稍后再试！</span>
        </div>
    </div>
</template>

<script>
import TextFilter from './qtTableCell/header/textFilter';
import NumberFilter from './qtTableCell/header/numberFilter';
import TimeFilter from './qtTableCell/header/timeFilter';
import SelectFilter from './qtTableCell/header/selectFilter';
import { operatorList } from './qtTableCell/header/operatorList';
import { mapState } from 'vuex';

export default {
    name: 'qtPageTable',

    data() {
        return {
            loading: false,
            dataSource: [],
            height: 'auto',
            selections: [],
            tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 20,
                perfect: true
            },
            queryModel: {},
            searchParams: [],
            errorMsg: ''
        };
    },

    props: {
        pageInfo: {
            type: Object,
            default() {
                return {
                    CurrentPage: 1,
                    PageSize: 20,
                    SortField: '',
                    SortDirection: ''
                };
            }
        },

        buttons: {
            type: Array,
            default() {
                return [];
            }
        },

        columns: {
            type: Array,
            default() {
                return [];
            }
        },

        fetchApi: {
            type: String
        },

        queryParams: {
            type: Array,
            default() {
                return [];
            }
        },

        isDialog: {
            type: Boolean,
            default: false
        },

        single: {
            type: Boolean,
            default: true
        }
    },

    provide() {
        return {
            $pageTable: this
        };
    },

    computed: {
        ...mapState('common', ['dataDictionary']),

        checkboxConfig() {
            return this.single && this.isDialog
                ? null
                : { trigger: 'row', highlight: true, range: true };
        },

        fixedColumns() {
            const columns = this._.cloneDeep(this.columns);

            return columns.map(item => {
                item.slots = {};
                item.sortable = true;

                this.setQuerModel(item);

                if (item.router) {
                    const { field, callback } = item.router;

                    Object.assign(item.slots, {
                        default: ({ row }) => {
                            return [
                                <a
                                    class="am-text-secondary"
                                    href="javascript:;"
                                    onClick={() => {
                                        callback(row);
                                    }}
                                >
                                    {row[field]}
                                </a>
                            ];
                        }
                    });
                }

                if (item.headerFilter) {
                    let $el = {};

                    switch (item.headerFilter) {
                        case 'textFilter':
                            $el = {
                                header: ({ column }) => {
                                    return [
                                        <TextFilter
                                            column={column}
                                            queryModel={this.queryModel}
                                            onSearch={() => {
                                                this.searchChange();
                                            }}
                                        />
                                    ];
                                }
                            };
                            break;

                        case 'numberFilter':
                            $el = {
                                header: ({ column }) => {
                                    return [
                                        <NumberFilter
                                            column={column}
                                            queryModel={this.queryModel}
                                            onSearch={() => {
                                                this.searchChange();
                                            }}
                                        />
                                    ];
                                }
                            };
                            break;

                        case 'timeFilter':
                            $el = {
                                header: ({ column }) => {
                                    return [
                                        <TimeFilter
                                            column={column}
                                            queryModel={this.queryModel}
                                            onSearch={() => {
                                                this.searchChange();
                                            }}
                                        />
                                    ];
                                }
                            };
                            break;

                        case 'selectFilter':
                            if (item.optionsKey) {
                                this.getDataDictionary(item);
                            }

                            $el = {
                                header: ({ column }) => {
                                    return [
                                        <SelectFilter
                                            column={column}
                                            queryModel={this.queryModel}
                                            options={item.filterOptions ? item.filterOptions : null}
                                            onSearch={() => {
                                                this.searchChange();
                                            }}
                                        />
                                    ];
                                }
                            };
                            break;
                    }

                    Object.assign(item.slots, $el);
                }

                return item;
            });
        }
    },

    created() {
        this.fetchList();
    },

    activated() {
        this.fetchList();
        this.$refs.table.clearCheckboxRow();

        if (
            this.isDialog
                ? this.$refs.wrap.offsetHeight
                : document.body.offsetHeight - 170 !== this.height
        ) {
            this.initHeight();
        }
    },

    mounted() {
        this.initHeight();

        window.addEventListener(
            'resize',
            this._.throttle(this.initHeight, 500, {
                leading: true,
                trailing: true
            }),
            false
        );
    },

    destroyed() {
        window.removeEventListener('resize', this.initHeight, false);
    },

    methods: {
        cellClickEvent(data) {
            this.$emit('cell-click', data);
        },

        getDataDictionary(item) {
            const optionsKey = item.optionsKey;
            const dataDictionary = this._.cloneDeep(this.dataDictionary) || [];

            let options = [];

            if (dataDictionary.length) {
                for (const data of dataDictionary) {
                    if (data.CodeKey === optionsKey) {
                        const optionsValue = data.CodeValue;

                        options = optionsValue.map(value => {
                            return (value = {
                                label: value.CODE_NAME,
                                value: value.CODE_ID
                            });
                        });
                    }
                }
            }

            item.filterOptions = options;
        },

        setQuerModel(item) {
            this.$set(this.queryModel, 'sort', {
                prop: item.field,
                order: ''
            });

            switch (item.headerFilter) {
                case 'textFilter':
                    this.$set(this.queryModel, item.field, {
                        type: 'text',
                        filterOperator: '~',
                        filterValue: ''
                    });
                    break;

                case 'numberFilter':
                    this.$set(this.queryModel, item.field, {
                        type: 'number',
                        filterOperator: '=',
                        filterValue: ''
                    });
                    break;

                case 'selectFilter':
                    this.$set(this.queryModel, item.field, {
                        type: 'select',
                        filterOperator: 'in',
                        filterValue: []
                    });
                    break;

                case 'timeFilter':
                    this.$set(this.queryModel, item.field, {
                        type: 'date',
                        filterValue: []
                    });
                    break;
            }
        },

        refresh() {
            this.fetchList();
        },

        pageChange({ currentPage, pageSize }) {
            this.tablePage.currentPage = currentPage;
            this.tablePage.pageSize = pageSize;
            this.pageInfo.CurrentPage = currentPage;
            this.pageInfo.PageSize = pageSize;

            this.fetchList();
        },

        async fetchList() {
            this.loading = true;

            try {
                const params = {
                        QueryModel: {
                            Items: [...this.queryParams, ...this.searchParams]
                        },
                        PageInfo: this.pageInfo
                    },
                    res = await this.$http.fetchList({ url: this.fetchApi, params });

                this.errorMsg = '';

                if (res.Success) {
                    this.dataSource = res.v.ListValue;
                    this.fetchTotalCount();
                } else {
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                this.errorMsg = error && error.errorMsg;
            }
        },

        async fetchTotalCount() {
            const params = {
                    QueryModel: {
                        Items: [...this.queryParams, ...this.searchParams]
                    },
                    PageInfo: {
                        ...this.PageInfo,
                        ...{
                            IsPaging: true,
                            IsGetTotalCount: true
                        }
                    }
                },
                res = await this.$http.fetchList({ url: this.fetchApi, params });

            this.loading = false;

            if (res.Success) {
                this.tablePage.total = res.v.Page.TotalCount;
            }
        },

        initHeight() {
            this.$nextTick(() => {
                const getHeight = () => {
                    return new Promise(resolve => {
                        if (this.$refs.wrap) {
                            resolve(
                                this.isDialog
                                    ? this.$refs.wrap.offsetHeight
                                    : document.body.offsetHeight - 170
                            );
                        }
                    });
                };
                getHeight().then(value => {
                    this.height = value;
                });
            });
        },

        cellContextMenuEvent({ row }) {
            this.$refs.table.setCurrentRow(row);
        },

        contextMenuClickEvent({ menu, row }) {
            if (this._.isFunction(menu.callback)) {
                if (menu.confirm) {
                    this.$confirm(`是否${menu.name}?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            menu.callback(row);
                        })
                        .catch(() => {
                            this.$message({
                                type: 'warning',
                                message: '已取消'
                            });
                        });
                } else {
                    menu.callback(row);
                }
            }
        },

        checkboxChange({ selection }) {
            this.selections = selection;
            this.$emit('selection', selection);
        },

        checkboxAll({ selection }) {
            this.selections = selection;
            this.$emit('selection', selection);
        },

        visibleMethod({ options, rowIndex }) {
            this.$refs.table.setCheckboxRow([this.dataSource[rowIndex]], true);
            this.selections = this.$refs.table.getCheckboxRecords();
            this.$emit('selection', this.selections);

            const { length } = this.selections;
            const whiteList = ['refresh', 'add'];

            options.forEach(list => {
                list.forEach(item => {
                    if (!whiteList.includes(item.code) && length === 0) {
                        item.disabled = true;
                    } else {
                        item.disabled = false;
                    }

                    if (item.type === 'single' && length > 0) {
                        item.disabled = length > 1;
                    }

                    if (item.children) {
                        item.children.forEach(itemChild => {
                            if (itemChild.type === 'single') {
                                itemChild.disabled = length > 1;
                            }
                        });
                    }
                });
            });

            return true;
        },

        searchChange() {
            this.searchParams = {};

            const tmpObj = this._.cloneDeep(this.queryModel),
                items = [];

            for (let i in tmpObj) {
                const obj = tmpObj[i];

                if (obj.type === 'date') {
                    obj.filterValue.forEach((time, index) => {
                        set(i, time, ['GreaterThanOrEqual', 'LessThanOrEqual'][index], 2);
                    });
                } else if (obj.type === 'select') {
                    set(i, obj.filterValue, obj.filterOperator);
                } else if (obj.type === 'text') {
                    set(i, obj.filterValue, obj.filterOperator);
                } else if (obj.type === 'number') {
                    set(i, obj.filterValue, obj.filterOperator);
                }
            }

            function set(key, value, operator, type = 1) {
                let groupObj = {};
                const operatorAllList = operatorList.text.concat(operatorList.number);

                Reflect.set(groupObj, 'Field', key);
                Reflect.set(
                    groupObj,
                    'Method',
                    type === 1
                        ? operatorAllList.find(item => {
                              return item.value === operator;
                          }).method
                        : operator
                );
                Reflect.set(groupObj, 'Value', value);

                items.push(groupObj);
                groupObj = {};
            }

            this.searchParams = items.filter(v => v.Value && v.Value.length);

            this.queryParams.forEach(queryItem => {
                this.searchParams.forEach((searchItem, searchIndex) => {
                    if (queryItem.Method === searchItem.Method) {
                        queryItem.Value = searchItem.Value;
                        this.searchParams.splice(searchIndex, 1);
                    }
                });
            });

            this.refresh();
        }
    }
};
</script>

<style lang="scss" scoped>
.page-wrap {
    position: relative;
    height: 100%;
    ::v-deep .vxe-pager {
        .vxe-input--inner {
            border: 1px solid #a0a2a9;
        }
    }
    ::v-deep .page-table-header-cell {
        font-size: 12px;
        text-align: center;
        color: #909399;
        background: #f5f5f5;
        padding: 4px 0 !important;
    }
    .error {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        span {
            font-size: 18px;
            color: #595959;
        }
    }
}
</style>
