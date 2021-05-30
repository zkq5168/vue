<template>
    <div class="header">
        <ul>
            <li><a href="/#/index">大赛内容</a></li>
            <li><a href="javascript:;">大赛规则</a></li>
            <li><a href="javascript:;">大赛报名</a></li>
            <li><a href="/#/trader">交易商</a></li>
            <li><a href="/#/discount">优惠活动</a></li>
            <li v-if="sessionKey===null"><a href="/#/login">登录</a></li>
            <li v-if="sessionKey===null"><a href="/#/register">注册</a></li>
            <li v-if="sessionKey!=null"><a href="javascript:;" @click="logout">注销</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sessionKey: window.sessionStorage.getItem("token")
        }
    },
    methods: {
        logout() {
            let self = this;
            this.axios.get("/apis/logout")
            .then(res => {
                if(res.data.code == 0){
                    self.$message({
                        message: '退出登录',
                        type: 'success',
                        duration: 500,
                        onClose: function(){
                            window.sessionStorage.removeItem("token");
                            window.location.reload();
                        }
                    });
                }
            });
        }
    }
}
</script>


<style scoped>
.header {
    width: 100%;
    height: 80px;
    z-index: 999;
    background: url(../assets/simple-header.png);
}

.header ul {
    width: 700px;
    min-width: 700px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
}

.header li {
    float: left;
    padding: 0 10px;
}

.header a {
    color: #fff;
    padding: 5px 10px;
    border: 1px solid transparent;
}

.header a:hover {
    border: 1px solid #fff;
}
</style>