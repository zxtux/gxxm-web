<template>
    <div class="content">
        <div class="image-container">
            <img src="@/assets/images/ren.gif" />
            <div class="text-overlay">前面有{{ getRandomNumber() }}个人在排队,请稍等...</div>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth';
export default {
    name: 'lineUp',
    data() {
        return {
            token: getToken(),
            hrefLinkUrl: '/WebMessageSystem/index.html?token=' + getToken()
        };
    },
    mounted() {
        const fullPath = this.$route.fullPath.split('link=')[1];
        setTimeout(() => {
            window.location.href = `${'/' + fullPath + '/index.html?token=' + this.token}`;
        }, 2000);
    },

    methods: {
        getRandomNumber() {
            return Math.floor(Math.random() * 10) + 1;
        }
    }
};
</script>
<style scoped>
.content {
    width: 100%;
    height: 100vh;
    background: #fff;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
}
.image-container {
    position: relative;
    display: inline-block;
}
.text-overlay {
    position: absolute;
    top: 66%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    padding: 10px;
}
</style>
