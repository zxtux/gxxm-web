<template>
    <div class="content">
        <div class="topLogo">
            <img src="@/assets/images/logo.png" />
            <el-menu
                :default-active="'index'"
                mode="horizontal"
                @select="handleSelect"
                class="el-menu"
            >
                <div v-for="(item, index) in navs" :key="index">
                    <el-menu-item :index="item.id">{{ item.name }}</el-menu-item>
                </div>

                <div class="ix_user" @click="show = true">
                    {{ userName }}
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                </div>

                <div class="ix_show" v-if="show" @click="close">
                    <img src="@/assets/images/pop.png" />

                    <p>退出登录</p>
                </div>
            </el-menu>
        </div>
        <component :is="currentComp" :key="activeId" :list="reportList" class="container" />
    </div>
</template>

<script>
import index from './components/index.vue';
import declare from './components/declare.vue';
import cases from './components/cases.vue';
import materials from './components/materials.vue';
import experimental from './components/experimental.vue';
import laboratory from './components/laboratory.vue';
import about from './components/about.vue';
import { checkout } from '@/utils/auth';

export default {
    name: 'home',
    data() {
        return {
            navs: [
                {
                    id: 'index',
                    name: '首页'
                },
                {
                    id: 'declare',
                    name: '申报书'
                },
                {
                    id: 'cases',
                    name: '实验描述'
                },
                {
                    id: 'materials',
                    name: '实验内容'
                },
                {
                    id: 'experimental',
                    name: '实验特色'
                },
                {
                    id: 'laboratory',
                    name: '实验报告'
                },
                {
                    id: 'about',
                    name: '教学教学团队'
                }
            ],
            activeId: '',
            currentComp: laboratory,
            userName: '专家',
            show: false,
            reportList: []
        };
    },
    mounted() {
        this.getUserInfo();
        this.getReportInfo();
    },
    methods: {
        handleSelect(keyPath) {
            this.activeId = keyPath;
            switch (keyPath) {
                case 'index':
                    this.currentComp = index;
                    break;
                case 'declare':
                    this.currentComp = declare;
                    break;
                case 'cases':
                    this.currentComp = cases;
                    break;
                case 'materials':
                    this.currentComp = materials;
                    break;
                case 'experimental':
                    this.currentComp = experimental;
                    break;
                case 'laboratory':
                    this.currentComp = laboratory;
                    break;
                case 'about':
                    this.currentComp = about;
                    break;

                default:
                    break;
            }
        },
        async getUserInfo() {
            const res = await this.$http.fetchData({
                url: '/vr/authController/getUserInfo',
                type: 2
            });
            this.userName = res.data.nickName;
        },
        close() {
            this.$confirm('是否确认退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    checkout();
                })
                .catch(() => {
                    this.show = false;
                });
        },
        async getReportInfo() {
            const res = await this.$http.fetchData({
                url: '/vr/experimentController/getReportInfo',
                type: 2
            });
            this.reportList = res.data;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    height: 100%;
    .topLogo {
        display: flex;
        align-items: center;
        background: #fff;
        padding-left: 30px;
        height: 90px;
    }
    .el-menu {
        display: flex;
        padding-left: 50px;
        border-bottom: none !important;
        .el-menu-item {
            margin-left: 5%;
            width: 120px;
            height: 90px;
            text-align: center;
            line-height: 90px;
            font-size: 18px;
            cursor: pointer;
            position: relative;
        }
        .el-menu-item.is-active {
            color: #6e91ec !important;
            background-color: #fff !important;
            border-bottom: 2px solid #6e91ec;
        }
        .ix_user {
            padding-left: 40px;
            width: 260px;
            height: 90px;
            line-height: 90px;
        }
    }
    .container {
        background-color: #f4f4f4;
        width: 100%;
        height: calc(100vh - 90px) !important;
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
