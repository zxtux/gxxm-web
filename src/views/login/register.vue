<template>
    <div id="syApp">
        <div class="ln_page" :style="{ backgroundImage: `url(${backgroundImgUrl})` }">
            <div class="ln_topLogo">
                <img src="@/assets/images/logofff.png" style="height: 12vh;" />
            </div>
            <div class="ln_content">
                <div class="login_form">
                    <div class="title">流域暴雨洪水感知调控虚拟仿真实验</div>
                    <div class="title2">用户登录</div>
                    <div class="login_input">
                        <img src="@/assets/images/email.png" />
                        <input type="email" v-model="user" placeholder="请输入账号" />
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/pass.png" />
                        <input type="password" v-model="pass" placeholder="请输入密码" />
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/user.png" />
                        <input placeholder="请输入姓名" v-model="name" type="text" />
                    </div>
                    <button class="register" @click="register()">注 册</button>
                    <p>
                        还没有账号？去
                        <a href="register.html">注册</a>
                    </p>
                    <div class="login_enter" @click="jump">专家入口 ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            load: 0,
            user: '',
            name: '',
            pass: '',
            isForm: true,
            registerSucess: true,
            ticket: '', // ?ref=%2Fdetails%2Fv5%3Fid%3D7033%26isView%3Dtrue
            backgroundImgUrl: require('@/assets/images/loginback.png')
        };
    },
    mounted() {
        // var ticket = $sy.getUrlData("ticket");
        // if(ticket == undefined){
        //     this.showTip = true;
        // }
        // this.ticket = ticket;
        document.onkeydown = function (e) {
            let ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                this.login();
            }
        };
    },
    methods: {
        ...mapActions('common', ['setData']),

        async register() {
            if (this.user == '' || this.pass == '') {
                this.$notify.error({
                    title: '错误',
                    message: '账号与密码不能为空'
                });
                return;
            }
            const res = await this.$http.fetchData({
                url: 'SCM.TMS7.WebApi/Oauth/GetSsidFormCurrentContext',
                params: {
                    pass: this.pass,
                    user: this.user
                },
                type: 2
            });
            this.setData({ key: 'token', value: res.token, modules: 'common' });
            this.$router.push('index');
        },
        jump() {
            this.vp_login('1070824', '1070824');
        },
        goRegister() {
            this.$router.push('register');
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
