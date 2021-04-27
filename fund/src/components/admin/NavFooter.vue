<template>
    <div class="footer">
        <div class="title">
            <ul>
                <li><a href="javascript:;">&copy;版权所有</a></li>
                <!-- <li><a href="javascript:;">比赛规则</a></li>
                <li><a href="javascript:;">比赛规则</a></li>
                <li><a href="javascript:;">比赛规则</a></li>
                <li><a href="javascript:;">比赛规则</a></li>
                <li><a href="javascript:;">比赛规则</a></li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
    background-color: #333;
}

.title {
    height: 45px;
}

.title ul {
    height: 45px;
    width: 500px;
    margin: 0 auto;
}

.title li {
    float: left;
    height: 30px;
    line-height: 30px;
    margin: 8px 0px 7px 0px;
}

.title a {
    font-size: 14px;
    height: 30px;
    display: inline-block;
    padding: 0px 15px;
    border-right: 1px solid #f0f0f0;
    color: #fff;
}

.title li:last-child a {
    border-right: none;
}
</style>