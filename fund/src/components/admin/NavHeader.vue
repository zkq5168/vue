<template>
    <div>
        <div class="top">
            <div class="logo">
                <img src="@/assets/logo.png">
            </div>
            <div class="sysname">
                比赛网站后台管理
            </div>
            <div class="menu">
                <ul>
                    <li><a href="javascript:;">首页</a></li>
                    <li><a href="javascript:;">我的工作台</a></li>
                    <li><a href="javascript:;">统计报表</a></li>
                </ul>
            </div>
            <div class="personal">
                <ul>
                    <li><a href="javascript:;">admin</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.top {
    background-color: skyblue;
    height: 60px;
}

.logo {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: 30px;
    float: left;
}

.logo img {
    width: 40px;
    padding-top: 10px;
    float: left;
}

.sysname {
    float: left;
    height: 60px;
    line-height: 60px;
    color: #fff;
    margin-right: 50px;
}

.menu {
    float: left;
}

.menu ul {
    margin-top: 0;
}

.menu li {
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    float: left;
}

.menu li:hover {
    background-color:#7DC4EB;
}

.menu a {
    color: #fff;
}

.personal {
    float: right;
}

.personal ul {
    margin-top: 0;
    margin-right: 20px;
}

.personal li {
    float: left;
    height: 60px;
    line-height: 60px;
    list-style: none;
}

.personal li:hover {
    background-color: #7DC4EB;
}

.personal a {
    color: #fff;
    text-decoration: none;
    padding: 0 20px;
}
</style>