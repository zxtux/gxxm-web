<template>
    <el-dialog
        custom-class="dialog-form"
        v-bind="$attrs"
        v-on="$listeners"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        @open="open"
    >
        <qt-form
            ref="form"
            :key="formKey"
            :config="config"
            @submit-data="submitData"
            @change="handleFormChange"
        />
        <span slot="footer" class="am-text-right">
            <qt-button button-name="确定" type="primary" icon="el-icon-check" @click="submitForm" />
            <qt-button button-name="取消" icon="el-icon-close" @click="close" />
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'qtDialogForm',

    data() {
        return {
            formKey: null
        };
    },

    props: {
        config: {
            type: Object,
            default() {
                return {};
            }
        }
    },

    activated() {
        this.formKey = new Date().getTime();
    },

    methods: {
        open() {
            this.formKey = new Date().getTime();
        },

        handleFormChange(value, fildeName) {
            this.config.formValue[fildeName] = value;
        },

        submitForm() {
            this.$refs.form.submitForm();
        },

        resetForm() {
            this.$refs.form.resetForm();
        },

        close() {
            this.resetForm();
            this.$emit('update:visible', false);
        },

        submitData(data) {
            this.$emit('submit-data', data);
            this.$emit('update:visible', false);
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .dialog-form {
    min-width: 1064px;
    .el-dialog__footer {
        border-top: 1px solid #eee;
        padding: 15px;
    }
    .el-dialog__body {
        padding: 10px 30px 0 30px;
        min-height: 30vh;
        max-height: 60vh;
        overflow: auto;
        .form-wrap {
            .form-content-wrap {
                padding: 0;
            }
        }
    }
    .el-form-item {
        width: 33.33333%;
    }
    .el-form-item__error {
        position: absolute;
        top: 100%;
        right: 0;
        left: initial;
        background: #e43f3f;
        color: #fff;
        padding: 5px 8px;
        border-radius: 4px;
    }
    .el-date-editor .el-range-separator {
        width: auto;
        padding: 0 2px;
    }
    .el-form-item.is-required:not(.is-no-asterisk)
        .el-form-item__label-wrap
        > .el-form-item__label:before,
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        color: #e43f3f;
    }
    .is-required {
        .el-form-item__label {
            color: #e43f3f;
        }
    }
}
</style>
