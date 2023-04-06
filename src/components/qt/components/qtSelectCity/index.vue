<template>
    <el-cascader
        v-bind="$attrs"
        v-on="$listeners"
        size="mini"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :clearable="clearable"
        :props="propsData"
        @visible-change="visibleChange"
    />
</template>

<script>
export default {
    name: 'qtSelectCity',

    props: {
        fildeName: {
            type: String
        },

        value: {
            type: [String, Object, Number, Boolean, Array]
        },

        placeholder: {
            type: String
        },

        clearable: {
            type: Boolean,
            default: true
        },

        disabled: {
            type: [Boolean, String],
            default: false
        }
    },

    computed: {
        propsData() {
            const _this = this;

            return {
                label: 'label',
                value: 'value',
                children: 'cities',
                checkStrictly: true,
                lazy: true,
                lazyLoad(node, resolve) {
                    const { level, value } = node;

                    switch (level) {
                        case 0:
                            _this.getAllProvince().then(res => {
                                resolve(res);
                            });
                            break;
                        case 1:
                            _this.getSelectProvince(value).then(res => {
                                resolve(res);
                            });
                            break;
                        case 2:
                            _this.getSelectCity(value).then(res => {
                                resolve(res);
                            });
                            break;
                    }
                }
            };
        }
    },

    methods: {
        visibleChange(state) {
            if (!state) {
                this.$emit('change', this.value, this.fildeName);
            }
        },

        async getAllProvince() {
            let res = await this.$http.fetchData({
                url: 'AdjustWavePlan/GetAllProvince',
                type: 2
            });

            res = res.map(name => {
                return {
                    value: name,
                    label: name
                };
            });

            return res;
        },

        async getSelectProvince(province) {
            let res = await this.$http.fetchData({
                url: 'AdjustWavePlan/GetCityByProvince',
                type: 2,
                params: {
                    province
                }
            });

            if (res.length) {
                res = res.map(name => {
                    return {
                        value: name,
                        label: name,
                        leaf: 0
                    };
                });
            }

            return res;
        },

        async getSelectCity(city) {
            let res = await this.$http.fetchData({
                url: 'AdjustWavePlan/GetCountyByCity',
                type: 2,
                params: {
                    city
                }
            });

            if (res.length) {
                res = res.map(name => {
                    return {
                        value: name,
                        label: name,
                        leaf: 1
                    };
                });
            }

            return res;
        }
    }
};
</script>
