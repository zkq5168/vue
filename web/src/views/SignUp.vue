<template>
    <div class="container">
        <div class="signup-header">
            报名
        </div>
        <el-form :model="signupForm" :rules="rules" ref="signupForm">
            <el-form-item prop="nickname">
                <el-input class="nick-name" v-model="signupForm.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="mt4Account">
                <el-input class="mt4" v-model="signupForm.mt4Account" placeholder="请输入MT4账号"></el-input>
            </el-form-item>
            <el-form-item prop="mt4Password">
                <el-input class="mt4" v-model="signupForm.mt4Password" placeholder="请输入MT4只读密码"></el-input>
            </el-form-item>
            <el-form-item prop="traderId">
                <el-select class="trader" v-model="signupForm.traderId" placeholder="请选择交易商名称">
                    <el-option
                    v-for="item in traderList"
                    :key="item.traderId"
                    :label="item.traderName"
                    :value="item.traderId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="traderServer">
                <el-input class="trader-server" v-model="signupForm.traderServer" placeholder="请输入注册邮箱"></el-input>
            </el-form-item>
            <el-button class="signup-btn" @click="signup" type="primary">立即报名</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            signupForm: {
                nickname: '',
                mt4Account: '',
                mt4Password: '',
                traderId: '',
                traderServer: ''
            },
            traderList: [

            ],
            rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ],
                mt4Account: [
                    { required: true, message: '请输入MT4账号', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ],
                mt4Password: [
                    { required: true, message: '请输入MT4只读密码', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                ],
                traderId: [
                    { required: true, message: '请选择交易商名称', trigger: 'blur' }
                ],
                traderServer: [
                    { required: true, message: '请输入注册邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    created() {
        this.getTraderList();
    },
    methods: {
        signup() {
            let self = this;
            this.axios.post("/apis/signup", this.signupForm)
            .then(res => {
                debugger;
                if(res.data.code==0){
                    self.$message({
                        message: "报名成功",
                        type: "success",
                        duration: 500,
                        onClose: function(){
                            window.location.href = "/#/index";
                        }
                    });
                }else{
                    self.$message({
                        message: "报名失败",
                        type: "error"
                    });
                }
            });
        },
        getTraderList() {
            let self = this;
            this.axios.get("/apis/trader/list")
            .then(res => {
                if(res.data.code == 0){
                    for(let i=0; i<res.data.result.length; i++){
                        self.traderList.push(res.data.result[i]);
                    }
                }
            });
        }
    }
}
</script>


<style scoped>
.container {
    width: 450px;
    margin: 0 auto;
    padding-top: 30px;
}

.signup-header {
    text-align: center;
    font-size: 25px;
    padding-bottom: 10px;
}

.trader {
    width: 100%;
}

.signup-btn {
    width: 100%;
}
</style>