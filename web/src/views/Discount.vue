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
            <div class="nav">当前位置：首页 > <a href="javascript:;">优惠活动</a></div>
            <ul>
                <li v-for="item in discountList">
                    <div class="main-left">
                        <a href="javascript:;" @click="showSpecialOfferInfo(item.specialOfferId)"><img :src="item.specialOfferPic" width="205px"></a>
                    </div>
                    <div class="main-right">
                        <h2 v-text="item.specialOfferTitle"></h2>
                        <p v-html="item.specialOfferContent"></p>
                        <p>活动时间：<span>{{item.specialOfferBegin}} 到 {{item.specialOfferEnd}}</span></p>
                    </div>
                </li>
                <!-- <li>
                    <div class="main-left">
                        <img src="@/assets/discount.png" >
                    </div>
                    <div class="main-right">
                        <h2>让设计立马变潮！收好这7个文字排版技巧</h2>
                        <p>我猜很多人在工作中都被客户或老板说过，设计不够时尚，其问题可能出在设计风格、色彩、画面元素、排版等方面，所以今天就来分享几个很潮的排版技巧我猜很多人在工作中都被客户或老板说过，设计不够时尚，其问题可能出在设计风格、色彩、画面元素、排版等方面...</p>
                        <p>活动时间：<span>2021-01-05 到 2021-02-06</span></p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            discountList: []    //优惠列表
        }
    },
    created(){
        this.getSpecialOfferList();
    },
    methods: {
        getSpecialOfferList(){
            let self = this;
            this.axios.get("/apis/specialOffer/list")
            .then(res=>{
                if(res.data.code==0){
                    self.discountList = res.data.result;
                }
            });
        },
        showSpecialOfferInfo(infoId){
            window.location.href = "/#/discountInfo/" + infoId;
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

.main-right h2 {
    margin: 0;
    font-size: 20px;
    color: #000;
}

.main-right > p:first-child {
    color: #b3b3b3;
    font-size: 14px;
    margin-top: 18px;
}

.main-right > p:last-child {
    margin-top: 20px;
}

.main-right > p:last-child > span {
    color: #a3b7ee;
}
</style>