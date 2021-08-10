<template>
    <div class="container">
        <div class="main">
            <div class="nav">
                <div class="nav_left">当前位置：<a href='/#/index'>首页</a> > 评论列表</div>
                <div class="nav_right"><a href="/#/index">返回</a></div>
            </div>
            <div class="content">
                <el-table
                    :data="commentList"
                    border
                    style="width: 100%">
                    <el-table-column
                    fixed
                    prop="nickname"
                    label="昵称"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="commentContent"
                    label="评论内容"
                    width="600">
                    </el-table-column>
                    <el-table-column
                    prop="commentTime"
                    label="评论时间"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="likes"
                    label="点赞数"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="doLike(scope.row)">点赞</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            commentList: []
        }
    },
    created(){
        this.getCommentList();
    },
    methods: {
        getCommentList(){
            let self = this;
            this.axios.get("/apis/comment/getCommentList")
            .then(res => {
                if(res.data.code == 0){
                    self.commentList = res.data.result;
                }
            });
        },
        doLike(item){
            let self = this;
            this.axios.get("/apis/comment/doLikes/" + item.commentId)
            .then(res => {
                if(res.data.code==0){
                    self.$message.success(res.data.msg);
                    item.likes++;
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
    height: 30px;
}

.nav a{
    text-decoration: none;
    color: #000;
}

.content{
    border: 1px solid #ccc;
    height: 500px;
    overflow: auto;
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

.nav_left {
    float: left;
    padding: 5px;
}

.nav_right {
    float: right;
    padding: 5px;
    border: 1px solid #000;
}
</style>