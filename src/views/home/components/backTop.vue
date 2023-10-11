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
import { getToken, checkout, verifyAccessToken } from '@/utils/auth';
export default {
    name: 'backTop',
    inject: ['updateStatus'],
    props: { type: String },
    data() {
        return {
            scrollTop: 0,
            scrollTrigger: false,
            token: getToken()
        };
    },
    methods: {
        goBack() {
            this.$emit('changeScrollTop');
        },

        async enterTheExperiment() {
            const result = await verifyAccessToken();
            if (result) {
                this.updateStatus(this.type, false);
            } else {
                checkout();
                localStorage.setItem('savedRoute', 'projectDisplay');
            }
        }
    }
};
</script>
