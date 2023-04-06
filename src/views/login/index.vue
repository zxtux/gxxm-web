<template>
    <div class="login">
        <div>
            <p>开发调试登陆</p>
            <el-input
                placeholder="请输入ssid"
                size="medium"
                v-model="ssid"
                @keyup.enter.native="getSsid"
            />
            <el-button type="primary" size="medium" :loading="loading" @click="getSsid">
                获取SSID
            </el-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',

    data() {
        return {
            ssid: '',
            loading: false
        };
    },

    methods: {
        ...mapActions('common', ['setData']),

        getSsid() {
            if (this.ssid) {
                this.setData({ key: 'ssid', value: this.ssid, modules: 'common' });
                this.$router.push('/');
            } else {
                this.$notify.error({
                    title: '错误',
                    message: 'ssid不正确'
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    color: #333;
    z-index: 10;
    .el-input {
        width: 240px;
        margin-right: 10px;
    }
}
</style>
