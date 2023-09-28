<template>
    <div ref="outerDom">
        <div class="backgroundPic h-1250px">
            <div class="px-40px flex flex-col py-40px items-center">
                <img src="@/assets/img/name.png" />
                <div class="bg-[#fff] w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="@/assets/img/left.png" />
                        <div class="flex-1"></div>
                        <img src="@/assets/img/right.png" />
                    </div>
                    <div class="flex justify-center items-center mt--30px">
                        <img src="@/assets/img/a.png" class="h-10px" />
                        <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">实验内容</div>
                        <img src="@/assets/img/aa.png" class="h-10px" />
                    </div>
                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div class="px-60px leading-34px">
                        <p>动画演示三层蒸散发模式的微观过程，如图1所示；</p>
                        <br />
                        <div class="ct_em_img">
                            <img src="img/principle1.jpg" />
                            <p>图1 三层蒸发模式微观过程</p>
                        </div>
                        <br />
                        <p>（1）掌握流域蒸散发机制及影响因素，如图2所示；</p>
                        <br />
                        <div class="ct_em_img">
                            <img src="img/principle2.jpg" />
                            <p>图2 三层蒸发模式的蒸发量计算</p>
                        </div>
                        <br />
                        <p>
                            （2）模拟土壤剖面，展示土壤中水分的存在形式和变化过程，如图3所示，分析不同雨强和下垫面条件下的下渗率随时间的变化规律，深入认识水分下渗的三个阶段，如图4所示；
                        </p>
                        <br />
                        <div class="ct_em_img" style="width: 420px;">
                            <img src="img/principle3.jpg" />
                            <p>图3 土壤剖面示意图</p>
                        </div>
                        <br />
                        <br />
                        <div class="ct_em_img" style="width: 500px;">
                            <img src="img/principle4.jpg" />
                            <p>图4 渗润、渗漏和渗透示意图</p>
                        </div>
                        <br />
                        <p style="padding: 0px;">
                            （3）虚拟河道纵剖面，如图5所示，动画展示泥沙在河水中的运移，如图6所示。
                        </p>
                        <br />
                        <div class="ct_em_img" style="width: 500px;">
                            <img src="img/principle5.jpg" />
                            <p>图5 河道剖面示意图</p>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="materials" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
export default {
    name: 'materials',
    components: {
        Footer,
        backTop
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
