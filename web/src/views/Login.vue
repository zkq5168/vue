<template>
    <div class="container">
        <div class="login">
            <div class="loginbox">
                <div class="login-header">
                    登录
                </div>
                <el-form :model="userForm" :rules="rules" ref="userForm">
                    <el-form-item prop="username">
                        <el-input class="login-name" v-model="userForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="login-pass" v-model="userForm.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-button class="login-btn" @click="login" type="primary">登录</el-button>
                    <div class="tip">如果你没有账户, <a href="/#/register">注册</a></div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入注册名称', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login() {
            let self = this;
            this.axios.post("/apis/login", this.userForm)
            .then(res => {
                if (res.data.code == 0){
                    self.$message({
                        message: "登录成功",
                        type: "success",
                        duration: 500,
                        onClose: function(){
                            window.sessionStorage.setItem("token", res.data.msg);
                            window.location.href = "/#/index";
                        }
                    });
                    
                }else{
                    self.$message({
                        message: "登录失败",
                        type: "warning"
                    })
                }
            })
            .catch(e => {
                self.$message.error({
                    message: "网络错误",
                    type: "error",
                    duration: 1000
                });
            });
        }
    }
}
</script>


<style scoped>
.container {
    min-height: 500px;
}
.login {
    width: 924px;
    height: 500px;
    margin: 50px auto;
    background: url(../assets/login-bg.png) no-repeat;
    background-size: 924px 500px;
    position: relative;
}

.loginbox {
    width: 548px;
    height: 500px;
    padding: 25px 40px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
}

.login-header {
    padding-top: 50px;
    font-size: 28px;
    text-align: center;
    font-weight: 700;
}

.login-name, .login-pass {
    box-sizing: border-box;
    margin-top: 20px;
}

.login-btn {
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
}

.tip {
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    color: #7c7c7c;
}
</style>