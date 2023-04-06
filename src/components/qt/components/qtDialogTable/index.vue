<template>
    <el-dialog
        v-bind="$attrs"
        v-on="$listeners"
        custom-class="dialog-table-wrap"
        :title="title"
        :close-on-click-modal="false"
        @open="open"
    >
        <qt-page-table
            ref="table"
            :key="tableKey"
            :is-dialog="true"
            :fetch-api="fetchApi"
            :query-params="queryParams"
            :columns="columns"
            :single="single"
            :auto-resize="true"
            :page-info="pageInfo"
            @selection="selection"
            @cell-click="isSingle"
        />
        <span slot="footer">
            <qt-button button-name="关 闭" icon="el-icon-close" @click="close" />
            <qt-button
                v-if="!single"
                button-name="确 定"
                type="primary"
                icon="el-icon-check"
                @click="save"
            />
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'qtDialogTable',

    props: {
        columns: {
            type: Array,
            default() {
                return [];
            }
        },

        pageInfo: Object,

        title: {
            type: String,
            default: '请选择'
        },

        queryParams: {
            type: Array,
            default() {
                return [];
            }
        },

        fetchApi: {
            type: String,
            default: ''
        },

        single: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            tableKey: null,
            selections: []
        };
    },

    computed: {
        isSingle() {
            return this.single
                ? row => {
                      this.cellClickEvent(row);
                  }
                : () => {
                      event.stopPropagation();
                  };
        }
    },

    methods: {
        open() {
            this.selections = [];
            this.tableKey = new Date().getTime();
        },

        close() {
            this.$emit('update:visible', false);
        },

        selection(value) {
            this.selections = value;
        },

        save() {
            if (this.selections.length === 0) {
                return this.$notify.warning({
                    title: '提示',
                    message: '请至少选择一个'
                });
            }

            this.$emit('get-field-data', this.selections);
            this.close();
        },

        cellClickEvent({ row }) {
            this.$emit('get-field-data', row);
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .dialog-table-wrap {
    .el-dialog__header {
        padding: 20px 20px 0;
    }
    .el-dialog__footer {
        padding: 15px;
    }
    .el-dialog__body {
        padding: 15px 15px 0 15px;
        height: 60vh;
        overflow: auto;
    }
}
</style>
