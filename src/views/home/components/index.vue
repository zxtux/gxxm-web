<template>
    <div class="content">
        <el-carousel indicator-position="none" height="400px">
            <el-carousel-item v-for="item in bannerList" :key="item">
                <el-image :src="item" fit="fit" />
            </el-carousel-item>
        </el-carousel>
        <div class="bg-[#fff] h-500px flex justify-center">
            <div class="bg-[#fff] h-600px w-80% mt--50px z-9 shadow">
                <div class="flex justify-center items-center mt-30px">
                    <img src="@/assets/img/point.png" />
                    <div class="text-size-30px ml-20px font-bold">实验介绍</div>
                </div>
                <div class="flex mt-70px">
                    <div class="bgimg w-700px h-400px ml-20px px-20px py-50px pr-110px">
                        <div class="text-size-26px color-[#1D6DCF]">针灸虚拟仿真实验</div>
                        <div class="leading-30px py-30px">
                            针灸虚拟仿真实验，围绕传统实验教学的局限性和实际洪水调控的知识及能力需求，以“洪水形成—洪水传播—洪水调控”为主线，通过洪水形成感知实验、洪水预报仿真实验和洪水演进调控实验，将“降-产-汇-演-调”多环节融合贯通，实现水循环和洪水调控全过程虚拟仿真，使学生能够建立以应用为主线的知识体系，从而具备解决实际洪水调控问题的能力。实验上线以来，已服务多家高校及企事业单位，取得了显著效果。
                        </div>
                        <div>
                            <el-button type="primary">
                                进入实验
                                <i class="el-icon-arrow-right el-icon--right"></i>
                            </el-button>
                        </div>
                    </div>
                    <div class="h-260px w-260px ml--60px shadow flex mt-60px ringShadow">
                        <video
                            :src="
                                'http://xunifangzhen.oss-cn-beijing.aliyuncs.com/rainstorm_' +
                                (videoType == 'guide' ? 'brief' : 'guide') +
                                '.mp4'
                            "
                            width="100%"
                            height="100%"
                            controls="controls"
                            :poster="
                                './img/video/' +
                                (videoType == 'guide' ? 'video1Img' : 'video2Img') +
                                '.jpg'
                            "
                        ></video>
                    </div>

                    <div>
                        <div
                            class="flex items-center flex-col ml-100px"
                            @click="vp_changeVideo('guide')"
                        >
                            <img src="@/assets/img/introductionVideo.png" class="w-50px h-100px" />
                            <div class="text-size-20px mt-20px">简介视频</div>
                        </div>
                        <div
                            class="flex items-center flex-col ml-100px mt-50px"
                            @click="vp_changeVideo('introduction')"
                        >
                            <img src="@/assets/img/introductionVideo.png" class="w-50px h-100px" />
                            <div class="text-size-20px mt-20px">教学引导视频</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="color-[#fff] bgimg1 h-200px pt-100px text-size-30px text-center">数据统计</div>
        <div class="justify-center py-80px flex h-500px">
            <div id="myPie" style="width: 43%; height: 100%;"></div>
            <div id="myLine" style="width: 43%; height: 100%;"></div>
        </div>
        <div class="teachingResults h-400px">
            <div class="flex justify-center items-center pt-30px">
                <img src="@/assets/img/point.png" />
                <div class="text-size-30px ml-20px font-bold">教学成果</div>
            </div>
            <vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
                <ul class="ul-item">
                    <li class="li-item" v-for="(item, index) in listData" :key="index">
                        <img :src="item" style="width: 240px; height: 240px;" />
                    </li>
                </ul>
            </vue-seamless-scroll>
        </div>
        <Footer />
    </div>
</template>

<script>
import * as echarts from 'echarts';
import Footer from './footer';
import vueSeamlessScroll from 'vue-seamless-scroll';
import img from '@/assets/img/rotation1.png';
export default {
    name: 'index',
    components: {
        Footer,
        vueSeamlessScroll
    },
    data() {
        return {
            bannerList: [img],
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
            listData: [
                'https://www.gscat.edu.cn/home/upload/2021-05-24/16217865629802c989b73798fc6d169101799a0311a412bf.jpg',
                'https://www.gscat.edu.cn/home/upload/2022-09-07/1662523912224ff80808182c5efce82201831625b0200842.jpg',
                'https://www.gscat.edu.cn/home/upload/2021-05-24/16217871797322c989b73798fc6d121901799a0c7ad412de.jpg',
                'https://www.gscat.edu.cn/home/upload/2021-06-13/16235893028292c989b73799e77f0136017a0576b22d40d5.jpg'
            ],
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
        changeScrollTop(scrollTop) {
            this.$refs.outerDom.scrollTop = scrollTop;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    height: 100%;
    .shadow {
        box-shadow: 0px 0px 5px 0px rgb(238, 238, 238);
    }
    .ringShadow {
        box-shadow: 0px 0px 5px 0px rgb(238, 238, 238);
    }
    .bgimg {
        background-image: url('../../../assets/img/introduceTheBottomDiagram.png');
        background-size: cover;
    }
    .bgimg1 {
        background-image: url('../../../assets/img/statistics.png');
        background-size: cover;
    }
    .teachingResults {
        background-image: url('../../../assets/img/teachingResults.png');
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
        width: 100%;
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
}
</style>
