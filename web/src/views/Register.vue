<template>
    <div class="container">
        <div class="register">
            <div class="registerbox">
                <div class="register-header">
                    注册
                </div>
                <el-form :model="userForm" :rules="rules" ref="userForm">
                    <el-form-item prop="username">
                        <el-input class="register-name" v-model="userForm.username" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickname">
                        <el-input class="register-name" v-model="userForm.nickname" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input class="register-pass" v-model="userForm.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <el-input class="register-pass" v-model="userForm.confirmPassword" placeholder="请输入确认密码" show-password></el-input>
                    </el-form-item>
                    <el-button class="register-btn" @click="register('userForm')" type="primary">注册</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            var param = {};
            param.username = value;
            this.axios.post('/apis/checkUsername', param)
            .then(res => {
                let data = res.data;
                if(data.code != 0){
                    callback(new Error(data.msg));
                }
            });
            callback();
        };
        var validateNickname = (rule, value, callback) => {
            var param = {};
            param.nickname = value;
            this.axios.post('/apis/checkNickname', param)
            .then(res => {
                let data = res.data;
                if(data.code != 0){
                    callback(new Error(data.msg));
                }
            });
            callback();
        };
        var validateConfirmPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.userForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                username: '',
                nickname: '',
                password: '',
                confirmPassword: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' },
                    { validator: validateUsername, trigger: 'blur'}
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' },
                    { validator: validateNickname, trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validateConfirmPass, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        register(formName) {
            this.$refs.userForm.validate((valid) => {
                if(valid){
                    this.axios.post("/apis/register", this.userForm)
                    .then(res => {
                        let data = res.data;
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: function(){
                                window.location.href = "/#/login"
                            }
                        });
                    });
                }
            });
        }
    }
}
</script>


<style scoped>
.container {
    min-height: 500px;
}
.register {
    width: 924px;
    height: 500px;
    margin: 50px auto;
    background: url(../assets/login-bg.png) no-repeat;
    background-size: 924px 500px;
    position: relative;
}

.registerbox {
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

.register-header {
    padding-top: 50px;
    font-size: 28px;
    text-align: center;
    font-weight: 700;
}

.register-name, .register-pass {
    box-sizing: border-box;
    margin-top: 10px;
}

.register-btn {
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
}
</style>