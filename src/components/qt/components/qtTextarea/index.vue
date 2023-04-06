<template>
    <el-input
        type="textarea"
        class="textarea"
        :value="value"
        :rows="5"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="handleChange"
    ></el-input>
</template>

<script>
export default {
    name: 'qtTextarea',

    props: {
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
            this.$emit('input', value, this.fildeName);
        }
    }
};
</script>

<style lang="scss" scoped>
.textarea {
    padding-top: 8px;
}
</style>
