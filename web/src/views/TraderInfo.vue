<template>
    <div class="container">
        <div class="main">
            <div class="nav">
                当前位置：<a href='/#/index'>首页</a> > 交易商 > {{traderInfo.traderName}}
            </div>
            <div class="content">
                <div class="subject">
                    <h3 v-text="traderInfo.traderName"></h3>
                    <h5>
                        <span>成立时间：</span><span v-text="traderInfo.setupTime"></span>
                    </h5>
                </div>
                <hr>
                <img :src="traderInfo.traderPicPath" width="154px">
                <p v-html="traderInfo.traderContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            traderInfo: {
                traderName: '',
                setupTime: '',
                traderPic: '',
                traderPicPath: '',
                traderContent: ''
            }
        }
    },
    created(){
        this.getTraderInfo();
    },
    methods: {
        getTraderInfo(){
            let self = this;
            let url = this.$route.path;
            let pos = url.lastIndexOf("/");
            let infoId = url.substring(pos+1);
            
            this.axios.get('/apis/trader/info/' + infoId)
            .then(res => {
                if(res.data.code == 0){
                    self.traderInfo = res.data.result;
                    self.traderInfo.traderPicPath = '/apis/image/' + self.traderInfo.traderPic;
                }
            });
        }
    }
}
</script>


<style scoped>
.container {
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
}

.nav{
    margin-bottom: 35px;
}

.nav a{
    text-decoration: none;
    color: #000;
}

.content{
    border: 1px solid #ccc;
}

.subject h3{
    color: #335db0;
    font-size: 20px;
    text-align: center;
    font-weight: 500;
}

.subject h5{
    font-weight: 500;
    text-align: center;
}

.content hr{
    width: 95%;
    background-color:#006be3;
}
</style>