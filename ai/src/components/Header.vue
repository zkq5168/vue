<template>
    <div class="container">
        <div class="logo">
            <div>
                <img src="@/assets/logo.jpg"> 歌声合成系统
            </div>
            <ul>
                <li v-if="sessionKey == null" @click="login()"><a href="javascript:;">登录</a></li>
                <li v-if="sessionKey == null" @click="register()"><a href="javascript:;">注册</a></li>
                <li v-if="sessionKey != null" @click="info()"><a href="javascript:;">个人信息</a></li>
                <li v-if="sessionKey != null" @click="logout()"><a href="javascript:;">注销</a></li>
            </ul>
        </div>
        <el-dialog :visible.sync="loginDialogVisible" width="30%" :close-on-click-modal=false>
            <el-form>
                <el-form-item label="登录名称">
                    <el-input placeholder="请输入手机号" v-model="loginForm.loginName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input placeholder="请输入密码" v-model="loginForm.loginPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item class="loginBtn">
                    <el-button type="success" @click="loginConfirm()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="registerDialogVisible" width="30%" :close-on-click-modal=false>
            <el-form>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号" v-model="registerForm.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密    码">
                    <el-input placeholder="请输入密码" v-model="registerForm.loginPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input placeholder="请输入密码" v-model="registerForm.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item class="loginBtn">
                    <el-button type="success">注册</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            sessionKey: window.sessionStorage.getItem("token"),
            loginDialogVisible: false,
            registerDialogVisible: false,
            loginForm: {
                loginName: '',
                loginPassword: ''
            },
            registerForm: {
                loginName: '',
                loginPassword: '',
                confirmPassword: '',
            }
        }
    },
    methods: {
        login(){
            this.loginForm.loginName = '';
            this.loginForm.loginPassword = '';
            this.loginDialogVisible = true;
        },
        register(){
            this.registerForm.loginName = '';
            this.registerForm.loginPassword = '';
            this.registerForm.confirmPassword = '';
            this.registerDialogVisible = true;
        },
        loginConfirm(){
            let self = this;
            this.axios.post('/apis/login', this.loginForm)
            .then(res => {
                if(res.data.code == 0){
                    self.$message.success(res.data.msg);
                    self.loginDialogVisible = false;
                    window.sessionStorage.setItem("token", res.data.result);
                    window.location.reload();
                }else{
                    self.$message.error("登录失败");
                }
            })
            .catch(e=>{
                self.$message.error("登录失败");
            });
        },
        logout(){
            window.sessionStorage.removeItem("token");
            window.location.reload();
        },
        info(){
            //TODO 显示个人信息
        }
    }
}
</script>

<style scoped>
.container{
    /* width: 100%; */
    height: 60px;
    background-color: #278adb;
}

.logo {
    width: 100%;
}

.logo div {
    float: left;
    height: 60px;
    line-height: 60px;
    margin-left: 15px;
    color: #fff;
    font-size: 1.5em;
}

.logo div img {
    vertical-align: middle;
    width: 30px;
}

.logo a {
    color: #fff;
}

.logo ul{
    margin-right: 20px;
}

.logo ul li {
    height: 50px;
    line-height: 50px;
    padding: 5px 15px;
    float: right;
}

li:hover {
    background-color: rgb(64, 87, 216);
}

.loginBtn{
    text-align: center;
}
</style>