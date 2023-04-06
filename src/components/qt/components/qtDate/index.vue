<template>
    <el-date-picker
        v-if="type == 'date'"
        value-format="yyyy-MM-dd"
        type="date"
        :value="value"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :picker-options="pickerOptions"
        @input="handleChange"
        @clear="handleClear"
    ></el-date-picker>
    <el-date-picker
        v-else-if="type == 'datetime'"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        :value="value"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :picker-options="pickerOptions"
        @input="handleChange"
        @clear="handleClear"
    ></el-date-picker>
    <el-date-picker
        v-else-if="type == 'daterange'"
        unlink-panels
        range-separator="至"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        :value="value"
        :size="size"
        :default-time="['00:00:00', '23:59:59']"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :clearable="clearable"
        :disabled="disabled"
        :readonly="readonly"
        :picker-options="pickerOptions"
        @input="handleChange"
        @clear="handleClear"
    ></el-date-picker>
</template>

<script>
export default {
    name: 'qtDate',

    props: {
        type: {
            type: String
        },

        fildeName: {
            type: String
        },

        value: {
            type: [String, Date, Array]
        },

        defaultValue: {
            type: [String, Date, Array]
        },

        placeholder: {
            type: String
        },

        startPlaceholder: {
            type: String
        },

        endPlaceholder: {
            type: String
        },

        size: {
            type: String,
            default: 'mini'
        },

        clearable: {
            type: Boolean,
            default: true
        },

        disabled: {
            type: [Boolean, String],
            default: false
        },

        readonly: {
            type: Boolean,
            default: false
        },

        isShowOptions: {
            type: [Boolean, String],
            default: false
        }
    },

    data() {
        return {
            pickerOptions: {},

            dateOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },

                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },

            daterangeOptions: {
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

    created() {
        this.initOptions();
    },

    methods: {
        initOptions() {
            if (this.isShowOptions) {
                if (this.type === 'date') {
                    const options = Object.assign({}, this.dateOptions);
                    this.pickerOptions = options;
                } else {
                    const options = Object.assign({}, this.daterangeOptions);
                    this.pickerOptions = options;
                }
            } else {
                this.pickerOptions = {};
            }
        },

        handleChange(value) {
            this.$emit('change', value, this.fildeName);
        },

        handleClear() {
            this.$emit('change', '', this.fildeName);
        }
    }
};
</script>
