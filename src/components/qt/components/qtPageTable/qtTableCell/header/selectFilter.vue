<template>
    <div class="select-filter-wrapper">
        <sort :column="column" :queryModel="queryModel" />
        <div class="select-filter-box am-center" @click.stop>
            <el-dropdown
                trigger="click"
                :hide-on-click="false"
                placement="bottom-start"
                ref="selectBox"
            >
                <el-button size="mini">
                    {{ fixedText }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu
                    trigger="click"
                    size="medium"
                    placement="bottom"
                    class="am-padding-sm"
                    :hide-on-click="false"
                >
                    <div>
                        <el-button size="mini" @click="handleSelectAll">全选</el-button>
                        <el-button size="mini" @click="handleClear">清空</el-button>
                    </div>
                    <el-checkbox-group :value="selectValue" @input="handleInput">
                        <el-dropdown-item v-for="(item, index) in options" :key="index">
                            <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
                        </el-dropdown-item>
                    </el-checkbox-group>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Sort from './sort';

export default {
    name: 'selectFilter',

    props: {
        column: {
            type: Object,
            default() {
                return {};
            }
        },

        options: {
            type: Array,
            default() {
                return [];
            }
        },

        queryModel: {
            type: Object
        }
    },

    components: {
        Sort
    },

    computed: {
        property() {
            return this.column.property;
        },

        currentQuery() {
            return this.queryModel[this.property];
        },

        selectValue() {
            if (this.currentQuery) {
                return this.currentQuery.filterValue;
            } else {
                return [];
            }
        },

        fixedText() {
            let result = '无限制';

            if (this.selectValue && this.selectValue.length) {
                result = `已选(${this.selectValue.length})`;
            }

            return result;
        }
    },

    methods: {
        handleInput(value) {
            this.queryModel[this.property].filterValue = value;
            this.$emit('search');
        },

        handleSelectAll() {
            this.queryModel[this.property].filterValue = this.options.map(item => item.value);
            this.$emit('search');
        },

        handleClear() {
            this.queryModel[this.property].filterValue = [];
            this.$emit('search');
        }
    }
};
</script>

<style lang="scss" scoped>
.select-filter-wrapper {
    overflow: hidden;
    .select-filter-box {
        width: 100%;
        .el-dropdown {
            width: 100%;
            .el-dropdown-selfdefine {
                width: 100%;
            }
        }
    }
}
.el-checkbox-group {
    margin-top: 10px;
    .el-dropdown-menu__item {
        padding: 0 1px;
        line-height: 30px;
    }
}
.el-button:focus,
.el-button:hover {
    background-color: #fff;
}
</style>
