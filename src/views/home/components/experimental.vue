<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="px-40px flex flex-col py-40px items-center">
                <img src="picture/name.png" />
                <div class="bg-[#fff] h-600px w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="picture/left.png" />
                        <div class="flex-1"></div>
                        <img src="picture/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="picture/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">实验特色</div>
                        <img src="picture/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div class="px-60px py-10px leading-34px">
                        <vue-pdf-embed
                            source="picture/experimental.pdf"
                            style="height: 70%; width: 100%;"
                            @loaded="onPdfLoad"
                        />
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="experimental" />
        <Footer />
    </div>
</template>
<script>
import Footer from './footer';
import backTop from './backTop.vue';
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

export default {
    name: 'experimental',
    components: {
        Footer,
        backTop,
        VuePdfEmbed
    },
    data() {
        return {};
    },

    methods: {
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
</script>

<style lang="scss" scoped></style>
