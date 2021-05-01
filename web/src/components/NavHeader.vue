<template>
    <div class="header">
        <ul>
            <li><a href="javascript:;">大赛内容</a></li>
            <li><a href="javascript:;">大赛规则</a></li>
            <li><a href="javascript:;">大赛报名</a></li>
            <li><a href="javascript:;">交易商</a></li>
            <li><a href="javascript:;">优惠活动</a></li>
            <li><a href="javascript:;">登录</a></li>
            <li><a href="javascript:;">注册</a></li>
        </ul>
        <div class="activity">
            <h3>第一期全球交易大赛</h3>
            <h3>丰厚奖金等你来拿</h3>
            <h3><a href="javascript:;">立即报名<img src="@/assets/arrow-r.png" width="20px"></a></h3>
        </div>
    </div>
</template>

<style scoped>
.header {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 80px;
    z-index: 999;
}

.header ul {
    width: 700px;
    min-width: 700px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
}

.header li {
    float: left;
    padding: 0 10px;
}

.header a {
    color: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
}

.header a:hover {
    border: 1px solid #fff;
}

.activity h3 {
    font-size: 46px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
}

.activity h3:first-child {
    margin-top: 50px;
}

.activity h3:nth-child(2) {
    margin-top: 20px;
}

.activity h3:nth-child(3) {
    font-size: 20px;
    margin-top: 25px;
}

.activity a {
    border: 1px solid #fff;
    padding: 10px 20px;
    font-family: sans-serif;
}

.activity img {
    vertical-align: middle;
}
</style>