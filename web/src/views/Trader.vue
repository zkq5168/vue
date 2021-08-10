<template>
    <div class="container">
        <!-- <div class="banner">
            <el-carousel indicator-position="none" height="480px">
                <el-carousel-item v-for="item in 4" :key="item" height="480px">
                    <img src="@/assets/banner.png" />
                </el-carousel-item>
            </el-carousel>
        </div> -->
        <div class="main">
            <div class="nav">当前位置：首页 > <a href="javascript:;">交易商</a></div>
            <ul>
                <li v-for="item in traderList">
                    <div class="main-left">
                        <a href="javascript:;" @click="showTraderInfo(item.traderId)"><img :src="item.traderPic" width="154px"></a>
                    </div>
                    <div class="main-right">
                        <p v-html="item.traderContent"></p>
                        <!-- <h2>成立时间：2009年</h2>
                        <p>所属国家：伯利兹</p>
                        <p>货币点差：浮动：欧美1.8左右，黄金4.8左右</p>
                        <p>交易品种：外汇、贵金属</p>
                        <p>监督机构：FCA 70548</p> -->
                    </div>
                </li>
                <!-- <li>
                    <div class="main-left">
                        <img src="@/assets/trader.png" >
                    </div>
                    <div class="main-right">
                        <h2>成立时间：2009年</h2>
                        <p>所属国家：伯利兹</p>
                        <p>货币点差：浮动：欧美1.8左右，黄金4.8左右</p>
                        <p>交易品种：外汇、贵金属</p>
                        <p>监督机构：FCA 70548</p>
                    </div>
                </li>
                <li>
                    <div class="main-left">
                        <img src="@/assets/trader.png" >
                    </div>
                    <div class="main-right">
                        <h2>成立时间：2009年</h2>
                        <p>所属国家：伯利兹</p>
                        <p>货币点差：浮动：欧美1.8左右，黄金4.8左右</p>
                        <p>交易品种：外汇、贵金属</p>
                        <p>监督机构：FCA 70548</p>
                    </div>
                </li>
                <li>
                    <div class="main-left">
                        <img src="@/assets/trader.png" >
                    </div>
                    <div class="main-right">
                        <h2>成立时间：2009年</h2>
                        <p>所属国家：伯利兹</p>
                        <p>货币点差：浮动：欧美1.8左右，黄金4.8左右</p>
                        <p>交易品种：外汇、贵金属</p>
                        <p>监督机构：FCA 70548</p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            traderList: []      //交易商列表
        }
    },
    created() {
        this.getTraderList();
    },
    methods: {
        getTraderList(){
            let self = this;
            this.axios.get("/apis/trader/list")
            .then(res=>{
                if(res.data.code==0){
                    self.traderList = res.data.result;
                }
            })
        },
        showTraderInfo(traderId){
            window.location.href = "/#/traderInfo/" + traderId;
        }
    }
}
</script>


<style scoped>
.container {
    padding-bottom: 80px;
}

.main {
    /* margin-top: 45px; */
    margin: 45px auto 0;
    width: 1200px;
    min-height: 600px;
}

.nav {
    font-size: 18px;
    text-align: left;
}

.main ul {
    margin: 0;
    padding: 0;
}

.main li {
    padding-top: 34px;
    display: flex;
    max-height: 130px;
    overflow: hidden;
}

.main-left {
    float: left;
    flex: 1;
}

.main-right {
    float: right;
    margin-left: 20px;
    flex: 5;
}

.main-right p {
    margin: 0 0 5px 0;
}

.main-right h2 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: #555;
    font-weight: 500;
}

.main-right > p:first-child {
    color: #b3b3b3;
    font-size: 14px;
    margin-top: 10px;
}

.main-right > p:last-child {
    margin-top: 5px;
}

.main-right > p:last-child > span {
    color: #a3b7ee;
}
</style>