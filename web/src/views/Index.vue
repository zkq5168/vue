<template>
    <div class="container">
        <div class="banner">
            <el-carousel indicator-position="none" height="480px">
                <el-carousel-item v-for="item in bannerList" :key="item" height="480px">
                    <!-- <h3>{{ item }}</h3> -->
                    <img :src="item" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="main">
            <div class="news">
                最新资讯
                <hr>
                <!-- <div class="image">
                    <img src="@/assets/news.png" width="100%">
                </div> -->
                <div class="new_list">
                    <ul>
                        <li v-for="item in newList">
                            <img src="@/assets/dot.png">
                            <a href="javascript:;" @click="showNews(item.newsId)">{{item.newsTitle}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rank">
                排名情况
                <hr>
                <el-table
                    id="rankTable"
                    :data="rankList"
                    stripe
                    :header-cell-style="{background:'#fafafa',color:'#80878f',fontSize:'14px'}"
                    class="rankTable">
                    <el-table-column
                        label="排名"
                        width="110px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.rankNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="昵称"
                        width="230px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.nickname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="MT4"
                        width="140px">
                        <template slot-scope="scope">
                            <span style="color: #016eff">{{ scope.row.mt4.length < 3 ? '***' : '***' + scope.row.mt4.substring(3) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="盈利">
                        <template slot-scope="scope">
                            <span style="color: #fe8080">{{ scope.row.profit }}%</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="show_more" v-if="rankCount > 10">
                    <a href="javascript:;" @click="showMoreRank()">查看更多排行 >></a>
                </div>
            </div>
            <div class="comment">
                最新评论
                <hr>
                <ul>
                    <li v-for="(item,index) in commentList" :key="index" v-if="index < 6">
                        <div class="user-img">
                            <img src="@/assets/head.png" width="30px">
                        </div>
                        <div class="user-right">
                            <div class="user-name">{{item.nickname}}</div>
                            <div class="user-comment">{{item.commentContent}}</div>
                            <div class="comment-footer">
                                <div class="comment-date">{{item.commentTime}}</div>
                                <div class="support"><a href="javascript:;" @click="doLike(item.commentId, item)"><img src="@/assets/praise.png" width="15px"></a>赞{{item.likes}}</div>
                            </div>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="user-img">
                            <img src="@/assets/head.png" width="30px">
                        </div>
                        <div class="user-right">
                            <div class="user-name">用户2345234234</div>
                            <div class="user-comment">希望周期缩短，次数增多~</div>
                            <div class="comment-footer">
                                <div class="comment-date">4月11日 16:33</div>
                                <div class="support"><img src="@/assets/praise.png" width="15px">赞31</div>
                            </div>
                        </div>
                    </li> -->
                </ul>
                <div class="show_more_comment" v-if="commentList.length >= 6">
                    <a href="javascript:;" @click="showMoreComment()">查看更多评论 >></a>
                </div>
                <p v-if="sessionKey!=null">
                    <el-input v-model="commentContent" placeholder="发表评论/登录后留言"></el-input>
                    <el-button type="success" @click="doComment()">发表</el-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerList: [
                
            ],
            newList: [
                
            ],
            rankList: [
                // {
                //     rank: '1',
                //     name: '王小虎',
                //     mt4: '***24',
                //     profit: 601.45
                // }
            ],
            // 排名条目数
            rankCount: 0,
            commentList: [

            ],
            commentContent: '',     //评论内容
            sessionKey: window.sessionStorage.getItem("token")
        }
    },
    mounted: function() {
        this.getBannerList();
        this.getNewsList();
        this.getRankData();
        this.getCommentList();
    },
    methods: {
        headerClass({row, rowIndex}) {
            if (rowIndex == 0) {
                return 'header-class';
            }
            return '';
        },
        getBannerList(){
            let self = this;
            this.axios.get("/apis/banner/getBannerList")
            .then(res => {
                if(res.data.code == 0){
                    self.getBannerImg(res.data.result.activityPic);
                }
            });
        },
        getNewsList(){
            let self = this;
            let url = "/apis/news/list";
            this.axios.get(url)
            .then(res => {
                self.newList = res.data;
            });
        },
        getBannerImg(picId){
            let picIds = picId.split(",");
            for(let i=0; i<picIds.length; i++){
                this.bannerList.push("/apis/image/"+picIds[i]);
            }
        },
        showNews(newsId){
            window.location.href = "/#/news/" + newsId;
        },
        getRankData(){
            let self = this;
            this.axios.get("/apis/rank/getRankList")
            .then(res => {
                if(res.data.code == 0){
                    self.rankList = res.data.result;
                    self.rankCount = this.rankList.length;
                    if(self.rankCount > 10){
                        self.rankList = self.rankList.splice(0, 10);
                    }
                }
            });
        },
        getCommentList(){
            let self = this;
            this.axios.get("/apis/comment/getCommentList")
            .then(res => {
                if(res.data.code == 0){
                    self.commentList = res.data.result;
                }
            });
        },
        doLike(commentId, item){
            let self = this;
            this.axios.get("/apis/comment/doLikes/" + commentId)
            .then(res => {
                if(res.data.code==0){
                    self.$message.success(res.data.msg);
                    item.likes++;
                }
            });
        },
        doComment(){
            let self = this;
            this.axios.post("/apis/comment/doComment", {commentContent: this.commentContent})
            .then(res => {
                if(res.data.code == 0){
                    self.commentContent = "";
                    self.$message.success(res.data.msg);
                    self.getCommentList();
                }
            });
        },
        showMoreComment(){
            window.location.href = '/#/comment';
        },
        showMoreRank(){
            window.location.href = '/#/rank';
        }
    }
}
</script>


<style scoped>
.container {
    margin-top: -80px;
    padding-bottom: 50px;
}

.banner {
    width: 100%;
    height: 480px;
    background-color: #0056dd;
    margin-top: -80px;
}

.banner img {
    width: 100%;
    height: 100%;
}

.el-carousel {
    width: 100%;
    height: 480px;
    position: absolute;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 480px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.main {
    /* margin-top: 45px; */
    margin: 45px auto 0;
    width: 1200px;
    text-align: center;
    display: flex;
    min-height: 600px;
}

.news, .rank, .comment {
    font-size: 18px;
    color: #0056dd;
    font-weight: 700;
}

.news {
    flex: 1;
}

.news hr, .comment hr {
    float: right;
    width: 180px;
    border: 1px solid #0056dd;
}

.image {
    margin-top: 25px;
    text-align: left;
    padding-left: 23px;
}

.new_list {
    text-align: left;
}

.new_list ul {
    padding-left: 23px;
    margin: 0;
}

.new_list li {
    display: block;
    padding-top: 25px;
}

.new_list a {
    color: #000;
    font-size: 14px;
    padding-left: 8px;
}

.new_list img {
    vertical-align: middle;
}

.rank {
    flex: 2;
}

.rank hr {
    float: right;
    width: 480px;
    border: 1px solid #0056dd;
}

.rankTable {
    width: 96%;
    margin-top: 23px;
    margin-left: 23px;
}

.show_more {
    padding-top: 20px;
    text-align: right;
}

.show_more a {
    font-size: 14px;
}

.comment {
    flex: 1;
}

.comment ul {
    padding-left: 23px;
    margin-top: 25px;
}

.comment li {
    margin-bottom: 10px;
    height: 50px;
    clear: both;
    padding-bottom: 30px;
}

.comment p{
    display: flex;
}

.comment p .el-input {
    flex: 8;
    padding-left: 23px;
}

.comment p button {
    flex: 1;
    margin-left: 15px;
}

.show_more_comment{
    text-align: right;
    font-size: 13px;
}

.user-img {
    width: 48px;
    height: 48px;
    float: left;
    position: relative;
}

.user-img img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.user-right {
    width: 225px;
    float: right;
    font-size: 12px;
}

.user-right .user-name {
    text-align: left;
    padding-bottom: 10px;
}

.user-right .user-comment {
    text-align: left;
    color: #000;
    padding-bottom: 10px;
}

.user-right .comment-date {
    float: left;
    color: #a0a0a0;
}

.user-right .support {
    float: right;
    color: #a0a0a0;
}

.user-right .support img {
    vertical-align: middle;
    padding-right: 5px;
}
</style>