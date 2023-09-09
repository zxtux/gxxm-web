<template>
    <div class="sl_NCRightSeat">
        <div class="sl_CRIList">
            <div class="sl_CRIItem" @click="enterTheExperiment">
                <div class="sl_RITIcon sl_RITIcon1"></div>
                <div class="sl_RITText">仿真实验</div>
            </div>
            <div class="sl_CRIItem" @click="goBack">
                <div class="sl_RITIcon sl_RITIcon5"></div>
                <div class="sl_RITText">返回顶部</div>
            </div>
        </div>
        <a id="link" :href="'/WebMessageSystem/index.html?token=' + token" target="_blank" />
    </div>
</template>
<script>
import { getToken, checkToken } from '@/utils/auth';
export default {
    name: 'backTop',
    data() {
        return {
            scrollTop: 0,
            scrollTrigger: false,
            token: getToken()
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
        },
        enterTheExperiment() {
            checkToken().then(() => {
                const linkElement = document.getElementById('link');
                linkElement.click();
            });
        }
    }
};
</script>
