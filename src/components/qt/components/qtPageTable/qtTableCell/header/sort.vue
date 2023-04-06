<template>
    <div class="sort-box">
        <span class="sort-title" @click="handleClick">{{column.title}}</span>
        <span class="sort-icon-box">
            <i
                class="sort-caret ascending"
                :class="{active: ascActive}"
                @click.stop="handleSortChange('asc')"
            ></i>
            <i
                class="sort-caret descending"
                :class="{active: descActive}"
                @click.stop="handleSortChange('desc')"
            ></i>
        </span>
    </div>
</template>

<script>
export default {
    name: 'sort',

    inject: ['$pageTable'],

    props: {
        column: {
            type: Object,
            default() {
                return {};
            }
        },

        queryModel: {
            type: Object
        }
    },

    computed: {
        ascActive() {
            return this.queryModel.sort.prop === this.column.property && this.queryModel.sort.order === 'asc';
        },

        descActive() {
            return this.queryModel.sort.prop === this.column.property && this.queryModel.sort.order === 'desc';
        }
    },

    methods: {
        handleSortChange(value) {
            this.queryModel.sort.prop = this.column.property;
            this.queryModel.sort.order = value;

            this.$pageTable.$refs.table.sort(this.column.property, value);
        },

        handleClick() {
            let value = '';

            if (this.ascActive) {
                value = 'desc';
            } else {
                value = 'asc';
            }

            this.handleSortChange(value);
        }
    }
};
</script>

<style lang="scss" scoped>
$defultColor: #c0c4cc;
$color: #409eff;

.sort-box {
    text-align: center;
    .sort-title {
        color: #909399;
        text-align: center;
        font-size: 12px;
    }
    .sort-icon-box {
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        height: 22px;
        width: 16px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: relative;
        top: -1px;
        left: 2px;
        .sort-caret {
            width: 0;
            height: 0;
            border: 5px solid transparent;
            &.ascending {
                border-bottom-color: $defultColor;
                &.active {
                    border-bottom-color: $color;
                }
            }
            &.descending {
                border-top-color: $defultColor;
                &.active {
                    border-top-color: $color;
                }
            }
        }
    }
}
</style>