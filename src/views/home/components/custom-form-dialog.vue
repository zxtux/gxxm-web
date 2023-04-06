<template>
    <el-dialog
        v-bind="$attrs"
        v-on="$listeners"
        custom-class="dialog-params-form"
        @open="open"
        @close="close"
    >
        <el-form
            ref="ruleForm"
            label-width="135px"
            label-position="right"
            :key="formKey"
            :model="formData"
        >
            <el-form-item label="添加节点方式" label-width="auto">
                <el-radio-group v-model="formData.nodeItemType" :disabled="nodeType === 'Edit'">
                    <el-radio label="1">指定地址</el-radio>
                    <el-radio label="2">承运商中转站</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="el-form-row">
                <template v-if="formData.nodeItemType === '1'">
                    <el-form-item
                        label="地址ID"
                        :prop="'LOCATION_ID'"
                        :rules="{ required: true, message: '选择地址ID', trigger: 'change' }"
                    >
                        <qt-query-input
                            placeholder="地址ID"
                            v-model="formData.LOCATION_ID"
                            fetch-api="SCM.Configration.Apis/api/BaseInfo/GetQueryLocationModeList"
                            :readonly="true"
                            :columns="[
                                { type: 'seq', width: 60, align: 'center' },
                                {
                                    field: 'ProvinceID',
                                    title: '省',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'CityID',
                                    title: '市',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'LocationName',
                                    title: '地址',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                }
                            ]"
                            :change-field="{
                                LOCATION_ID: 'LocationID',
                                LOCATION_GID: 'LocationGID',
                                LOCATION_Name: 'LocationName',
                                lat: 'Lat',
                                lng: 'Lng'
                            }"
                            @change="handleFormChange"
                        />
                    </el-form-item>
                    <el-form-item :hidden="true">
                        <qt-input
                            v-model="formData.LOCATION_GID"
                            type="text"
                            filde-name="LOCATION_GID"
                        />
                    </el-form-item>
                    <el-form-item label="地址名称">
                        <qt-input
                            v-model="formData.LOCATION_Name"
                            type="text"
                            filde-name="LOCATION_Name"
                            :disabled="true"
                        />
                    </el-form-item>
                    <el-form-item
                        label="到达日期"
                        :prop="'ARRIVED_DATE'"
                        :rules="{ required: true, message: '选择到达日期', trigger: 'change' }"
                    >
                        <qt-date
                            v-model="formData.ARRIVED_DATE"
                            type="datetime"
                            filde-name="ARRIVED_DATE"
                            :disabled="false"
                            @change="handleFormChange"
                        />
                    </el-form-item>
                    <el-form-item
                        label="承运商ID"
                        :prop="'PLAN_SP_ID'"
                        :rules="{ required: true, message: '选择运输方式', trigger: 'change' }"
                    >
                        <qt-query-input
                            placeholder="选择运输方式"
                            v-model="formData.PLAN_SP_ID"
                            fetch-api="SCM.Configration.Apis/api/BaseInfo/GetQueryServiceProviderModeList"
                            :readonly="true"
                            :columns="[
                                { type: 'seq', width: 60, align: 'center' },
                                {
                                    field: 'ServiceProviderID',
                                    title: '承运商ID',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'ServiceProviderName',
                                    title: '承运商名称',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'Province',
                                    title: '省份',
                                    width: 200, 
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'City',
                                    title: '城市',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                }
                            ]"
                            :change-field="{
                                PLAN_SP_ID: 'ServiceProviderID',
                                PLAN_SP_GID: 'ServiceProviderGID',
                                PLAN_SP_NAME: 'ServiceProviderName'
                            }"
                            @change="handleFormChange"
                        />
                    </el-form-item>
                    <el-form-item :hidden="true">
                        <qt-input
                            v-model="formData.PLAN_SP_GID"
                            type="text"
                            filde-name="PLAN_SP_GID"
                        />
                    </el-form-item>
                    <el-form-item label="承运商名称">
                        <qt-input
                            v-model="formData.PLAN_SP_NAME"
                            type="text"
                            filde-name="PLAN_SP_NAME"
                            :disabled="true"
                            :maxlength="150"
                        />
                    </el-form-item>
                </template>
                <!-- 承运商中转站 -->
                <template v-if="formData.nodeItemType === '2'">
                    <el-form-item
                        label="承运商ID"
                        :prop="'PLAN_SP_ID'"
                        :rules="{ required: true, message: '选择运输方式', trigger: 'change' }"
                    >
                        <qt-query-input
                            placeholder="选择运输方式"
                            v-model="formData.PLAN_SP_ID"
                            fetch-api="SCM.Configration.Apis/api/BaseInfo/GetQueryServiceProviderModeList"
                            :readonly="true"
                            :columns="[
                                { type: 'seq', width: 60, align: 'center' },
                                {
                                    field: 'ServiceProviderID',
                                    title: '承运商ID',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                },
                                {
                                    field: 'ServiceProviderName',
                                    title: '承运商名称',
                                    width: 200,
                                    headerFilter: 'textFilter'
                                }
                            ]"
                            :change-field="{
                                PLAN_SP_ID: 'ServiceProviderID',
                                PLAN_SP_GID: 'ServiceProviderGID',
                                PLAN_SP_NAME: 'ServiceProviderName'
                            }"
                            @change="handleFormChange"
                        />
                    </el-form-item>
                    <el-form-item :hidden="true">
                        <qt-input
                            v-model="formData.PLAN_SP_GID"
                            type="text"
                            filde-name="PLAN_SP_GID"
                        />
                    </el-form-item>
                    <el-form-item label="承运商名称">
                        <qt-input
                            v-model="formData.PLAN_SP_NAME"
                            type="text"
                            filde-name="PLAN_SP_NAME"
                            :disabled="true"
                            :maxlength="150"
                        />
                    </el-form-item>
                    <el-form-item
                        label="地址ID"
                        :prop="'LOCATION_ID'"
                        :rules="{ required: true, message: '选择地址ID', trigger: 'change' }"
                    >
                        <qt-select
                            v-model="formData.LOCATION_ID"
                            filde-name="LOCATION_ID"
                            :disabled="false"
                            :data-source="addressList"
                            @change="handleFormChange"
                            :key="formKeyaddress"
                        />
                    </el-form-item>
                    <el-form-item label="地址名称">
                        <qt-input
                            v-model="formData.LOCATION_Name"
                            type="text"
                            filde-name="LOCATION_Name"
                            :disabled="true"
                        />
                    </el-form-item>
                    <el-form-item
                        label="到达日期"
                        :prop="'ARRIVED_DATE'"
                        :rules="{ required: true, message: '选择到达日期', trigger: 'change' }"
                    >
                        <qt-date
                            v-model="formData.ARRIVED_DATE"
                            type="datetime"
                            filde-name="ARRIVED_DATE"
                            :disabled="false"
                            @change="handleFormChange"
                        />
                    </el-form-item>
                </template>
                <el-form-item label="运输方式">
                    <template v-if="transportDict.length > 0">
                        <qt-select
                            v-model="formData.PLAN_TM_GID"
                            filde-name="PLAN_TM_GID"
                            :disabled="false"
                            :data-source="transportDict"
                            @change="handleFormChange"
                        />
                    </template>
                    <template v-else>
                        <el-cascader
                            v-model="formData.PLAN_TM_GID"
                            placeholder="请选择运输方式"
                            :options="options"
                            :props="optionProps"
                            filterable
                        ></el-cascader>
                    </template>
                </el-form-item>
                <el-form-item label="执行域">
                    <qt-select
                        v-model="formData.PLAN_ASSIGN_DOMAIN"
                        filde-name="PLAN_ASSIGN_DOMAIN"
                        :disabled="false"
                        :data-source="axecute"
                        @change="handleFormChange"
                    />
                </el-form-item>
            </div>
        </el-form>

        <span slot="footer" class="am-text-right">
            <qt-button button-name="确定" type="primary" icon="el-icon-check" @click="save" />
            <qt-button button-name="取消" icon="el-icon-close" @click="close" />
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'custom-form-dialog',

    data() {
        return {
            formKey: null,
            formKeyaddress: null,
            formData: {
                LOCATION_GID: '',
                LOCATION_ID: '',
                LOCATION_Name: '',
                ARRIVED_DATE: '',
                PLAN_TM_GID: '',
                PLAN_TM_ID: '',
                PLAN_SP_GID: '',
                PLAN_SP_ID: '',
                PLAN_SP_NAME: '',
                PLAN_ASSIGN_DOMAIN: '',
                lat: '',
                lng: '',
                address: '',
                isActive: true,
                isNode: true,
                nodeItemType: '1'
            },
            transportDict: [],
            domainDict: [],
            axecute: [],
            isRequired: true,
            type: '1',
            addressList: [],
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则'
                        },
                        {
                            value: 'daohang',
                            label: '导航'
                        }
                    ]
                },
                {
                    value: 'ziyuan',
                    label: '资源',
                    children: [
                        {
                            value: 'axure',
                            label: 'Axure Components'
                        },
                        {
                            value: 'sketch',
                            label: 'Sketch Templates'
                        },
                        {
                            value: 'jiaohu',
                            label: '组件交互文档'
                        }
                    ]
                }
            ],
            optionProps: {
                checkStrictly: true,
                value: 'Value',
                label: 'Text',
                children: 'Children'
            }
        };
    },

    props: {
        nodeItem: {
            type: Object,
            default() {
                return {};
            }
        },

        nodeType: {
            type: String,
            default: 'New'
        }
    },

    created() {
        // this.getQueryTransportModeModeList();
        this.getAxecuteDomain();
        this.getQueryCascaseTransportModeList();
    },
    watch: {
        'formData.nodeItemType': {
            handler() {
                if (this.nodeType === 'New') {
                    this.formData.LOCATION_GID = this.$options.data.call(
                        this
                    ).formData.LOCATION_GID;
                    this.formData.LOCATION_ID = this.$options.data.call(this).formData.LOCATION_ID;
                    this.formData.LOCATION_Name = this.$options.data.call(
                        this
                    ).formData.LOCATION_Name;
                    this.formData.ARRIVED_DATE = this.$options.data.call(
                        this
                    ).formData.ARRIVED_DATE;
                    this.formData.PLAN_TM_GID = this.$options.data.call(this).formData.PLAN_TM_GID;
                    this.formData.PLAN_TM_ID = this.$options.data.call(this).formData.PLAN_TM_ID;
                    this.formData.PLAN_SP_GID = this.$options.data.call(this).formData.PLAN_SP_GID;
                    this.formData.PLAN_SP_ID = this.$options.data.call(this).formData.PLAN_SP_ID;
                    this.formData.PLAN_SP_NAME = this.$options.data.call(
                        this
                    ).formData.PLAN_SP_NAME;
                    this.formData.PLAN_ASSIGN_DOMAIN = this.$options.data.call(
                        this
                    ).formData.PLAN_ASSIGN_DOMAIN;
                }
            },
            deep: true
        }
    },

    methods: {
        // async getQueryTransportModeModeList() {
        //     const res = await this.$http.fetchData({
        //         url: 'SCM.Configration.Apis/api/BaseInfo/GetQueryTransportModeModeList',
        //         params: {"v": {
        //                 QueryModel: {
        //                     Items: []
        //                 },
        //                 PageInfo: {
        //                     CurrentPage: 1,
        //                     PageSize: 50,
        //                     SortField: "CreatedDate",
        //                     SortDirection: "DESC",
        //                     IsPaging: true,
        //                     IsGetTotalCount: false
        //                 }
        //             },}
        //     });

        //     this.transportDict = res.v.ListValue.map(v => {
        //         return {
        //             label: v.TransportModeID,
        //             value: v.TransportModeGID
        //         };
        //     });
        // },
        async getQueryCascaseTransportModeList() {
            const res = await this.$http.fetchData({
                url: 'SCM.Configration.Apis/api/BaseInfo/GetQueryCascaseTransportModeList',
                params: ''
            });
            if (res.v.length === 1) {
                this.transportDict = res.v[0].Children.map(v => {
                    return {
                        label: v.Text,
                        value: v.Value
                    };
                });
            } else {
                this.options = res.v;
            }
        },

        async getAxecuteDomain() {
            const res = await this.$http.fetchData({
                url: 'SCM.RoleManage.Apis/Api/Domain/GetAllQueryDomainList',
                params: ''
            });

            this.axecute = res.v.map(v => {
                return {
                    label: v.DomainName,
                    value: v.DomainName
                };
            });
        },
        async getQuerySpTransferLocationListBySpGID() {
            const res = await this.$http.fetchData({
                url: 'SCM.Configration.Apis/api/BaseInfo/GetQuerySpTransferLocationListBySpGID',
                params: {
                    v: this.formData.PLAN_SP_GID,
                    lg: 'zh_cn'
                }
            });
            this.addressAllCollection = res.v;
            if (res.v.length === 1) {
                let addressObject = res.v[0];
                this.formData.LOCATION_ID = addressObject.LocationID;
                this.formData.LOCATION_GID = addressObject.LOCATION_GID;
                this.formData.LOCATION_Name = addressObject.LocationName;
                this.formData.address =
                    addressObject.ProvinceID +
                    addressObject.CityID +
                    addressObject.CountyID +
                    addressObject.Address;
                this.formData.lat = addressObject.Lat;
                this.formData.lng = addressObject.Lng;
            }
            this.addressList = res.v.map(v => {
                return {
                    label: v.LocationID,
                    value: v.LocationID
                };
            });
            this.formKeyaddress = new Date().getTime();
        },

        handleFormChange(value, fildeName, index, row) {
            console.log(index);
            this.formData[fildeName] = value;
            if (this.formData.nodeItemType === '1') {
                if (fildeName === 'LOCATION_ID') {
                    this.formData.address = row.ProvinceID + row.CityID + row.LocationName;
                    this.formData.isActive = true;
                }
            } else {
                if (fildeName === 'PLAN_SP_ID') {
                    this.$nextTick(() => {
                        this.getQuerySpTransferLocationListBySpGID();
                    });
                }
                if (fildeName === 'LOCATION_ID') {
                    let addressObject = this.addressAllCollection.find(v => v.LocationID === value);
                    this.formData.LOCATION_GID = addressObject.LOCATION_GID;
                    this.formData.LOCATION_Name = addressObject.LocationName;
                    this.formData.address =
                        addressObject.ProvinceID +
                        addressObject.CityID +
                        addressObject.CountyID +
                        addressObject.Address;
                    this.formData.lat = addressObject.Lat;
                    this.formData.lng = addressObject.Lng;
                }
            }
        },
        open() {
            this.formKey = new Date().getTime();
            if (this.nodeType === 'New') {
                this.formData.nodeItemType = '1';
            } else {
                this.formData = this.nodeItem;
            }
        },

        save() {
            console.log(this.formData);
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    this.$emit('save', this.formData);
                    this.close();
                } else {
                    return false;
                }
            });
        },

        close() {
            this.$emit('update:visible', false);
            this.formData = this.$options.data.call(this).formData;
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .dialog-params-form {
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
    }
    .el-form-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .el-form-row-button {
        height: 42px;
        display: flex;
        align-items: center;
    }
    .el-form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .el-form-item__content .el-input-group {
        vertical-align: middle;
    }
    .el-form-item {
        width: 33.33333%;
    }
    .el-input,
    .el-select,
    .el-date-editor,
    .el-input-number,
    .el-date-editor.el-input,
    .el-range-editor.el-input__inner {
        width: 100%;
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
    .el-cascader {
        width: 100%;
    }
    .el-cascader .el-input__inner {
        height: 28px;
        line-height: 28px;
    }
}
</style>
