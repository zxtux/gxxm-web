<template>
    <div>
        <div id="pdfDom">
            页面内容
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
        return {};
    },

    methods: {
        pdfBtn() {
            htmlToPdf.getPdf('页面导出PDF文件名');
        }
    }
};
</script>

<style lang="scss" scoped></style>
