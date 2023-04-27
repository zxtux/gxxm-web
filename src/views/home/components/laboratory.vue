<template>
    <div class="bigbox" ref="outerDom">
        <div id="pdfDom" class="sl_newContent">
            <div class="sl_NCLeft">
                <el-button type="primary" @click="pdfBtn" style="margin: 20px;">
                    预览PDF
                </el-button>
                <div class="sl_NCLBox">
                    <div v-for="(item, index) in list" :key="index" class="conby">
                        <div class="content-rep">
                            <div class="lineh60">
                                {{ item.title }}
                            </div>
                            <div class="top-rep lineh60">
                                <div class="flex1">姓名</div>
                                <div class="flex1 borL">{{ item.username }}</div>
                                <div class="flex1 borL">班级</div>
                                <div class="flex1 borL">{{ item.group_name }}</div>
                            </div>
                            <div class="top-rep borB lineh60">
                                <div class="flex1">学号</div>
                                <div class="flex1 borL">{{ item.status }}</div>
                                <div class="flex1 borL">总成绩</div>
                                <div class="flex1 borL">{{ item.score }}</div>
                            </div>
                            <div class="bgrey lineh40">
                                {{ item.questionpanel.head }}
                            </div>
                            <div class="questionpanel">
                                <div
                                    class="quesCon"
                                    v-for="(item1, index1) in item.questionpanel.questions"
                                    :key="index1"
                                >
                                    {{ item1.topic }}
                                    <template v-if="item1.type === 'img'">
                                        <img
                                            :src="'data:image/jpeg;base64,' + item1.selectOptions"
                                            class="questImg"
                                        />
                                    </template>
                                    <template v-else>
                                        <span class="fontR">（{{ item1.selectOptions }}）</span>
                                    </template>

                                    <div class="ques-img" v-if="item1.type === 'img'">
                                        <div class="flex1 options">
                                            <img
                                                :src="
                                                    'data:image/jpeg;base64,' +
                                                    item1.options.split('+/+')[0]
                                                "
                                            />
                                        </div>
                                        <div class="flex1 options">
                                            <img
                                                :src="
                                                    'data:image/jpeg;base64,' +
                                                    item1.options.split('+/+')[1]
                                                "
                                            />
                                        </div>
                                        <div class="flex1 options">
                                            <img
                                                :src="
                                                    'data:image/jpeg;base64,' +
                                                    item1.options.split('+/+')[2]
                                                "
                                            />
                                        </div>
                                        <div class="flex1 options">
                                            <img
                                                :src="
                                                    'data:image/jpeg;base64,' +
                                                    item1.options.split('+/+')[3]
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
                                                    item1.options.split('+/+')[4]
                                                "
                                            />
                                        </div>
                                    </div>
                                    <div v-else class="ques-text">
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
                                    <div v-if="item1.type === 'img'">
                                        注：正确答案是：
                                        <img
                                            :src="'data:image/jpeg;base64,' + item1.correctOptions"
                                            class="questImg"
                                        />
                                        {{ item1.remark }}
                                    </div>
                                    <div v-else>
                                        注：正确答案是：{{ item1.correctOptions }}
                                        {{ item1.remark }}
                                    </div>
                                </div>
                            </div>
                            <div class="bgrey lineh40">
                                {{ item.experimentprocesspanel.head }}
                            </div>
                            <div class="experimentprocesspanel textby">
                                <div class="experTitle">
                                    <!-- {{ item.experimentprocesspanel.message[0].topic }} -->
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
                            <div class="bgrey lineh40">
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
                            <div class="bgrey lineh40">
                                {{ item.resultpanel.head }}
                            </div>
                            <div
                                v-for="(item3, index3) in item.resultpanel.result"
                                :key="index3"
                                class="textby"
                            >
                                <template v-if="item3.type === 'text'">
                                    <div>{{ item3.content }}</div>
                                </template>
                                <template v-else>
                                    <img :src="'data:image/jpeg;base64,' + item3.content" />
                                </template>
                            </div>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="item.report_summary"
                            ></el-input>
                            <el-button
                                type="primary"
                                @click="commitReportSummary(item.report_id)"
                                style="width: 100%;"
                            >
                                提交
                            </el-button>
                        </div>
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
import htmlToPdf from '@/utils/htmlToPdf';
export default {
    name: 'laboratory',
    components: {
        Footer,
        backTop
    },
    props: ['list'],
    methods: {
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
            this.$notify.success({
                title: '提示',
                message: res.msg
            });
        },
        changeScrollTop(scrollTop) {
            this.$refs.outerDom.scrollTop = scrollTop;
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
</style>
