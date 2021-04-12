<template>
    <div>
        <div class="container">
            <h2>比赛网站后台管理</h2>
            <div class="login">
                <el-input  placeholder="请输入用户名" v-model="username"></el-input>
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
            </div>
            <div class="btns">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            this.axios.post("/login", {
                username: this.username,
                password: this.password
            }).then((res)=>{
                alert(res);
            }).catch((e, data)=>{
                alert(data);
            }).finally((res)=>{
                alert(res);
            });
            // window.location.href = "/#/index";
        }
    }
}
</script>

<style scoped>
.container {
    background-color: #fff;
    width: 450px;
    height: 300px;
    margin: 200px auto 0;
    box-shadow: 3px 5px 10px 0px;
    outline: none;
    border-radius: 5px;
}

.container::before {
    content: " ";
    display: table;
}

.container h2 {
    margin: 20px auto;
    text-align: center;
}

.login {
    margin: 0 auto;
    text-align: center;
    padding: 10px 30px;
}

.login em {
    font-style: normal;
    width: 80px;
    display: inline-block;
}

.el-input {
    margin-bottom: 20px;
}

.btns {
    text-align: center;
    padding: 10px 30px;
}

.btns button {
    width: 100%;
}
</style>