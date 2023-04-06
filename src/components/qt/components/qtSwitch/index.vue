<template>
    <el-switch
        v-model="active"
        active-value="Y"
        inactive-value="N"
        :active-text="activeText"
        :disabled="disabled"
        @change="handleChange"
    ></el-switch>
</template>

<script>
export default {
    name: 'qtSwitch',

    props: {
        fildeName: {
            type: String
        },

        value: {
            type: [Boolean, String]
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            active: 'N',
            activeText: '否'
        };
    },

    watch: {
        value: {
            handler(type) {
                this.active = type;
                this.activeText = type === 'N' ? '否' : '是';
            },
            deep: true
        }
    },

    methods: {
        handleChange(value) {
            this.$emit('change', value, this.fildeName);
        }
    }
};
</script>
