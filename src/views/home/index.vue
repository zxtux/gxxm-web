<template>
    <div>
        222
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {};
    },

    methods: {
        markersset() {
            // this.loadingInstance.close();
        }
    }
};
</script>

<style lang="scss" scoped>
.view__content {
    display: flex;
    .view__left {
        ::v-deep {
            .el-card__body {
                padding: 0 20px;
            }
        }
        padding: 10px 20px 100px 20px;
        background-color: #fff;
        width: 30vw;
        min-width: 600px;
        height: 100vh;
        overflow: hidden;
        &-menu {
            margin: 0 0 20px 0;
            padding-bottom: 10px;
            display: flex;
            border-bottom: 1px solid #ebeef5;
            font-size: 0;
            li {
                flex: 1;
                font-size: 16px;
                span {
                    color: #f00;
                    font-weight: 600;
                }
                &:nth-of-type(2) {
                    text-align: center;
                }
                &:last-of-type {
                    text-align: right;
                    i {
                        color: #ff9400;
                        font-size: 26px;
                        cursor: pointer;
                    }
                }
            }
        }
        .address__item-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 14px;
        }
    }
    .view__right {
        width: 70vw;
        height: 100vh;
        position: relative;
        &-map {
            width: 100%;
            height: 100%;
        }
    }
}
.view__footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 60px;
    border-top: 1px solid #ebeef5;
}
.view__footer-placeholder {
    width: 100%;
    height: 60px;
}
</style>
