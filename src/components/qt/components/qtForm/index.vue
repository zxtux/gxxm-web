<!--  -->
<template>
    <el-form
        ref="ruleForm"
        label-width="135px"
        label-position="right"
        :model="config.formValue"
        :rules="config.formRules"
    >
        <template v-for="(item, index) in config.formTemplate">
            <el-form-item
                :key="index"
                :size="item.size"
                :label="item.labelName"
                :prop="item.ruleName"
                :label-width="item.labelWidth"
                :hidden="item.hidden"
            >
                <qt-input
                    v-if="item.type === 'text' || item.type === 'password'"
                    v-model="config.formValue[item.fildeName]"
                    :type="item.type"
                    :readonly="item.readonly"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :maxlength="item.maxlength"
                    @change="handleFormChange"
                />
                <qt-query-input
                    v-if="item.type === 'queryInput'"
                    v-model="config.formValue[item.fildeName]"
                    :readonly="item.readonly"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :maxlength="item.maxlength"
                    :columns="item.columns"
                    :fetch-api="item.fetchApi"
                    :change-field="item.changeField"
                    @change="handleFormChange"
                />
                <qt-number
                    v-if="item.type === 'number'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :disabled="item.disabled"
                    :max="item.max"
                    :precision="item.precision"
                    @change="handleFormChange"
                />
                <qt-switch
                    v-if="item.type === 'switch'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :disabled="item.disabled"
                    @change="handleFormChange"
                />
                <qt-select
                    v-if="item.type === 'select'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :key-name="item.keyName"
                    :placeholder="item.placeholder"
                    :multiple="item.multiple"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :data-source="item.dataSource"
                    :filter-value="item.filterValue"
                    @change="handleFormChange"
                />
                <qt-select
                    v-else-if="item.type === 'multipleSelect'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :multiple="item.multiple"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :data-source="item.dataSource"
                    :filter-value="item.filterValue"
                    @change="handleFormChange"
                />
                <qt-select-city
                    v-if="item.type === 'selectCity'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    @change="handleFormChange"
                />
                <qt-date
                    v-else-if="item.type === 'date' || item.type === 'datetime'"
                    v-model="config.formValue[item.fildeName]"
                    :type="item.type"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :readonly="item.readonly"
                    :default-value="item.defaultValue"
                    :is-show-options="item.isShowOptions"
                    @change="handleFormChange"
                />
                <qt-date
                    v-else-if="item.type === 'daterange'"
                    :type="item.type"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :start-placeholder="item.startPlaceholder"
                    :end-placeholder="item.endPlaceholder"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :readonly="item.readonly"
                    :default-value="item.defaultValue"
                    :is-show-options="item.isShowOptions"
                    :value="config.formValue[item.fildeName]"
                    @change="handleFormChange"
                />
                <qt-textarea
                    v-if="item.type === 'textarea'"
                    v-model="config.formValue[item.fildeName]"
                    :filde-name="item.fildeName"
                    :placeholder="item.placeholder"
                    :readonly="item.readonly"
                    :clearable="item.clearable"
                    :disabled="item.disabled"
                    :maxlength="item.maxlength"
                    @change="handleFormChange"
                />
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
export default {
    name: 'qtForm',

    props: {
        config: {
            type: Object
        }
    },

    methods: {
        handleFormChange(value, fildeName) {
            this.$emit('change', value, fildeName);
        },

        submitForm() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.validate();
                } else {
                    return false;
                }
            });
        },

        validate() {
            for (const i in this.config.formValue) {
                if (i === 'undefined') {
                    Reflect.deleteProperty(this.config.formValue, i);
                }
            }

            this.$emit('submit-data', this.config.formValue);
        },

        resetForm() {
            this.$refs['ruleForm'].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
$error-color: #e43f3f;

.el-form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
::v-deep {
    .el-cascader,
    .el-select,
    .el-input,
    .el-date-editor,
    .el-input-number,
    .el-date-editor.el-input,
    .el-range-editor.el-input__inner {
        width: 100%;
    }
    .el-form-item__content .el-input-group {
        vertical-align: middle;
    }
    .el-form-item.is-required:not(.is-no-asterisk)
        .el-form-item__label-wrap
        > .el-form-item__label:before,
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        color: $error-color;
    }
    .is-required {
        .el-form-item__label {
            color: $error-color;
        }
    }
}
.el-form-item {
    margin-bottom: 15px;
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
@media only screen and (min-width: 768px) {
    .el-form-item {
        width: 50%;
    }
}
@media only screen and (min-width: 1024px) {
    .el-form-item {
        width: 33.33333%;
    }
}
@media only screen and (min-width: 1600px) {
    .el-form-item {
        width: 25%;
    }
}
</style>
