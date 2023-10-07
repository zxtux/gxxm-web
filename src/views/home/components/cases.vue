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
                    <div class="px-60px leading-34px">
                        <p>
                            西安理工大学水文与水资源工程专业是陕西省首批重点建设的“一流专业”（2017年）、陕西省“双万计划”一流本科专业建设点（2019年）、国家“双万计划”一流本科专业建设点（2021年），先后两次通过全国工程教育专业认证（2012、2018年，有效期均为6年）。专业依托的水文学及水资源学科是国务院首批硕博士学位授权点和全国重点学科，具有1个国家重点实验室、1个国家级实验教学示范中心、4个省部级重点实验室和实验教学示范中心。
                        </p>
                        <p>
                            围绕传统实验教学的局限性和现代水利人才培养的新需求，以“陕西省水资源与水环境虚拟仿真实验教学中心”为依托，
                            <span style="color: #6e91ec; font-weight: bold;">
                                以“降→产→汇→演→调”全过程知识贯通和融合应用为出发点
                            </span>
                            ，以培养解决洪水调控实际工程问题的综合素质和实践能力为目标，本着“能实不虚、以虚补实、虚实结合”的实践教学理念，融合多年教学和科研成果，创新性的设计并构建了“针灸虚拟仿真实验”。实验课程包含洪水形成感知实验、洪水预报仿真实验和洪水演进调控实验3个实验项目，共计6个学时，16个知识点。
                        </p>

                        <br />
                        <div class="ct_em_img">
                            <img src="@/assets/images/img10.jpg" />
                            <p>针灸虚拟仿真实验体系架构</p>
                        </div>
                        <br />
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
export default {
    name: 'cases',
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
