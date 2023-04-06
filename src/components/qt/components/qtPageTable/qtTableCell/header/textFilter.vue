<template>
    <div class="text-filter-wrapper">
        <sort :column="column" :queryModel="queryModel" />
        <div class="text-filter-input-box am-center">
            <el-dropdown
                trigger="click"
                placement="bottom-start"
                size="small"
                @command="handleCommand"
            >
                <el-button>{{ selectOperator }}</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in list.text"
                        :command="item.value"
                        :key="index"
                    >
                        {{ item.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-input
                size="mini"
                :value="inputData"
                @keyup.enter.native="enterSearch"
                @input="handleInput"
            />
            <div @click="handleClear">
                <el-button icon="el-icon-close" />
            </div>
        </div>
    </div>
</template>

<script>
import { operatorList as list } from './operatorList';
import Sort from './sort';

export default {
    name: 'textFilter',

    props: {
        column: {
            type: Object,
            default() {
                return {};
            }
        },

        queryModel: {
            type: Object
        }
    },

    components: {
        Sort
    },

    data() {
        return {
            list
        };
    },

    computed: {
        property() {
            return this.column.property;
        },

        currentQuery() {
            return this.queryModel[this.property];
        },

        inputData() {
            if (this.currentQuery) {
                return this.currentQuery.filterValue.trim();
            } else {
                return '';
            }
        },

        selectOperator() {
            if (this.currentQuery) {
                return this.currentQuery.filterOperator;
            } else {
                return '';
            }
        }
    },

    methods: {
        handleCommand(value) {
            this.queryModel[this.property].filterOperator = value;
        },

        enterSearch() {
            this.$emit('search');
        },

        handleInput(value) {
            this.queryModel[this.property].filterValue = value;
        },

        handleClear() {
            if (this.queryModel[this.property].filterValue) {
                this.queryModel[this.property].filterValue = '';
                this.$emit('search');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.text-filter-wrapper {
    overflow: hidden;
    .text-filter-input-box {
        .el-button {
            padding: 0;
            width: 24px;
            height: 24px;
            margin: 2px;
            border-color: transparent;
            background-color: #f5f5f5;
            color: #909399;
            &:hover {
                color: #409eff;
                border-color: #c6e2ff;
                background-color: #ecf5ff;
            }
        }
    }
}
::v-deep .el-input__inner {
    padding: 0 5px;
}
</style>
