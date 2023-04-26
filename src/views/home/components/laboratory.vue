<template>
    <div class="bigbox">
        <div id="pdfDom" class="sl_newContent">
            <div class="sl_NCLeft">
                <div class="sl_NCLBox">
                    <div v-for="(item, index) in list" :key="index">
                        <div style="padding: 5px 100px; text-align: center;">
                            <table
                                border="1"
                                cellspacing="0"
                                style="border-color: gray; color: gray; margin: auto; width: 90%;"
                            >
                                <caption>{{ item.title }}</caption>
                                <tr>
                                    <td>姓名</td>
                                    <td>{{ item.username }}</td>
                                    <td>班级</td>
                                    <td>{{ item.group_name }}</td>
                                </tr>
                                <tr>
                                    <td>学号</td>
                                    <td>{{ item.status }}</td>
                                    <td>总成绩</td>
                                    <td>{{ item.score }}</td>
                                </tr>
                            </table>
                        </div>
                        <el-table
                            :data="item.experimentsteppanel.steps"
                            border
                            style="width: 100%;"
                        >
                            <el-table-column prop="title" label="名称"></el-table-column>
                            <el-table-column prop="startTime" label="开始"></el-table-column>
                            <el-table-column prop="endTime" label="结束"></el-table-column>
                            <el-table-column prop="timeUsed" label="用时(秒)"></el-table-column>
                            <el-table-column
                                prop="expectTime"
                                label="合理用时(秒)"
                            ></el-table-column>
                            <el-table-column prop="maxScore" label="满分"></el-table-column>
                            <el-table-column prop="score" label="得分"></el-table-column>
                            <el-table-column prop="repeatCount" label="次数"></el-table-column>
                            <el-table-column prop="evaluation" label="评价"></el-table-column>
                            <el-table-column prop="scoringModel" label="赋分模型"></el-table-column>
                            <el-table-column prop="remarks" label="备注"></el-table-column>
                        </el-table>
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
        }
    }
};
</script>

<style lang="scss" scoped>
.sl_NCLeft {
    width: 1000px;
}
tr {
    text-align: center;
    height: 50px;
}
</style>
