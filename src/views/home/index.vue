<template>
    <div>
        <div class="view__content">
            <div class="view__left">
                <ul class="view__left-menu">
                    <li>
                        总段数：
                        <span v-if="nodeList.length">{{ nodeList.length - 1 }}</span>
                        段
                    </li>
                    <li>
                        总里程：
                        <span>{{ km }}</span>
                        公里
                    </li>
                    <li><i class="el-icon-circle-plus" @click="addNode" /></li>
                </ul>
                <el-scrollbar style="height: 100%;">
                <el-timeline>
                    <draggable
                        v-model="nodeList"
                        handle=".address__item-card-menu--sort"
                        group="list"
                        :animation="150"
                        filter=".forbid"
                        :move="onMove"
                    >
                        <el-timeline-item
                            v-for="(v, i) in nodeList"
                            placement="top"
                            :timestamp="v.ARRIVED_DATE"
                            :key="i"
                            :class="!v.isNode?'forbid':''"
                        >
                            <div @mouseenter="onMouseover(v)" @mouseleave="onMouseleave(v)">
                                <el-card shadow="hover">
                                    <div slot="header" class="address__item-card">
                                        <span>{{ v.title?v.title:'途径点'+i}}</span>
                                        <div
                                            v-if="v.isNode"
                                            v-show="v.isActive"
                                            class="address__item-card-menu"
                                        >
                                            <el-button
                                                type="primary"
                                                icon="el-icon-edit"
                                                circle
                                                @click="editNode(v)"
                                            />
                                            <el-button
                                                v-if="nodeList.length > 1"
                                                type="danger"
                                                icon="el-icon-delete"
                                                circle
                                                slot="reference"
                                                @click="delNode(i)"
                                            />
                                            <el-button
                                                class="address__item-card-menu--sort"
                                                type="info"
                                                icon="el-icon-sort"
                                                circle
                                            />
                                        </div>
                                    </div>
                                    <p>{{ v.address }}</p>
                                </el-card>
                            </div>
                        </el-timeline-item>
                    </draggable>
                </el-timeline>
                </el-scrollbar>
            </div>
            <div class="view__right">
                <baidu-map
                    class="view__right-map"
                    :center="{ lng: 0, lat: 0 }"
                    :zoom="3"
                    @ready="readyMap"
                >
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" />
                    <bm-driving
                        ref="driving"
                        :start="driving.start"
                        :end="driving.end"
                        :auto-viewport="true"
                        :panel="false"
                        :waypoints="driving.waypoints"
                        @markersset="markersset"
                        @resultshtmlset="resultshtmlset"
                    />
                </baidu-map>
            </div>
        </div>
        <div class="view__footer-placeholder" />
        <div class="view__footer">
            <el-button type="primary" plain @click="submit">提交</el-button>
            <el-button plain @click="checkOut">退出</el-button>
        </div>
        <custom-form-dialog
            ref="customFormDialogRef"
            width="70%"
            append-to-body
            :title="title"
            :visible.sync="customFormVisible"
            :node-type="nodeType"
            :nodeItem="nodeItem"
            @save="customFormDialogSave"
        />
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import Draggable from 'vuedraggable';
import config from './config';
import CustomFormDialog from './components/custom-form-dialog';

export default {
    name: 'home',

    components: {
        Draggable,
        CustomFormDialog
    },

    data() {
        return {
            nodeType: 'New',
            config,
            loadingInstance: null,
            nodeList: [],
            customFormVisible: false,
            driving: {
                start: {},
                end: {},
                waypoints: []
            },
            km: '0',
            nodeItem:{}
        };
    },

    computed: {
        title() {
            return this.nodeType === 'New' ? '添加节点' : '编辑节点';
        }
    },

    mounted() {
        this.loading('地图初始化中...');
    },

    methods: {
        resultshtmlset(val) {
            let o = document.createElement('div').appendChild(val).innerHTML;
            if (o.includes(`<div class="suggest-plan-des">`)) {
                let d = o.split(`<div class="suggest-plan-des">`)[1];
                if(d.includes('公里')){
                   this.km=d.split('公里')[0]; 
                }else{
                    if(d.includes('米')){
                       this.km=d.split('米')[0]/1000;
                    }
                }
            }
        },

        async getOmSplitInitDTO() {
            const res = await this.$http.fetchData(
                {
                    url: 'SCM.TMS7.Apis/Api/Plan/GetOmSplitInitDTO',
                    params: {
                        v: this.$route.query.gid
                    }
                },
                { show: true }
            );

            const { Address } = res.v;

            this.nodeList.push({
                isNode:false,
                isActive: false,
                ARRIVED_DATE: res.v.LatePickUpDate,
                title: '起始地',
                lat: Address.SRC_LATITUED,
                lng: Address.SRC_LONGITUDE,
                address:
                    Address.SRC_PROVINCE +
                   (Address.SRC_CITY || '')+
                   (Address.SRC_COUNTY_ID || '') +
                   (Address.SRC_ADDRESS || '')
            });
            this.nodeList.push({
                isNode:false,
                isActive: false,
                ARRIVED_DATE: res.v.LateDeliveryDate,
                title: '目的地',
                lat: Address.DEST_LATITUED,
                lng: Address.DEST_LONGITUDE,
                address:
                    Address.DEST_PROVINCE +
                    (Address.DEST_CITY || '') +
                    (Address.DEST_COUNTY_ID || '') +
                    (Address.DEST_ADDRESS || '')
            });

            this.driving.start = {
                lng: Number(Address.SRC_LONGITUDE),
                lat: Number(Address.SRC_LATITUED)
            };
            this.driving.end = {
                lng: Number(Address.DEST_LONGITUDE),
                lat: Number(Address.DEST_LATITUED)
            };

            this.$nextTick(() => {
                this.preview();
            });
        },

        preview() {
             this.loading('路线计算中...');

            let list = this._.cloneDeep(this.nodeList);
            const middle = list.filter(v => {
                if (v.isNode) {
                    return v;
                }
            });

            this.driving.waypoints = middle.map(v => {
                return {
                    lng: Number(v.lng),
                    lat: Number(v.lat)
                };
            });

            this.$refs.driving.reload();
        },

        readyMap(data) {
            data.map.enableScrollWheelZoom(true);

            this.$nextTick(() => {
                this.getOmSplitInitDTO();
                this.loadingInstance.close();
            });
        },

        loading(text) {
            this.loadingInstance = Loading.service({
                lock: true,
                text: text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },

        async submit() {
            let v = this.nodeList.slice(1, this.nodeList.length-1);
            let transferStops = v.map(item =>{
                return {
                    LOCATION_GID: item.LOCATION_GID,
                    LOCATION_ID: item.LOCATION_ID,
                    LOCATION_Name: item.LOCATION_Name,
                    ARRIVED_DATE: item.ARRIVED_DATE,
                    PLAN_TM_GID: (item.PLAN_TM_GID instanceof Array)?item.PLAN_TM_GID[1]:item.PLAN_TM_GID,
                    PLAN_TM_ID: item.PLAN_TM_ID,
                    PLAN_SP_GID: item.PLAN_SP_GID,
                    PLAN_SP_ID: item.PLAN_SP_ID,
                    PLAN_SP_NAME: item.PLAN_SP_NAME,
                    PLAN_ASSIGN_DOMAIN: item.PLAN_ASSIGN_DOMAIN
                }
            })

            const res = await this.$http.fetchData({
                url: 'SCM.TMS7.Apis/Api/Plan/SaveOmSplitDTO',
                params: {
                        v:{
                                OrderMovementGID:this.$route.query.gid,
                                TransferStops:transferStops
                            }}
            });

           if(res.v){
              this.checkOut(); 
           }
        },

        checkOut() {
            if (process.env.NODE_ENV === 'production') {
                window.top.$('.ui-state-active span', parent.document).click();
            }
        },

        addNode() {
            this.nodeType = 'New';
            this.customFormVisible = true;
        },

        markersset() {
            this.loadingInstance.close();
        },

        customFormDialogSave(val) {
           //根据地址的LOCATION_GID判断去重
        //    let index = this.nodeList.findIndex(item => item.LOCATION_GID === val.LOCATION_GID)
        //    if(index !== -1){
        //       this.nodeList.splice(index, 1);
        //    }
             this.nodeList = this.nodeList.filter(item => {
                    if(item.LOCATION_GID !== val.LOCATION_GID) {
                        return true
                    }
                })
             //新增
             this.nodeList.splice(-1, 0, val);
              this.$nextTick(() => {
                this.preview();
            });
        },

        onMouseover(item) {
            item.isActive = true;
        },

        onMouseleave(item) {
            item.isActive = false;
        },

        editNode(item) {
            console.log(item);
            this.nodeType = 'Edit';
            this.nodeItem =  item;
            this.customFormVisible = true;
        },

        delNode(index) {
            this.$confirm('是否删除此节点?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.nodeList.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$nextTick(() => {
                        this.preview();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        onMove(e){ 
        if(!e.relatedContext.element.isNode) return false;
        this.$nextTick(() => {
                this.preview();
            });
         return true;
      }, 
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
