<template>
    <div class="content">
        <div class="topLogo">
            <img src="@/assets/images/logo.png" />
            <div class="title">流域暴雨洪水感知调控虚拟仿真实验</div>
        </div>

        <el-menu
            :default-active="'index'"
            mode="horizontal"
            @select="handleSelect"
            background-color="#6E91EC"
            text-color="#fff"
            active-text-color="#fff"
            class="el-menu"
        >
            <div v-for="(item, index) in navs" :key="index">
                <el-menu-item :index="item.id">{{ item.name }}</el-menu-item>
            </div>
        </el-menu>
        <!-- <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel> -->
        <!-- <div class="container"> -->
        <component :is="currentComp" :key="activeId" class="container" />
        <!-- </div> -->
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
            currentComp: index
        };
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
        height: 100px;
        .title {
            margin-left: 32px;
            font-family: Adobe Arabic;
            font-size: 36px;
            color: #6e91ec;
            line-height: 100px;
            font-weight: bold;
        }
    }
    .el-menu {
        display: flex;
        padding-left: 100px;
        .el-menu-item {
            margin-left: 5%;
            width: 160px;
            height: 62px;
            text-align: center;
            color: #f8f8f8;
            line-height: 62px;
            font-size: 18px;
            cursor: pointer;
            position: relative;
        }
        .el-menu-item.is-active {
            color: #6e91ec !important;
            background-color: #fff !important;
        }
    }
    .container {
        background-color: #f4f4f4;
        width: 100%;
        height: calc(100vh - 140px) !important;
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
