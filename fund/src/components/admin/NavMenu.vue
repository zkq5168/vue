<template>
    <div class="menu">
        <ul>
            <li><img src="@/assets/images/home.png">
                <!-- <a href="javascript:;">首页</a> -->
                <router-link to="/admin">首页</router-link>
            </li>
            <li><img src="@/assets/images/user.png">
                <router-link to="/admin/user">用户管理</router-link>
            </li>
            <li><img src="@/assets/images/activity.png">
                <router-link to="/admin/activity">活动管理</router-link>
            </li>
            <li><img src="@/assets/images/activity_detail.png">
                <router-link to="/admin/activity_detail">活动明细管理</router-link>
            </li>
            <li><img src="@/assets/images/business.png">
                <router-link to="/admin/business">交易商管理</router-link>
            </li>
            <li><img src="@/assets/images/notice.png">
                <router-link to="/admin/notice">公告管理</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.menu ul {
    background-color: #444;
    margin-top: 0;
    padding-left: 0;
    height: 100%;
}

.menu li {
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    background-color: #333;
    border-bottom: 1px solid #555;
}

.menu li:hover {
    background-color: #666;
}

.menu img {
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    padding-right: 10px;
    padding-bottom: 5px;
}

.menu a {
    color: #fff;
    height: 45px;
    line-height: 45px;
    display: inline-block;
}
</style>