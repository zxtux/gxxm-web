<template>
    <div class="bg-[#FAFCFF]">
        <div
            class="h-screen w-full t-login"
            :style="{ backgroundImage: `url(${backgroundImgUrl})` }"
        >
            <div class="flex justify-center items-center flex-col h-screen">
                <!-- <img src="picture/login_name.png" class="w-180px h-50px mb--90px mt-80px" />
                <img src="picture/login_w.png" class="w-460px h-100px" /> -->
                <div class="bg-[#fff] h-500px w-500px rounded-20px shadow">
                    <div
                        class="float-right flex items-center bg-[#FFFAE8] p-10px rounded-20px"
                        @click="jump"
                    >
                        <img src="picture/expert.png" class="w-20px h-20px" />
                        <div class="text-size-16px color-[#F18E00] font-bold">专家入口</div>
                    </div>
                    <div class="text-center pt-40px font-bold text-size-18px">- 用户注册 -</div>
                    <div class="login_form pt-20px">
                        <div class="login_input custom-input">
                            <img src="@/assets/images/email.png" />
                            <input type="email" v-model="username" placeholder="请输入账号" />
                        </div>
                        <div class="login_input custom-input">
                            <img src="@/assets/images/pass.png" />
                            <input type="password" v-model="password" placeholder="请输入密码" />
                        </div>
                        <div class="login_input custom-input">
                            <img src="@/assets/images/user.png" />
                            <input placeholder="请输入姓名" v-model="nickName" type="text" />
                        </div>
                        <div class="login_input college_input custom-input">
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
                        <div class="login_input custom-input">
                            <img src="@/assets/images/grade.png" />
                            <input placeholder="请输入班级" v-model="grade" type="text" />
                        </div>
                        <button class="register" @click="register()">注 册</button>
                    </div>
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
            backgroundImgUrl: './picture/login_bg.png'
        };
    },
    mounted() {
        this.getCollege();
    },
    methods: {
        async getCollege() {
            const res = await this.$http.fetchData({
                url: '/vr/system/dictDataController/type/sys_university_college',
                type: 2,
                config: {
                    checkToken: false
                }
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
                },
                config: {
                    checkToken: false
                }
            });

            this.$notify.success({
                title: '提示',
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

    ::v-deep .el-input__inner::placeholder {
        color: #617077;
    }
    .login_form .register {
        margin: 40px auto;
    }
}
.t-login {
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: center top;
}
.custom-input {
    border-top: none;
    border-left: none;
    border-right: none;
}

::v-deep .el-input__inner {
    border: none;
    width: 380px;
    height: 36px;
}
.shadow {
    box-shadow: 0px 0px 5px 0px rgb(238, 238, 238);
}
</style>
