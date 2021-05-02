<template>
    <div class="container">
        <div class="banner">
            <el-carousel indicator-position="none" height="480px">
                <el-carousel-item v-for="item in 4" :key="item" height="480px">
                    <!-- <h3>{{ item }}</h3> -->
                    <img src="@/assets/banner.png" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="main">
            <div class="news">
                最新资讯
                <hr>
                <div class="image">
                    <img src="@/assets/news.png" width="100%">
                </div>
                <div class="new_list">
                    <ul>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                        <li>
                            <img src="@/assets/dot.png">
                            <a href="javascript:;">黄金跌超10美元：空头将挑战重要支撑？</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rank">
                排名情况
                <hr>
                <el-table
                    id="rankTable"
                    :data="tableData"
                    stripe
                    :header-cell-style="{background:'#fafafa',color:'#80878f',fontSize:'14px'}"
                    class="rankTable">
                    <el-table-column
                        label="排名"
                        width="110px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.rank }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="昵称"
                        width="260px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="MT4"
                        width="118px">
                        <template slot-scope="scope">
                            <span style="color: #016eff">{{ scope.row.mt4 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="盈利(%)">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px; color: #fe8080">{{ scope.row.profit }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="show_more">
                    <a href="javascript:;">查看更多排行 >></a>
                </div>
            </div>
            <div class="comment">
                最新评论
                <hr>
                <ul>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                    <li>
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
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                rank: '1',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '2',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '3',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '1',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '2',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '3',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '1',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '2',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '3',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                },
                {
                rank: '3',
                name: '王小虎',
                mt4: '***24',
                profit: 601.45
                }
            ]
        }
    },
    methods: {
        headerClass({row, rowIndex}) {
            debugger;
            if (rowIndex == 0) {
                return 'header-class';
            }
            return '';
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