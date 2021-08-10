<template>
    <div class="container">
        <div class="main">
            <div class="nav">
                <div class="nav_left">当前位置：<a href='/#/index'>首页</a> > 排名情况</div>
                <div class="nav_right"><a href="/#/index">返回</a></div>
            </div>
            <div class="content">
                <el-table
                    :data="rankList"
                    border
                    style="width: 100%">
                    <el-table-column
                    fixed
                    prop="rankNum"
                    label="排名"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="nickname"
                    label="昵称"
                    width="600">
                    </el-table-column>
                    <el-table-column
                    label="MT4"
                    width="180">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rankList: []
        }
    },
    created(){
        this.getRankData();
    },
    methods: {
        getRankData(){
            let self = this;
            this.axios.get("/apis/rank/getRankList")
            .then(res => {
                if(res.data.code == 0){
                    self.rankList = res.data.result;
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

.content, .el-table{
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