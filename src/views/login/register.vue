<template>
    <div id="syApp">
        <div class="ln_page" :style="{ backgroundImage: `url(${backgroundImgUrl})` }">
            <div class="ln_topLogo">
                <img src="@/assets/images/logofff.png" style="height: 12vh;" />
            </div>
            <div class="ln_content">
                <div class="login_form">
                    <div class="title">测试</div>
                    <div class="title2">用户注册</div>
                    <div class="login_input">
                        <img src="@/assets/images/email.png" />
                        <input type="email" v-model="username" placeholder="请输入账号" />
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/pass.png" />
                        <input type="password" v-model="password" placeholder="请输入密码" />
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/user.png" />
                        <input placeholder="请输入姓名" v-model="nickName" type="text" />
                    </div>
                    <div class="login_input college_input">
                        <img src="@/assets/images/college.png" />
                        <el-select v-model="college" placeholder="请选择学院">
                            <el-option
                                v-for="item in collegeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="login_input">
                        <img src="@/assets/images/grade.png" />
                        <input placeholder="请输入班级" v-model="grade" type="text" />
                    </div>
                    <button class="register" @click="register()">注 册</button>
                    <div class="login_enter" @click="jump">专家入口 ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            collegeOptions: [],
            username: '',
            password: '',
            nickName: '',
            college: '',
            grade: '',
            backgroundImgUrl: require('@/assets/images/loginback.png')
        };
    },
    mounted() {
        this.getCollege();
    },
    methods: {
        async getCollege() {
            const res = await this.$http.fetchData({
                url: '/vr/system/dictDataController/type/sys_university_college',
                type: 2
            });
            this.collegeOptions = res.data.map(v => {
                return { value: v.dictValue, label: v.dictLabel };
            });
        },
        async register() {
            if (this.username == '' || this.password == '') {
                this.$notify.error({
                    title: '错误',
                    message: '账号与密码不能为空'
                });
                return;
            }
            await this.$http.fetchData({
                url: '/vr/authController/singUp',
                params: {
                    password: this.password,
                    username: this.username,
                    nickName: this.nickName,
                    college: this.college,
                    grade: this.grade
                }
            });

            this.$notify.success({
                title: '错误',
                message: '注册成功'
            });
            setTimeout(() => {
                this.$router.replace('login');
            }, 2000);
        },
        jump() {
            this.$router.replace('index');
        }
    }
};
</script>

<style lang="scss" scoped>
.ln_content {
    height: 610px;
    .title2 {
        margin-bottom: 5px !important;
    }
    ::v-deep .el-input__inner {
        border: none;
        width: 510px;
        height: 36px;
    }
    ::v-deep .el-input__inner::placeholder {
        color: #617077;
    }
    .login_form .register {
        margin: 40px auto;
    }
}
</style>
