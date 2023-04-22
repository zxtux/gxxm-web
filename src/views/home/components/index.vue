<template>
    <div class="content">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in bannerList" :key="item">
                <img :src="item" />
            </el-carousel-item>
        </el-carousel>
        <div class="ix_introduce">
            <div class="ix_ITopImg"><img src="@/assets/images/topimg.png" alt="" /></div>
            <div class="ix_newTitle">实验介绍</div>
            <div class="ix_IBox">
                <div class="ix_IBLeft">
                    <div class="ix_IBLTitle">针灸虚拟仿真实验</div>
                    <div class="ix_IBLText" style="letter-spacing: 1px;">
                        针灸虚拟仿真实验，围绕传统实验教学的局限性和实际洪水调控的知识及能力需求，以“洪水形成—洪水传播—洪水调控”为主线，通过洪水形成感知实验、洪水预报仿真实验和洪水演进调控实验，将“降-产-汇-演-调”多环节融合贯通，实现水循环和洪水调控全过程虚拟仿真，使学生能够建立以应用为主线的知识体系，从而具备解决实际洪水调控问题的能力。实验上线以来，已服务多家高校及企事业单位，取得了显著效果。
                    </div>
                    <a class="ix_IBLBtn" onclick="sl_goLabel()">
                        开始实验
                        <img src="@/assets/images/arrowright.png" />
                    </a>
                </div>

                <div class="ix_IBRight" style="height: 260px;">
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
                    <div class="ix_IBRList">
                        <div
                            class="ix_BRLItem"
                            :class="{ ix_BRLItemOut: videoType == 'guide' }"
                            @click="vp_changeVideo('guide')"
                        >
                            简介视频
                        </div>
                        <div
                            class="ix_BRLItem"
                            :class="{ ix_BRLItemOut: videoType == 'introduction' }"
                            @click="vp_changeVideo('introduction')"
                        >
                            教学引导视频
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="chart">
            <div id="myPie" class="myChart"></div>
            <div id="myLine" class="myChart"></div>
        </div> -->
        <div class="ix_dataStatistics">
            <div class="ix_cont ix_notBackColor">
                <!-- 内容 -->
                <div
                    class="ix_bodyCon"
                    data-stellar-background-ratio="0.05"
                    style="background-position: 50% 0;"
                >
                    <!-- 蒙层 -->
                    <div class="ix_surname">
                        <!-- 中间大块 -->
                        <div class="ix_Content">
                            <!-- 标题 -->
                            <div class="ix_newTitle">数据统计</div>
                            <div class="ix_view2">
                                <div id="myPie" style="width: 43%; height: 100%;"></div>
                                <div id="myLine" style="width: 57%; height: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ix_IBomImg"><img src="@/assets/images/bomimg.png" alt="" /></div>
        </div>

        <div class="ix_Content">
            <div class="ix_newTitle">教学成果</div>
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
export default {
    name: 'index',
    components: {
        Footer,
        vueSeamlessScroll
    },
    data() {
        return {
            bannerList: [
                'https://www.gscat.edu.cn/home/template/images/banner05.jpg?v=20221019',
                'https://www.gscat.edu.cn/home/upload/2021-06-14/2c989b73799e77f0112017a0a594dae47b2.jpg'
            ],
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
                'https://www.gscat.edu.cn/home/upload/2023-03-06/1678099206363ff808081849fe3189630186b681d0db001e.jpg',
                'https://www.gscat.edu.cn/home/upload/2022-09-07/1662523912224ff80808182c5efce82201831625b0200842.jpg',
                'https://www.gscat.edu.cn/home/upload/2021-05-24/16217871797322c989b73798fc6d121901799a0c7ad412de.jpg',
                'https://www.gscat.edu.cn/home/upload/2021-06-13/16235893028292c989b73799e77f0136017a0576b22d40d5.jpg',
                'https://www.gscat.edu.cn/home/upload/2021-05-24/16217874261442c989b73798fc6d182201799a103d6012fe.jpg'
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
        ul {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            &.ul-item {
                display: flex;
                .li-item {
                    width: 240px;
                    height: 240px;
                    margin-right: 60px;
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
