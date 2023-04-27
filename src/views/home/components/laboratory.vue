<template>
    <div class="bigbox">
        <div id="pdfDom" class="sl_newContent">
            <div class="sl_NCLeft">
                <div class="sl_NCLBox">
                    <div v-for="(item, index) in list" :key="index">
                        <div class="content-rep">
                            <div>
                                {{ item.title }}
                            </div>
                            <div class="top-rep">
                                <div class="flex1">姓名</div>
                                <div class="flex1 borL">{{ item.username }}</div>
                                <div class="flex1 borL">班级</div>
                                <div class="flex1 borL">{{ item.group_name }}</div>
                            </div>
                            <div class="top-rep borB">
                                <div class="flex1">学号</div>
                                <div class="flex1 borL">{{ item.status }}</div>
                                <div class="flex1 borL">总成绩</div>
                                <div class="flex1 borL">{{ item.score }}</div>
                            </div>
                            <div class="bgrey">
                                {{ item.questionpanel.head }}
                            </div>
                            <div class="questionpanel">
                                <div
                                    class="quesCon"
                                    v-for="(item1, index1) in item.questionpanel.questions"
                                    :key="index1"
                                >
                                    {{ item1.topic }}
                                    <span class="fontR">（{{ item1.selectOptions }}）</span>
                                    <div class="ques-text" v-if="item1.type === 'text'">
                                        <div>{{ item1.options.split('/')[0] }}</div>
                                        <div>{{ item1.options.split('/')[1] }}</div>
                                        <div>{{ item1.options.split('/')[2] }}</div>
                                        <div v-if="item1.options.split('/')[3]">
                                            {{ item1.options.split('/')[3] }}
                                        </div>
                                        <div v-if="item1.options.split('/')[4]">
                                            {{ item1.options.split('/')[4] }}
                                        </div>
                                    </div>
                                    <div v-else class="ques-img">
                                        <div class="flex1 options">
                                            <div>A.</div>
                                            <img src="img/iconfont-scan.png" />
                                        </div>
                                        <div class="flex1 options">
                                            <div>B.</div>
                                            <img src="img/iconfont-scan.png" />
                                        </div>
                                        <div class="flex1 options">
                                            <div>C.</div>
                                            <img src="img/iconfont-scan.png" />
                                        </div>
                                        <div class="flex1 options">
                                            <div>D.</div>
                                            <img src="img/iconfont-scan.png" />
                                        </div>
                                    </div>
                                    <div>
                                        注：正确答案是：{{ item1.correctOptions }} 题解：{{
                                            item1.remark
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="bgrey">
                                {{ item.experimentprocesspanel.head }}
                            </div>
                            <div class="experimentprocesspanel">
                                <div class="experTitle">
                                    {{ item.experimentprocesspanel.message[0].topic }}
                                </div>
                                <div
                                    class="experCont"
                                    v-for="(item2, index2) in item.experimentprocesspanel.message"
                                    :key="index2"
                                >
                                    <div>{{ item2.wrapornot }}</div>
                                    <!-- <div>BBB</div>
                                    <div>CCC</div> -->
                                </div>
                            </div>
                            <div class="bgrey">
                                {{ item.experimentsteppanel.head }}
                            </div>
                            <div>
                                <el-table
                                    :data="item.experimentsteppanel.steps"
                                    border
                                    style="width: 100%;"
                                >
                                    <el-table-column prop="title" label="名称"></el-table-column>
                                    <el-table-column
                                        prop="startTime"
                                        label="开始"
                                    ></el-table-column>
                                    <el-table-column prop="endTime" label="结束"></el-table-column>
                                    <el-table-column
                                        prop="timeUsed"
                                        label="用时(秒)"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="expectTime"
                                        label="合理用时(秒)"
                                    ></el-table-column>
                                    <el-table-column prop="maxScore" label="满分"></el-table-column>
                                    <el-table-column prop="score" label="得分"></el-table-column>
                                    <el-table-column
                                        prop="repeatCount"
                                        label="次数"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="evaluation"
                                        label="评价"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="scoringModel"
                                        label="赋分模型"
                                    ></el-table-column>
                                    <el-table-column prop="remarks" label="备注"></el-table-column>
                                </el-table>
                            </div>
                            <div class="bgrey">
                                {{ item.resultpanel.head }}
                            </div>
                            <div v-for="(item3, index3) in item.resultpanel.result" :key="index3">
                                <template v-if="item3.type === 'text'">
                                    <div>{{ item3.content }}</div>
                                </template>
                                <template v-else>
                                    <img :src="item3.content" />
                                </template>
                            </div>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="item.report_summary"
                            ></el-input>
                            <el-button type="primary" @click="commitReportSummary">提交</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import htmlToPdf from '@/utils/htmlToPdf';
export default {
    name: 'laboratory',
    components: {
        Footer
    },
    data() {
        return {
            list: [],
            tableData: []
        };
    },
    mounted() {
        this.getReportInfo();
    },
    methods: {
        pdfBtn() {
            htmlToPdf.getPdf('页面导出PDF文件名');
        },
        async getReportInfo() {
            const res = await this.$http.fetchData({
                url: '/vr/experimentController/getReportInfo',
                type: 2
            });
            this.list = res.data;
        },
        async commitReportSummary() {
            const params = this.tableData.map(v => {
                return {
                    report_id: v.report_id,
                    report_summary: v.report_summary,
                    status: v.status
                };
            });

            await this.$http.fetchData({
                url: '/vr/experimentController/commitReportSummary',
                params: params
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sl_NCLeft {
    width: 1000px;
}
.content-rep {
    border: 1px solid #bbb;
    text-align: center;
}
.top-rep {
    display: flex;
    border-top: 1px solid #bbb;
}
.borL {
    border-left: 1px solid #bbb;
}
.borB {
    border-bottom: 1px solid #bbb;
}
.flex1 {
    flex: 1;
}
.bgrey {
    background: #bbb;
}
.questionpanel {
    text-align: left;
    padding: 10px;
}
.quesCon {
    margin-bottom: 16px;
}
.ques-text {
    padding: 10px;
    line-height: 20px;
}
.ques-img {
    display: flex;
    align-items: center;
    text-align: center;
    padding: 10px;
    line-height: 20px;
}
.ques-img img {
    width: 60px;
    height: 60px;
}
.ques-img .options {
    display: flex;
    align-items: center;
}
.fontR {
    color: red;
}
.experimentprocesspanel {
    font-weight: bold;
}
.experTitle {
    text-align: left;
    margin: 16px;
}
.experCont {
    display: flex;
    justify-content: space-between;
    padding: 2px 20px;
}
</style>
