<template>
    <div class="container">
        <div class="main">
            <div class="nav">
                当前位置：<a href='/#/index'>首页</a> > <a href='/#/discount'>优惠活动</a> > {{specialOfferInfo.specialOfferTitle}}
            </div>
            <div class="content">
                <div class="subject">
                    <h3 v-text="specialOfferInfo.specialOfferTitle"></h3>
                    <h5>
                        <span>活动时间：</span><span v-text="specialOfferInfo.specialOfferBegin"></span> 到 <span v-text="specialOfferInfo.specialOfferEnd"></span>
                    </h5>
                </div>
                <hr>
                <img :src="specialOfferInfo.specialOfferPicPath" width="205px">
                <p v-html="specialOfferInfo.specialOfferContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            specialOfferInfo: {
                specialOfferTitle: '',
                specialOfferBegin: '',
                specialOfferEnd: '',
                specialOfferPicPath: '',
                specialOfferContent: '',
            }
        }
    },
    created(){
        this.getSpecialOfferInfo();
    },
    methods: {
        getSpecialOfferInfo(){
            let self = this;
            let url = this.$route.path;
            let pos = url.lastIndexOf("/");
            let infoId = url.substring(pos+1);
            
            this.axios.get('/apis/specialOffer/info/' + infoId)
            .then(res => {
                if(res.data.code == 0){
                    self.specialOfferInfo = res.data.result;
                    self.specialOfferInfo.specialOfferPicPath = '/apis/image/' + self.specialOfferInfo.specialOfferPic;
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

.content img{
    padding-left: 30px;
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