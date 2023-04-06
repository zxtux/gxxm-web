<template>
    <div class="tabs-wrap" ref="wrap">
        <el-tabs v-model="activeName" class="tabs-content-wrap">
            <el-tab-pane
                v-for="(item, index) in tabsList"
                :key="index"
                :label="item.label"
                :name="item.name"
            />
        </el-tabs>
        <div class="tabs-button-wrap">
            <template v-for="(item, index) in buttons">
                <qt-button
                    v-if="item.visible"
                    :key="index"
                    :size="item.size"
                    :icon="item.prefixIcon"
                    :button-name="item.name"
                    @click="_.isFunction(item.callback) ? item.callback() : null"
                />
            </template>
        </div>
        <div v-for="item in tabsList" :key="item.name">
            <component
                v-if="activeName === item.name"
                v-bind="item.dataSource.props"
                v-on="item.dataSource.on"
                :is="item.dataSource.component"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'qtPageTabs',

    props: {
        tabsList: {
            type: Array,
            default() {
                return [];
            }
        },

        buttons: {
            type: Array,
            default() {
                return [];
            }
        }
    },

    data() {
        return {
            activeName: null
        };
    },

    watch: {
        activeName: {
            handler(value) {
                this.$emit('get-active-name', value);
            },
            deep: true,
            immediate: true
        }
    },

    mounted() {
        this.activeName = this.tabsList[0].name;
    }
};
</script>

<style lang="scss" scoped>
.tabs-wrap {
    display: flex;
    flex-direction: column;
    position: relative;
    .form-button-wrap {
        bottom: 0 !important;
    }
    ::v-deep .el-tabs__content {
        padding: 0 !important;
    }
    ::v-deep .el-tabs__active-bar {
        bottom: 1px;
    }
    .tabs-button-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .tabs-content-wrap {
        overflow: hidden;
        ::v-deep .el-tabs__nav-wrap::after {
            background: transparent;
        }
        ::v-deep .el-tabs__header {
            margin: 0;
        }
        ::v-deep .el-tabs__item {
            font-weight: initial;
        }
    }
}
</style>
