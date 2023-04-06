<template>
    <el-input-number
        :value="value"
        :size="size"
        :step="step"
        :min="min"
        :max="max"
        :precision="precision"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="handleChange"
    ></el-input-number>
</template>

<script>
export default {
    name: 'qtNumber',

    props: {
        max: {
            type: Number,
            default: 99999999
        },

        fildeName: {
            type: String
        },

        precision: {
            type: Number
        },

        value: {
            type: [String, Number]
        },

        placeholder: {
            type: String
        },

        step: {
            type: Number
        },

        min: {
            type: Number,
            default: 0
        },

        size: {
            type: String,
            default: 'mini'
        },

        disabled: {
            type: [Boolean, String],
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
