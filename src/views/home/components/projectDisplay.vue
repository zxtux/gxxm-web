<template>
    <div ref="outerDom">
        <div class="content">
            <div class="px-200px flex flex-col py-10px">
                项目展示
                <div class="flex flex-col py-10px">
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="flex flex-row items-center itembg"
                    >
                        <div class="image-container">
                            <img src="@/assets/img/sy_bg.png" />
                        </div>
                        <div class="w-60 justify-center px-60px">
                            <div class="text-size-20px h-40px">{{ item.title }}</div>
                            <div class="fc1">{{ item.content }}</div>
                        </div>
                        <el-divider direction="vertical" style="height: 300px;"></el-divider>
                        <div>
                            <el-button type="primary" @click="enterTheExperiment">
                                开始实验
                                <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
export default {
    name: 'projectDisplay',
    components: {
        Footer
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    image: require('@/assets/img/sy_bg.png'),
                    title: '宠物针灸虚拟仿真实训',
                    content: '首次打开本实验，建议使用火狐或谷歌浏览器打开'
                },
                {
                    id: 2,
                    image: require('@/assets/img/sy_bg.png'),
                    title: '宠物针灸虚拟仿真实训',
                    content: '首次打开本实验，建议使用火狐或谷歌浏览器打开'
                }
            ]
        };
    },

    methods: {}
};
</script>

<style lang="scss" scoped>
.content {
    background-color: #f6f6f6;
    width: 100%;
    height: calc(100vh - 410px);
    .itembg {
        background-color: #fff;
        padding: 12px;
        margin-top: 10px;
        border: 12px solid #e3ecf2;
        border-radius: 10px;
    }
}
.fc1 {
    color: #abb4ba;
}
</style>
