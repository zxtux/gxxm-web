<template>
    <div class="time-filter-wrapper">
        <sort :column="column" :queryModel="queryModel" />
        <div class="time-filter-box am-center" @click.stop>
            <el-date-picker
                :value="timeValue"
                type="datetimerange"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :clearable="false"
                :default-time="['00:00:00', '23:59:59']"
                @input="handleInput"
                @change="handChange"
            />
            <el-button icon="el-icon-close" @click="handleClear"></el-button>
        </div>
    </div>
</template>

<script>
import Sort from './sort';

export default {
    name: 'timeFilter',

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
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        };
    },

    computed: {
        property() {
            return this.column.property;
        },

        currentQuery() {
            return this.queryModel[this.property];
        },

        timeValue() {
            if (this.currentQuery) {
                return this.currentQuery.filterValue;
            } else {
                return [];
            }
        }
    },

    methods: {
        handChange(value) {
            if (value == null) this.queryModel[this.property].filterValue = [];
        },

        handleInput(value) {
            this.queryModel[this.property].filterValue = value;
            this.$emit('search');
        },

        handleClear() {
            if (this.queryModel[this.property].filterValue.length > 0) {
                this.queryModel[this.property].filterValue = [];
                this.$emit('search');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.time-filter-wrapper {
    overflow: hidden;
    .time-filter-box {
        .el-date-editor {
            width: 100%;
        }
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
</style>