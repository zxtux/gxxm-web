<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="py-40px flex flex-col items-center">
                <img src="picture/name.png" />
                <div class="bg-[#fff] w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="picture/left.png" />
                        <div class="flex-1"></div>
                        <img src="picture/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="picture/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">实验描述</div>
                        <img src="picture/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div class="px-60px py-10px leading-34px h-min">
                        <vue-pdf-embed source="picture/cases.pdf" :height="height" ref="pdfEmbed" />
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="cases" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

export default {
    name: 'cases',
    components: {
        Footer,
        backTop,
        VuePdfEmbed
    },
    data() {
        return {
            height: 600
        };
    },
    mounted() {
        this.initializePdfEmbed();
    },
    beforeDestroy() {
        this.destroyPdfEmbed();
    },

    methods: {
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        },
        initializePdfEmbed() {
            this.$nextTick(() => {
                this.pdfEmbed = this.$refs.pdfEmbed;
                this.height = this.pdfEmbed.$el.offsetHeight;
                this.pdfEmbed.$on('loaded', () => {
                    // this.loading = false;
                });
            });
        },
        destroyPdfEmbed() {
            if (this.pdfEmbed) {
                this.pdfEmbed.$destroy();
            }
        }
    }
};
</script>
