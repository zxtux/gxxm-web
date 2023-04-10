<template>
    <div id="syApp">
        <div class="ln_page" :style="{ backgroundImage: `url(${backgroundImgUrl})` }">
            <div class="ln_topLogo">
                <img src="@/assets/images/logofff.png" style="height: 12vh;" />
            </div>
            <div class="ln_content">
                <div class="login_form">
                    <div class="title"></div>
                    <div class="title2">用户登录</div>
                    <div class="login_input">
                        <img src="@/assets/images/email.png" />
                        <input type="email" v-model="username" placeholder="请输入账号" />
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/pass.png" />
                        <input type="password" v-model="password" placeholder="请输入密码" />
                    </div>
                    <button @click="login()">登 录</button>
                    <p>
                        还没有账号？去
                        <router-link to="register">注册</router-link>
                    </p>
                    <div class="login_enter" @click="jump">专家入口 ></div>
                </div>
            </div>
        </div>

        <!-- 提示登录 -->
        <div class="ln_tip" :class="{ ln_tipOut: showTip }">
            <div class="ln_TMark"></div>
            <div class="ln_TPack">
                <div class="ln_TPClose" @click="showTip = false">
                    <img src="@/assets/images/close_icon.png" alt="" />
                </div>
                <div class="ln_TPTitle">友情提示</div>
                <p>
                    1、如果需要将此次实验数据上传至ilab实验空间，请务必点击下方按钮“
                    <a :href="ilabLoginHref">去实验空间登录</a>
                    ”。
                </p>
                <p>
                    2、如果只是想体验一下实验，并不需要将此次实验数据上传至ilab实验空间，点击右上角“
                    x ”忽略此弹框。
                </p>

                <a class="ln_TPSubmit" :href="ilabLoginHref">去实验空间登录</a>
            </div>
        </div>
    </div>
</template>

<script>
import { setToken } from '@/utils/auth';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            ticket: '',
            showTip: false,
            ilabLoginHref: 'http://www.ilab-x.com/login', // ?ref=%2Fdetails%2Fv5%3Fid%3D7033%26isView%3Dtrue
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
        async login() {
            if (this.username == '' || this.password == '') {
                this.$notify.error({
                    title: '错误',
                    message: '账号与密码不能为空'
                });
                return;
            }
            const res = await this.$http.fetchData({
                url: '/vr/authController/login',
                params: {
                    password: this.password,
                    username: this.username
                }
            });
            setToken(res.token);
            this.$router.replace('home');
        },
        jump() {
            this.$router.replace('index');
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
