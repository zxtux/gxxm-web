<template>
    <el-select
        :value="valueStr"
        :size="size"
        :multiple="multiple"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
        :filterable="filterable"
        @change="handleChange"
        @clear="handleChange"
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'qtSelect',

    props: {
        fildeName: {
            type: String
        },

        value: {
            type: [String, Number, Boolean, Array]
        },

        multiple: {
            type: Boolean
        },

        keyName: {
            type: String
        },

        size: {
            type: String,
            default: 'mini'
        },

        placeholder: {
            type: String
        },

        clearable: {
            type: Boolean,
            default: true
        },

        disabled: {
            type: [Boolean, String],
            default: false
        },

        dataSource: {
            type: Array,
            default() {
                return [];
            }
        },

        filterable: {
            type: Boolean,
            default: true
        },

        filterValue: {
            type: [String, Array]
        }
    },

    data() {
        return {
            options: []
        };
    },

    computed: {
        ...mapState('common', ['dataDictionary']),

        valueStr() {
            if (this.value === null || this.value === undefined) {
                return undefined;
            } else {
                return String(this.value);
            }
        }
    },

    created() {
        if (this.dataSource.length > 0) {
            this.options = this.dataSource;
        } else {
            this.getOptionsFromLocal();
        }
    },

    methods: {
        handleChange(value) {
            this.$emit('change', value, this.fildeName);
        },

        getOptionsFromLocal() {
            const dataDictionary = this._.cloneDeep(this.dataDictionary) || [];
            const currentDic = dataDictionary.filter(item => item.CodeKey === this.keyName);

            if (currentDic.length) {
                const codeValue = currentDic[0].CodeValue;

                this.options = codeValue.map(value => {
                    return (value = {
                        label: value.CODE_NAME,
                        value: value.CODE_ID
                    });
                });

                if (Array.isArray(this.filterValue)) {
                    this.options = this.options.filter(item => {
                        return !this.filterValue.includes(item.label);
                    });
                } else if (Object.prototype.toString.call(this.filterValue) == '[object String]') {
                    this.options = this.options.filter(item => {
                        return item.label !== this.filterValue;
                    });
                }
            } else {
                console.log(`${this.keyName} 暂无数据！`);
            }
        }
    }
};
</script>
