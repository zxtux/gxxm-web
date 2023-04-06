<template>
    <el-input
        autocomplete="off"
        :size="size"
        :value="value"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :readonly="readonly"
        :show-password="type === 'password'"
        @input="handleChange"
    />
</template>

<script>
export default {
    name: 'qtInput',

    props: {
        type: {
            type: String
        },

        maxlength: {
            type: Number
        },

        fildeName: {
            type: String
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

        readonly: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleChange(value) {
            this.$emit('change', value, this.fildeName);
        }
    }
};
</script>
