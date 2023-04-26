<template>
    <div>
        <div id="pdfDom">
            <div v-for="(item, index) in list" :key="index">
                <table border="1" cellspacing="0" style="border-color: gray; color: gray;">
                    <tr>
                        <td>Month</td>
                        <td>Savings</td>
                        <td>Month</td>
                        <td>Savings</td>
                    </tr>
                    <tr>
                        <td>January</td>
                        <td>$100</td>
                        <td>Month</td>
                        <td>Savings</td>
                    </tr>
                </table>

                <el-table :data="item.experimentsteppanel.steps" border style="width: 100%;">
                    <el-table-column prop="date" label="名称" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
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

<style lang="scss" scoped></style>
