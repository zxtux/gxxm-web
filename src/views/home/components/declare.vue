<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="px-40px flex flex-col py-40px items-center">
                <img src="picture/name.png" />
                <div class="bg-[#fff] w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="picture/left.png" />
                        <div class="flex-1"></div>
                        <img src="picture/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="picture/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">申报书</div>
                        <img src="picture/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="hsla(0,0%,100%,0)"
                        class="container"
                    >
                        <vue-pdf-embed
                            source="picture/declare.pdf"
                            style="height: 70%; width: 100%;"
                            @loaded="onPdfLoad"
                            v-if="showPdf"
                        />
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="declare" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

export default {
    name: 'declare',
    components: {
        Footer,
        backTop,
        VuePdfEmbed
    },
    data() {
        return {
            loading: true,
            showPdf: false
        };
    },
    mounted() {
        this.showPdf = true;
    },
    methods: {
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        },
        onPdfLoad() {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-layer {
    z-index: 9999;
}

.el-loading-mask {
    transform: scale(2);
}
</style>
