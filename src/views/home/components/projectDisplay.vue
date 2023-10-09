<template>
    <div ref="outerDom">
        <div class="content">
            <div class="px-200px flex flex-col py-10px fcb">
                <span class="text-size-20px">项目展示</span>
                <div class="flex flex-col py-10px">
                    <div
                        v-for="(item, index) in configData.experimentalData"
                        :key="index"
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
                            <el-button type="primary" @click="enterTheExperiment(item.link)">
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
                        <span class="fcr">
                            {{ configData.configurationRequirements.hardware.one.item }}
                        </span>
                        : {{ configData.configurationRequirements.hardware.one.requirement }}
                    </span>
                    <span class="px-60px">
                        2、
                        <span class="fcr">
                            {{ configData.configurationRequirements.hardware.two.item }}
                        </span>
                        : {{ configData.configurationRequirements.hardware.two.requirement }}
                    </span>
                </div>
                <div class="leading-30px">
                    <span class="spanp">
                        3、
                        <span class="fcr">
                            {{ configData.configurationRequirements.hardware.three.item }}
                        </span>
                        :{{ configData.configurationRequirements.hardware.three.requirement }}
                    </span>
                    <span class="px-60px">
                        4、
                        <span class="fcr">
                            {{ configData.configurationRequirements.hardware.four.item }}
                        </span>
                        :{{ configData.configurationRequirements.hardware.four.requirement }}
                    </span>
                </div>
                <div class="leading-30px">
                    <span class="spanp">
                        5、
                        <span class="fcr">
                            {{ configData.configurationRequirements.hardware.five.item }}
                        </span>
                        :{{ configData.configurationRequirements.hardware.five.requirement }}
                    </span>
                </div>
                <div class="fcb">二、配置不达标准可能会导致</div>
                <div class="leading-30px">
                    加载缓慢，加戟崩溃等问题，
                    {{ configData.configurationRequirements.configuration.issue }}
                    <span class="fcr">[解决办法]</span>
                    : {{ configData.configurationRequirements.configuration.solution }}
                </div>
            </div>
        </div>
        <Footer />
        <a id="link" :href="hrefLinkUrl" target="_blank" />
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
            hrefLinkUrl: '/WebMessageSystem/index.html?token=' + getToken()
        };
    },
    mounted() {
        this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
    },
    methods: {
        enterTheExperiment(link) {
            this.hrefLinkUrl = `${link + '/WebMessageSystem/index.html?token=' + this.token}`;
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
