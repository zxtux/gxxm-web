<template>
    <div ref="outerDom">
        <div class="content">
            <div class="px-200px flex flex-col py-10px fcb">
                <span class="text-size-20px">项目展示</span>
                <div class="flex flex-col py-10px">
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="flex flex-row items-center itembg"
                    >
                        <div class="image-container">
                            <img src="picture/sy_bg.png" />
                        </div>
                        <div class="w-60 justify-center px-60px">
                            <div class="text-size-20px h-40px">{{ item.title }}</div>
                            <div class="fc1">{{ item.content }}</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
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
        <div class="px-200px flex flex-col">
            <div class="bottbg">
                <div class="fcb">一、计算机硬件配置标准</div>
                <div class="leading-30px">
                    <span class="spanp">
                        1、
                        <span class="fcr">CPU</span>
                        : 英特尔酷睿TM 5-4590处理器(2.8GHz) 或更高配置
                    </span>
                    <span class="px-60px">
                        2、
                        <span class="fcr">CPU</span>
                        : NMIDIA Geforce GTX970,AMD Radon R9 290.或更高配置
                    </span>
                </div>
                <div class="leading-30px">
                    <span class="spanp">
                        3、
                        <span class="fcr">内存</span>
                        :8GB DDR3 或更高配置
                    </span>
                    <span class="px-60px">
                        4、
                        <span class="fcr">存储硬盘</span>
                        :64G或更高配置
                    </span>
                </div>
                <div class="leading-30px">
                    <span class="spanp">
                        5、
                        <span class="fcr">显存</span>
                        :1G或更高配置
                    </span>
                </div>
                <div class="fcb">二、配置不达标准可能会导致</div>
                <div class="leading-30px">
                    加载缓慢，加戟崩溃等问题，
                    <span class="fcr">[解决办法]</span>
                    :出现这种问题请刷新，清理缓存或者查看实验帮助:
                </div>
            </div>
        </div>
        <Footer />
        <a id="link" :href="'/WebMessageSystem/index.html?token=' + token" target="_blank" />
    </div>
</template>

<script>
import Footer from './footer';
import { getToken } from '@/utils/auth';
export default {
    name: 'projectDisplay',
    components: {
        Footer
    },
    data() {
        return {
            token: getToken(),
            items: [
                {
                    id: 1,
                    image: './picture/sy_bg.png',
                    title: '宠物针灸虚拟仿真实训',
                    content: '首次打开本实验，建议使用火狐或谷歌浏览器打开'
                },
                {
                    id: 2,
                    image: './picture/sy_bg.png',
                    title: '宠物针灸虚拟仿真实训',
                    content: '首次打开本实验，建议使用火狐或谷歌浏览器打开'
                }
            ]
        };
    },
    mounted() {
        this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
    },
    methods: {
        enterTheExperiment() {
            const linkElement = document.getElementById('link');
            linkElement.click();
        }
    }
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
.fcb {
    color: #409eff;
}
.fcr {
    color: red;
}
.bottbg {
    background-color: #fff6e7;
    height: 200px;
    padding: 20px;
}

.spanp {
    display: -moz-inline-box;
    display: inline-block;
    width: 500px;
}
</style>
