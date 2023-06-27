<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="py-40px flex flex-col py-40px items-center">
                <img src="@/assets/img/name.png" />
                <div class="bg-[#fff] h-600px w-[80%] mt-30px rounded-10px">
                    <div class="flex">
                        <img src="@/assets/img/left.png" />
                        <div class="flex-1"></div>
                        <img src="@/assets/img/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="@/assets/img/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold">实验介绍</div>
                        <img src="@/assets/img/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
export default {
    name: 'declare',
    components: {
        Footer,
        backTop
    },
    data() {
        return {};
    },

    methods: {
        changeScrollTop(scrollTop) {
            this.$refs.outerDom.scrollTop = scrollTop;
        }
    }
};
</script>

<style lang="scss" scoped></style>
