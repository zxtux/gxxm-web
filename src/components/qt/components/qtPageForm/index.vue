<template>
    <div class="form-wrap" ref="wrap">
        <div :class="{ 'form-button-wrap': isButtons }">
            <template v-for="(item, index) in buttons">
                <qt-button
                    v-if="item.visible"
                    :key="index"
                    :size="item.size"
                    :icon="item.prefixIcon"
                    :button-name="item.name"
                    @click="_.isFunction(item.callback) ? item.callback() : null"
                ></qt-button>
            </template>
        </div>
        <div class="form-content-wrap" :style="{ height: height + 'px' }">
            <qt-collapse title="基础信息">
                <qt-form
                    ref="form"
                    :config="config"
                    @submit-data="submitData"
                    @change="handleFormChange"
                />
            </qt-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: 'qtPageForm',

    props: {
        buttons: {
            type: Array
        },

        config: {
            type: Object
        },

        isDialog: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            height: null
        };
    },

    computed: {
        isButtons() {
            if (this.buttons) {
                return true;
            } else {
                return false;
            }
        }
    },

    activated() {
        if (
            this.isDialog
                ? this.$refs.wrap.offsetHeight
                : document.body.offsetHeight - 178 !== this.height
        ) {
            this.initHeight();
        }
    },

    mounted() {
        this.initHeight();

        window.addEventListener(
            'resize',
            this._.throttle(this.initHeight, 500, {
                leading: true,
                trailing: true
            }),
            false
        );
    },

    destroyed() {
        window.removeEventListener('resize', this.initHeight, false);
    },

    methods: {
        handleFormChange(value, fildeName) {
            this.$emit('change', value, fildeName);
        },

        submitData(data) {
            this.$emit('submit-data', data);
        },

        resetForm() {
            this.$refs.form.resetForm();
        },

        submitForm() {
            this.$refs.form.submitForm();
        },

        initHeight() {
            this.$nextTick(() => {
                const getHeight = () => {
                    return new Promise(resolve => {
                        if (this.$refs.wrap) {
                            resolve(
                                this.isDialog
                                    ? this.$refs.wrap.offsetHeight
                                    : document.body.offsetHeight - 178
                            );
                        }
                    });
                };

                getHeight().then(value => {
                    this.height = value;
                });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.form-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .form-button-wrap {
        margin-bottom: 10px;
        text-align: right;
    }
    .form-content-wrap {
        padding: 20px;
        background: #fff;
        overflow-y: scroll;
    }
    ::v-deep .el-form {
        margin-top: 10px;
    }
    ::v-deep .el-form-item__content .el-input-group {
        vertical-align: middle;
    }
}
</style>
