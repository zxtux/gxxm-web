<template>
    <div class="qt-collapse__wrap" :class="{ 'is-mini': type === 'mini' }">
        <div class="qt-collapse__header" v-show="!headerHide">
            <div @click="toggleShow">
                <span v-html="title"></span>
                <i v-if="type !== 'mini'" :class="arrowClass"></i>
            </div>
            <span v-show="show" style="margin-right: 18px; margin-bottom: 2px;">
                <slot name="toolbar"></slot>
            </span>
        </div>
        <div class="qt-collapse__content" v-show="show">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'qtCollapse',

    props: {
        title: {
            type: String,
            required: true
        },

        visible: {
            type: Boolean,
            default: true
        },

        disabled: {
            type: Boolean,
            default: false
        },

        headerHide: {
            type: Boolean,
            default: false
        },

        type: {
            type: String,
            default: 'normal'
        }
    },

    data() {
        return {
            show: this.visible
        };
    },

    computed: {
        arrowClass() {
            return this.show ? 'el-icon-caret-bottom' : 'el-icon-caret-right';
        }
    },

    methods: {
        toggleShow() {
            if (this.disabled || this.type === 'mini') {
                return;
            }
            this.show = !this.show;
            if (this.show) {
                this.$emit('open');
            } else {
                this.$emit('hide');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.qt-collapse__header {
    font-size: 16px;
    line-height: 30px;
    padding-left: 20px;
    border-bottom: 1px solid #d6dde4;
    cursor: pointer;
    color: #9b9a9a;
    display: flex;
    justify-content: space-between;
}
.qt-collapse__content {
    margin: 5px 0;
    padding-right: 8px;
    &:before,
    &:after {
        display: table;
        content: ' ';
    }
    &:after {
        clear: both;
    }
}
.qt-collapse__wrap.is-mini .qt-collapse__header {
    font-size: 12px;
    line-height: 20px;
    border-bottom: none;
}
</style>
