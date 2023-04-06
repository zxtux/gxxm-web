<template>
    <div class="table-header-wrap">
        <div class="table-header-title"></div>
        <div>
            <template v-for="(item, index) in buttons">
                <qt-button
                    v-if="item.visible"
                    :button-name="item.name"
                    :icon="item.prefixIcon"
                    :key="index"
                    :disabled="item.disabled"
                    @click="_.isFunction(item.callback) ? item.callback() : null"
                />
            </template>
            <qt-button button-name="刷新" icon="el-icon-refresh" @click="refresh" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'qtPageHeader',

    inject: ['$list'],

    props: {
        buttons: {
            type: Array,
            default() {
                return [];
            }
        }
    },

    methods: {
        refresh() {
            this.$list.$refs.table.refresh();
        }
    }
};
</script>

<style lang="scss" scoped>
.table-header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    .table-header-title {
        font-size: 14px;
        color: #000;
    }
}
</style>
