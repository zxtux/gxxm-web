<template>
    <div ref="outerDom">
        <div class="backgroundPic">
            <div class="px-40px flex flex-col py-40px items-center">
                <img src="picture/name.png" />
                <div class="bg-[#fff] w-80 mt-30px rounded-10px">
                    <div class="flex">
                        <img src="picture/left.png" />
                        <div class="flex-1"></div>
                        <img src="picture/right.png" />
                    </div>
                    <div class="flex items-center mt--30px justify-center">
                        <div class="flex items-center">
                            <img src="picture/a.png" class="h-10px" />
                            <div class="text-size-30px mx-60px font-bold color-[#1D6DCF]">
                                实验报告
                            </div>
                            <img src="picture/aa.png" class="h-10px" />
                        </div>
                    </div>
                    <div v-if="isDetail">
                        <el-button
                            @click="isDetail = false"
                            type="text"
                            icon="el-icon-back"
                            style="float: left; margin-left: 60px;"
                        >
                            返回列表
                        </el-button>
                    </div>

                    <div class="btnPdf" v-if="isDetail">
                        <el-button
                            type="primary"
                            @click="pdfBtn"
                            class="w-100px ml-auto"
                            style="float: right;"
                        >
                            导出PDF
                        </el-button>
                    </div>

                    <div class="px-60px">
                        <el-divider />
                    </div>
                    <div v-if="!isDetail">
                        <div class="sl_newContent flex justify-center">
                            <el-table
                                ref="multipleTable"
                                :data="displayedList"
                                tooltip-effect="dark"
                            >
                                <el-table-column prop="username" label="用户名"></el-table-column>
                                <el-table-column prop="nickname" label="姓名"></el-table-column>
                                <el-table-column
                                    prop="university"
                                    label="学校"
                                    width="120"
                                ></el-table-column>
                                <el-table-column prop="status" label="实验结果">
                                    <template slot-scope="scope">
                                        {{ scope.row.status === '0' ? '进行中' : '已完成' }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="score" label="实验成绩"></el-table-column>
                                <el-table-column prop="startTime" label="实验开始时间">
                                    <template slot-scope="scope">
                                        {{ formateT(scope.row.startTime) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="endTime" label="实验结束时间">
                                    <template slot-scope="scope">
                                        {{ formateT(scope.row.endTime) }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="timeUsed"
                                    label="实验用时(分钟)"
                                ></el-table-column>
                                <el-table-column fixed="right" label="操作" width="120">
                                    <template slot-scope="scope">
                                        <el-button
                                            @click="handleClick(scope.row)"
                                            type="text"
                                            size="small"
                                        >
                                            查看详情
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="flex justify-center h-50px">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="list.length"
                                :page-size="pageSize"
                                @current-change="handlePageChange"
                            />
                        </div>
                    </div>
                    <div v-else>
                        <div id="pdfDom" class="sl_newContent flex justify-center">
                            <div class="sl_NCLeft">
                                <div class="sl_NCLBox">
                                    <div
                                        v-for="(item, index) in detailList"
                                        :key="index"
                                        class="conby"
                                    >
                                        <div class="content-rep">
                                            <div class="lineh60">
                                                {{ item.title }}
                                            </div>
                                            <div class="top-rep lineh60">
                                                <div class="flex1">姓名</div>
                                                <div class="flex1 borL">{{ item.username }}</div>
                                                <div class="flex1 borL">实验报告时间</div>
                                                <div class="flex1 borL">
                                                    {{ formateTime(item.endTime) }}
                                                </div>
                                            </div>
                                            <div class="top-rep borB lineh60">
                                                <div class="flex1">学号</div>
                                                <div class="flex1 borL">{{ item.status }}</div>
                                                <div class="flex1 borL">总成绩</div>
                                                <div class="flex1 borL">{{ item.score }}</div>
                                            </div>

                                            <template
                                                v-if="item.questionpanel.questions.length > 0"
                                            >
                                                <div class="bgrey lineh40">
                                                    {{ item.questionpanel.head }}
                                                </div>
                                                <div class="questionpanel">
                                                    <div
                                                        class="quesCon"
                                                        v-for="(item1, index1) in item.questionpanel
                                                            .questions"
                                                        :key="index1"
                                                    >
                                                        {{ item1.topic }}
                                                        <template v-if="item1.type === 'img'">
                                                            <img
                                                                :src="
                                                                    'data:image/jpeg;base64,' +
                                                                    item1.selectOptions
                                                                "
                                                                class="questImg"
                                                            />
                                                        </template>
                                                        <template v-else>
                                                            <span class="fontR">
                                                                （{{ item1.selectOptions }}）
                                                            </span>
                                                        </template>

                                                        <div
                                                            class="ques-img"
                                                            v-if="item1.type === 'img'"
                                                        >
                                                            <div class="flex1 options">
                                                                <img
                                                                    :src="
                                                                        'data:image/jpeg;base64,' +
                                                                        item1.options.split(
                                                                            '+/+'
                                                                        )[0]
                                                                    "
                                                                />
                                                            </div>
                                                            <div class="flex1 options">
                                                                <img
                                                                    :src="
                                                                        'data:image/jpeg;base64,' +
                                                                        item1.options.split(
                                                                            '+/+'
                                                                        )[1]
                                                                    "
                                                                />
                                                            </div>
                                                            <div class="flex1 options">
                                                                <img
                                                                    :src="
                                                                        'data:image/jpeg;base64,' +
                                                                        item1.options.split(
                                                                            '+/+'
                                                                        )[2]
                                                                    "
                                                                />
                                                            </div>
                                                            <div class="flex1 options">
                                                                <img
                                                                    :src="
                                                                        'data:image/jpeg;base64,' +
                                                                        item1.options.split(
                                                                            '+/+'
                                                                        )[3]
                                                                    "
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex1 options"
                                                                v-if="item1.options.split('+/+')[4]"
                                                            >
                                                                <img
                                                                    :src="
                                                                        'data:image/jpeg;base64,' +
                                                                        item1.options.split(
                                                                            '+/+'
                                                                        )[4]
                                                                    "
                                                                />
                                                            </div>
                                                        </div>
                                                        <div v-else class="ques-text">
                                                            <div>
                                                                {{ item1.options.split('/')[0] }}
                                                            </div>
                                                            <div>
                                                                {{ item1.options.split('/')[1] }}
                                                            </div>
                                                            <div>
                                                                {{ item1.options.split('/')[2] }}
                                                            </div>
                                                            <div v-if="item1.options.split('/')[3]">
                                                                {{ item1.options.split('/')[3] }}
                                                            </div>
                                                            <div v-if="item1.options.split('/')[4]">
                                                                {{ item1.options.split('/')[4] }}
                                                            </div>
                                                        </div>
                                                        <div v-if="item1.type === 'img'">
                                                            注：正确答案是：
                                                            <img
                                                                :src="
                                                                    'data:image/jpeg;base64,' +
                                                                    item1.correctOptions
                                                                "
                                                                class="questImg"
                                                            />
                                                            {{ item1.remark }}
                                                        </div>
                                                        <div v-else>
                                                            注：正确答案是：{{
                                                                item1.correctOptions
                                                            }}
                                                            {{ item1.remark }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template
                                                v-if="
                                                    item.experimentprocesspanel.message.length > 0
                                                "
                                            >
                                                <div class="bgrey lineh40">
                                                    {{ item.experimentprocesspanel.head }}
                                                </div>
                                                <div class="experimentprocesspanel textby">
                                                    <div class="experTitle">
                                                        {{ item.experimentprocesspanel.head }}
                                                    </div>
                                                    <div
                                                        class="experCont"
                                                        v-for="(item2, index2) in item
                                                            .experimentprocesspanel.message"
                                                        :key="index2"
                                                    >
                                                        <div>
                                                            {{ index2 + 1 }}. {{ item2.topic }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template
                                                v-if="item.experimentsteppanel.steps.length > 0"
                                            >
                                                <div class="bgrey lineh40">
                                                    {{ item.experimentsteppanel.head }}
                                                </div>
                                                <div>
                                                    <el-table
                                                        :data="item.experimentsteppanel.steps"
                                                        border
                                                        style="width: 100%;"
                                                    >
                                                        <el-table-column
                                                            prop="title"
                                                            label="名称"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="startTime"
                                                            label="开始"
                                                        >
                                                            <template slot-scope="scope">
                                                                {{ formateT(scope.row.startTime) }}
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="endTime"
                                                            label="结束"
                                                        >
                                                            <template slot-scope="scope">
                                                                {{ formateT(scope.row.endTime) }}
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="timeUsed"
                                                            label="用时(秒)"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="expectTime"
                                                            label="合理用时(秒)"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="maxScore"
                                                            label="满分"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="score"
                                                            label="得分"
                                                        ></el-table-column>
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
                                                        <el-table-column
                                                            prop="remarks"
                                                            label="备注"
                                                        ></el-table-column>
                                                    </el-table>
                                                </div>
                                            </template>
                                            <template v-if="item.resultpanel.result.length > 0">
                                                <div class="bgrey lineh40">
                                                    {{ item.resultpanel.head }}
                                                </div>
                                                <div
                                                    v-for="(item3, index3) in item.resultpanel
                                                        .result"
                                                    :key="index3"
                                                    class="textby"
                                                >
                                                    <template v-if="item3.type === 'text'">
                                                        <div>{{ item3.content }}</div>
                                                    </template>
                                                    <template v-else>
                                                        <img
                                                            :src="
                                                                'data:image/jpeg;base64,' +
                                                                item3.content
                                                            "
                                                        />
                                                    </template>
                                                </div>
                                            </template>

                                            <el-input
                                                type="textarea"
                                                :rows="5"
                                                placeholder="请输入内容"
                                                v-model="item.report_summary"
                                                :disabled="reportStr || isSubmitted"
                                                @input="handleChange"
                                            ></el-input>
                                            <el-button
                                                type="primary"
                                                @click="commitReportSummary(item.report_id)"
                                                style="width: 100%;"
                                                :disabled="reportStr || isSubmitted"
                                            >
                                                提交（只能提交一次）
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <backTop @changeScrollTop="changeScrollTop" type="laboratory" />
        <Footer />
    </div>
</template>

<script>
import Footer from './footer';
import backTop from './backTop.vue';
import htmlToPdf from '@/utils/htmlToPdf';
export default {
    name: 'laboratory',
    components: {
        Footer,
        backTop
    },
    props: ['list'],
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            isSubmitted: false,
            inputValue: '',
            isDetail: false,
            detailList: []
        };
    },
    computed: {
        displayedList() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.list.slice(startIndex, endIndex);
        },
        reportStr() {
            return this.inputValue ? false : this.displayedList[0].report_summary ? true : false;
        }
    },
    methods: {
        handleChange(value) {
            this.inputValue = value;
        },
        formateDate(time) {
            return time ? this.$moment(time).format('YYYY-MM-DD') : '';
        },
        formateT(time) {
            return time ? this.$moment(time).format('YYYY-MM-DD  hh:mm') : '';
        },
        formateTime(time) {
            return time ? this.$moment(time).format('YYYY-MM-DD  hh:mm:ss') : '';
        },
        pdfBtn() {
            htmlToPdf.getPdf('实验报告');
        },
        async commitReportSummary(id) {
            const params = this.list
                .filter(v => v.report_id === id)
                .map(v => {
                    return {
                        report_id: v.report_id,
                        report_summary: v.report_summary,
                        status: v.status
                    };
                })[0];
            const res = await this.$http.fetchData({
                url: '/vr/experimentController/commitReportSummary',
                params: params
            });
            this.isSubmitted = true;
            this.$notify.success({
                title: '提示',
                message: res.msg
            });
        },
        changeScrollTop() {
            this.$refs.outerDom.scrollIntoView({ behavior: 'smooth' });
        },
        handlePageChange(page) {
            this.inputValue = '';
            this.isSubmitted = false;
            this.currentPage = page;
        },
        handleClick(s) {
            this.isDetail = true;
            this.detailList = [s];
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
.lineh40 {
    line-height: 40px;
}
.lineh60 {
    line-height: 60px;
}
.conby {
    margin-bottom: 80px;
}
.textby {
    text-align: left;
    padding: 10px;
}
.questImg {
    width: 40px;
    height: 40px;
}
.btnPdf {
    padding-bottom: 2%;
    padding-right: 4%;
}
.text-wrapper {
    white-space: nowrap;
}

.text-wrapper--wrap {
    white-space: normal;
}
</style>
