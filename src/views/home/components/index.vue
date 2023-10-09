<template>
    <div class="content" ref="outerDom">
        <el-carousel indicator-position="none" height="450px">
            <el-carousel-item v-for="item in configData.topRotationDiagram" :key="item">
                <el-image :src="item" fit="fit" />
            </el-carousel-item>
        </el-carousel>
        <div class="bg-[#fff] h-500px flex justify-center flex-col items-center">
            <div class="bg-[#fff] h-600px w-75 mt--50px shadow rounded-10px">
                <div class="flex justify-center items-center mt-30px">
                    <img src="picture/point.png" />
                    <div class="text-size-30px ml-20px font-bold">实验介绍</div>
                </div>
                <div class="flex mt-70px">
                    <div class="bgimg w-50 h-400px ml-20px px-20px py-50px pr-110px mb-20px">
                        <div class="text-size-26px color-[#1D6DCF]">{{ configData.title }}</div>
                        <div class="leading-30px py-30px">
                            {{ configData.projectDescription }}
                        </div>
                        <div>
                            <el-button type="primary" @click="enterTheExperiment">
                                进入实验
                                <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="h-320px w-460px ml--60px shadow flex mt-30px ringShadow">
                        <video
                            :src="
                                videoType == 'guide'
                                    ? 'picture/guide.mp4'
                                    : 'picture/introduction.mp4'
                            "
                            width="100%"
                            height="100%"
                            controls="controls"
                            style="object-fit: fill;"
                        ></video>
                    </div>

                    <div>
                        <div
                            class="flex items-center flex-col ml-100px"
                            @click="vp_changeVideo('introduction')"
                        >
                            <img src="picture/introductionVideo.png" class="w-50px h-80px" />
                            <div
                                class="text-size-20px mt-20px"
                                :class="[videoType === 'introduction' ? 'color-[#1D6DCF]' : '']"
                            >
                                简介视频
                            </div>
                        </div>
                        <div
                            class="flex items-center flex-col ml-100px mt-50px"
                            @click="vp_changeVideo('guide')"
                        >
                            <img src="picture/introductionVideo.png" class="w-50px h-80px" />
                            <div
                                class="text-size-20px mt-20px"
                                :class="[videoType === 'guide' ? 'color-[#1D6DCF]' : '']"
                            >
                                教学引导视频
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="color-[#fff] bgimg1 h-200px pt-100px text-size-30px text-center mt--60px">
            数据统计
        </div>
        <div class="justify-center py-80px flex h-500px">
            <div id="myPie" style="width: 43%; height: 100%;"></div>
            <div id="myLine" style="width: 43%; height: 100%;"></div>
        </div>
        <div class="teachingResults h-500px">
            <div class="flex justify-center items-center pt-40px mb-50px">
                <img src="picture/point.png" />
                <div class="text-size-30px ml-20px font-bold">教学成果</div>
            </div>
            <vue-seamless-scroll
                :data="configData.bottomRotationDiagram"
                :class-option="classOption"
                class="warp"
            >
                <ul class="ul-item">
                    <li
                        class="li-item"
                        v-for="(item, index) in configData.bottomRotationDiagram"
                        :key="index"
                    >
                        <img :src="item" style="width: 240px; height: 240px;" />
                    </li>
                </ul>
            </vue-seamless-scroll>
            <a id="link" :href="'/WebMessageSystem/index.html?token=' + token" target="_blank" />
        </div>
        <Footer />
    </div>
</template>

<script>
import * as echarts from 'echarts';
import Footer from './footer';
import vueSeamlessScroll from 'vue-seamless-scroll';
import { getToken, verifyAccessToken, checkout } from '@/utils/auth';
export default {
    name: 'index',
    components: {
        Footer,
        vueSeamlessScroll
    },
    data() {
        return {
            token: getToken(),
            optionPie: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'right',
                    data: ['教师', '游客', '学生']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 580, name: '教师', itemStyle: { color: '#f38d2c' } },
                            { value: 484, name: '游客', itemStyle: { color: '#3a45e3' } },
                            { value: 300, name: '学生', itemStyle: { color: '#4e3293' } }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            optionLine: {
                legend: {
                    left: 'right',
                    data: ['学生', '教师', '游客']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['202208', '202209', '202210', '202211', '202212', '202301', '202302']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        name: '学生',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        itemStyle: { color: '#4e3293' }
                    },
                    {
                        data: [1820, 1932, 1901, 1934, 11290, 1130, 1320],
                        name: '教师',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        itemStyle: { color: '#f38d2c' }
                    },
                    {
                        name: '游客',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [11820, 1932, 1901, 1934, 11290, 1130, 1320],
                        itemStyle: { color: '#3a45e3' },
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                ]
            },
            videoType: 'guide',
            classOption: {
                limitMoveNum: 2,
                direction: 3
            }
        };
    },

    mounted() {
        this.drawEchart();
    },
    methods: {
        drawEchart() {
            let myPie = echarts.init(document.getElementById('myPie'));
            myPie.setOption(this.optionPie);

            let myLine = echarts.init(document.getElementById('myLine'));
            myLine.setOption(this.optionLine);
        },
        vp_changeVideo(type) {
            this.videoType = type;
        },
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        },
        async enterTheExperiment() {
            const result = await verifyAccessToken();
            if (result) {
                this.$emit('updateStatus', 'index', false);
            } else {
                checkout();
                localStorage.setItem('savedRoute', 'projectDisplay');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    height: 100%;
    width: 100%;
    .shadow {
        box-shadow: 0px 0px 5px 0px rgb(238, 238, 238);
        z-index: 99;
    }
    .ringShadow {
        box-shadow: 0px 0px 5px 0px rgb(238, 238, 238);
    }
    .bgimg {
        background-image: url('/picture/introduceTheBottomDiagram.png');
        background-size: cover;
    }
    .bgimg1 {
        background-image: url('/picture/statistics.png');
        background-size: cover;
    }
    .teachingResults {
        background-image: url('/picture/teachingResults.png');
        background-size: cover;
    }

    .chart {
        display: flex;
        .myChart {
            width: 40%;
            height: 300px;
        }
    }
    .warp {
        width: 70%;
        height: 240px;
        margin: 0 auto 40px;
        overflow: hidden;
        padding: 30px;
        ul {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            &.ul-item {
                display: flex;
                .li-item {
                    width: 240px;
                    height: 240px;
                    margin-right: 30px;
                    line-height: 240px;
                    background-color: #999;
                    color: #fff;
                    text-align: center;
                    font-size: 30px;
                }
            }
        }
    }
    .el-image {
        width: 100%;
    }
}
</style>
