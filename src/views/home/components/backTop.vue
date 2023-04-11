<template>
    <div class="sl_NCRightSeat">
        <div class="sl_CRIList">
            <a href="http://www.hicloudvr.com/watermark/" target="_blank" class="sl_CRIItem">
                <div class="sl_RITIcon sl_RITIcon1"></div>
                <div class="sl_RITText">仿真实验</div>
            </a>
            <div class="sl_CRIItem" @click="goBack">
                <div class="sl_RITIcon sl_RITIcon5"></div>
                <div class="sl_RITText">返回顶部</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'backTop',
    data() {
        return {
            scrollTop: 0,
            scrollTrigger: false
        };
    },
    methods: {
        goBack() {
            let that = this;
            if (that.scrollTrigger) {
                return;
            }
            let scrollTop = this.scrollTop;
            let steep = scrollTop / 2000;
            let timer = setInterval(() => {
                that.scrollTrigger = true;
                scrollTop -= steep;
                steep += 20;
                if (scrollTop <= 0) {
                    clearInterval(timer);
                    that.scrollTrigger = false;
                }
                this.$emit('changeScrollTop', scrollTop);
            }, 30);
        }
    }
};
</script>
