<template>
    <div>
        <el-input
            autocomplete="off"
            :size="size"
            :value="value"
            :clearable="clearable"
            :disabled="disabled"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :readonly="readonly"
        >
            <el-button slot="append" icon="el-icon-search" @click="showDialog" />
        </el-input>
        <component
            :is="currentDialog.component"
            v-bind="currentDialog.bind"
            v-on="currentDialog.on"
        />
    </div>
</template>

<script>
export default {
    name: 'qtQueryInput',

    props: {
        columns: {
            type: Array,
            default() {
                return [];
            }
        },

        fetchApi: {
            type: String
        },

        maxlength: {
            type: Number
        },

        value: {
            type: [String, Number]
        },

        placeholder: {
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

        changeField: {
            type: Object
        },

        readonly: {
            type: Boolean,
            default: false
        },

        index: {
            type: Number,
            default: -1
        }
    },

    data() {
        return {
            currentDialog: {}
        };
    },

    methods: {
        showDialog() {
            this.currentDialog = {
                component: 'qtDialogTable',
                bind: {
                    visible: true,
                    showClose: false,
                    fetchApi: this.fetchApi,
                    columns: this.columns,
                    width: '70%',
                    appendToBody: true
                },
                on: {
                    'update:visible': () => {
                        const { bind } = this.currentDialog;
                        bind.visible = false;
                    },
                    'hook:updated': () => {
                        if (!this.currentDialog.bind.visible) {
                            this.$nextTick(() => {
                                this.currentDialog = {};
                            });
                        }
                    },
                    'get-field-data': this.getFieldData
                }
            };
        },

        getFieldData(value) {
            for (let i in this.changeField) {
                this.$emit('change', value[this.changeField[i]], i, this.index,value);
            }
        }
    }
};
</script>
