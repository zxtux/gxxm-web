<template>
    <div>
        <el-menu
            :default-active="'BigScreenManagement'"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
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
        <component :is="currentComp" :key="activeId"></component>
    </div>
</template>

<script>
import index from './components/index.vue';
import index1 from './components/index1.vue';
export default {
    name: 'home',
    data() {
        return {
            navs: [
                {
                    id: 'BigScreenManagement',
                    name: '大屏管理'
                },
                {
                    id: 'LargeScreenGrouping',
                    name: '大屏分组'
                },
                {
                    id: 'MyBigScreen',
                    name: '我的大屏'
                },
                {
                    id: 'MapManage',
                    name: '地图管理'
                },
                {
                    id: 'LargescreenMaterial',
                    name: '素材库'
                }
            ],
            activeId: '',
            currentComp: index
        };
    },

    methods: {
        handleSelect(keyPath) {
            this.activeId = keyPath;
            if (this.activeId === 'LargeScreenGrouping') {
                this.currentComp = index1;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.el-menu {
    display: flex;
}
</style>
