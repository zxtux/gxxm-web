<template>
    <div class="chart">
        <div id="myPie" class="myChart"></div>
        <div id="myLine" class="myChart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'index',
    data() {
        return {
            optionPie: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'right'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
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
                    show: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: '图类名称',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {
                            color: 'red'
                        }
                    },
                    {
                        name: '图类名称2',
                        data: [1820, 1932, 1901, 1934, 11290, 1130, 1320],
                        type: 'line',
                        areaStyle: {
                            color: 'blur'
                        }
                    }
                ]
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
        }
    }
};
</script>

<style lang="scss" scoped>
.chart {
    display: flex;
    .myChart {
        width: 40%;
        height: 300px;
    }
}
</style>
