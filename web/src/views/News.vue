<template>
    <div class="container">
        <div class="main">
            <div class="nav">
                当前位置：<a href='/#/index'>首页</a> > 新闻公告 > {{newsInfo.newsTitle}}
            </div>
            <div class="content">
                <div class="subject">
                    <h3 v-text="newsInfo.newsTitle"></h3>
                    <h5>
                        <span>发布时间：</span><span v-text="newsInfo.publishDate"></span>
                    </h5>
                </div>
                <hr>
                <p v-html="newsInfo.newsContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsInfo: {
                newsTitle: '',
                publishDate: '',
                newsContent: ''
            }
        }
    },
    mounted: function(){
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            let self = this;
            let url = "/apis/news/info/"+this.$route.params.id;
            this.axios.get(url)
            .then(res => {
                let data = res.data;
                self.newsInfo = data;
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