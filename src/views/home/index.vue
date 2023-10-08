<template>
    <div class="content">
        <div class="topLogo">
            <img src="picture/logo.png" />
            <template v-if="isShow">
                <el-menu
                    :default-active="pageComponentType"
                    mode="horizontal"
                    @select="handleSelect"
                    class="el-menu"
                >
                    <div v-for="(item, index) in navs" :key="index">
                        <el-menu-item :index="item.id">{{ item.name }}</el-menu-item>
                    </div>

                    <div class="flex items-center ml-100px">
                        <el-dropdown @command="close">
                            <span class="flex items-center">
                                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                                <div class="user">{{ userName }}</div>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    {{ userName === '游客' ? '登录' : '退出登录' }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-menu>
            </template>
            <template v-else>
                <div class="flex w-full px-60px items-center">
                    <div class="flex-1"></div>
                    <div class="mr-20px">--欢迎[{{ userName }}]登录--</div>
                    <i
                        class="el-icon-s-home"
                        style="font-size: 30px; color: #409eff;"
                        @click="returnToTheMainMenu"
                    ></i>
                </div>
            </template>
        </div>
        <div class="container">
            <component
                :is="currentComp"
                :key="activeId"
                :list="reportList"
                @updateStatus="updateStatus"
                ref="childComponent"
            />
        </div>
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
import projectDisplay from './components/projectDisplay.vue';
import { checkout, setToken, verifyAccessToken } from '@/utils/auth';

export default {
    name: 'home',
    provide() {
        return {
            updateStatus: this.updateStatus
        };
    },
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
                    name: '教学团队'
                }
            ],
            activeId: '',
            currentComp: '',
            userName: '游客',
            show: false,
            reportList: [],
            isShow: true,
            pageComponentType: 'index'
        };
    },
    mounted() {
        if (this.$route.query.ticket) {
            this.getAccessToken();
        } else {
            this.verifyToken();
        }
    },
    methods: {
        async init() {
            await this.getReportInfo();
            await this.getUserInfo();
        },
        async handleSelect(keyPath) {
            const result = await verifyAccessToken();
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
                    if (result) {
                        this.currentComp = laboratory;
                    } else {
                        checkout();
                    }
                    break;
                case 'about':
                    this.currentComp = about;
                    break;

                default:
                    break;
            }

            this.$refs.childComponent.changeScrollTop();
        },
        async getUserInfo() {
            const res = await this.$http.fetchData({
                url: '/vr/authController/getUserInfo',
                type: 2
            });
            this.userName = res.data.nickName;
        },
        close() {
            if (this.userName === '游客') {
                checkout();
                return;
            }
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
        },
        async getAccessToken() {
            const res = await this.$http.fetchData({
                url: '/vr/libController/getAccessToken?ticket=' + this.$route.query.ticket,
                type: 2,
                config: {
                    checkToken: false
                }
            });
            const data = await this.$http.fetchData({
                url: '/vr/authController/libToLogin',
                type: 1,
                params: {
                    username: res.username
                },
                config: {
                    checkToken: false
                }
            });
            setToken(data.token);
            this.init();
        },
        async verifyToken() {
            const result = await verifyAccessToken();
            if (result) {
                this.init();
            }
            this.currentComp = projectDisplay;
        },
        updateStatus(type, isShow) {
            this.isShow = isShow;
            this.activeId = type;
            this.currentComp = projectDisplay;
            this.pageComponentType = type;
        },
        returnToTheMainMenu() {
            this.isShow = true;
            this.handleSelect(this.pageComponentType);
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
    .user {
        margin-left: 10px;
        margin-right: 6px;
    }
}
</style>
