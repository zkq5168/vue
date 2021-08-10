<template>
    <div class="footer">
        <div class="rule">
            <div class="content">
                <div class="menu">
                    <ul>
                        <li v-for="(item,index) in ruleList" :id="item.ruleName" @click="toggleFaq(index)"><a href="javascript:;">{{item.ruleName}}</a></li>
                        <!-- <li><a href="javascript:;" @click="toggleFaq(0)">关于报名</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(1)">关于规则</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(2)">关于违规交易</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(3)">关于奖金</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(4)">大赛介绍</a></li> -->
                    </ul>
                </div>
                <div class="faq">
                    <div class="faq_content" :style="{'top': faqPosStr}">
                        <div v-for="item in ruleList" class="ruleItem">
                            <h2>{{item.ruleName}}</h2>
                            <p v-html="item.ruleContent"></p>
                        </div>
                        <!-- <div>
                            <h2>关于违规交易2</h2>
                            <ul>
                                <li>
                                    <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题2</div>
                                    <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答2</div>
                                </li>
                                <li>
                                    <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题2</div>
                                    <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答2</div>
                                </li>
                                <li>
                                    <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题2</div>
                                    <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答2</div>
                                </li>
                            </ul>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <p>© Huaban 杭州纬音智网络有限公司 | 浙公网安备 33010602001878号</p>
        </div>
        <div class="contact">
            <div class="qq" @click="contactMe">
                <img src="@/assets/qq.png" width="30px">
                <p>在线客服</p>
            </div>

            <el-popover
                placement="left"
                width="110px"
                trigger="hover">
                <img src="@/assets/qrcode.png" width="150px">
                <div class="weixin" slot="reference">
                    <img src="@/assets/weixin.png" width="30px">
                    <p>扫一扫</p>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqPos: 0,
            faqPosStr: '',
            ruleList: []    //规则列表
        }
    },
    created() {
        this.getRuleList();  
    },
    methods: {
        toggleFaq(pos) {
            this.faqPos = -1 * pos * 449;
            this.faqPos += pos/2;
            this.faqPosStr = this.faqPos + "px";
        },
        contactMe() {
            window.location.href = "tencent://message/?uin=3066342757&Site=咨询&Menu=yes";
        },
        getRuleList() {
            let self = this;
            this.axios.get("/apis/rule/list")
            .then(res=>{
                if(res.data.code==0){
                    self.ruleList = res.data.retObj;
                }
            });
        }
    }
}
</script>


<style scoped>
.rule {
    height: 540px;
    background: url('../assets/footer.png') 100%;
    position: relative;
}

.content {
    width: 1196px;
    height: 450px;
    margin: 50px auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
}

.menu {
    width: 210px;
    background-color: rgba(0, 0, 0, 0.2);
    height: 100%;
    float: left;
}

.menu ul {
    margin: 0;
    padding: 12px 0 0 0;
}

.menu li {
    font-size: 20px;
    padding: 25px 45px;
    text-align: center;
}

.menu li:hover {
    background-color: #fff;
}

.menu li:hover a {
    color: #0056dd;
    font-weight: 700;
}

.menu a {
    color: #fff;
}

.faq {
    width: 975px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    float: right;
    padding-left: 55px;
    box-sizing: border-box;
    color: #fff;
    overflow: hidden;
    position: relative;
}

.faq h2 {
    margin-top: 35px;
}

.faq img {
    vertical-align: middle;
    padding-right: 10px;
}

.faq p {
    margin: 0;
    padding: 0;
}

.faq li {
    padding: 8px 0;
    padding-bottom: 48px;
}

.faq a {
    font-size: 14px;
}

.faq .ask {
    padding-bottom: 10px;
}

.faq .answer {
    color: #ffec4b;
}

.faq .faq_content {
    position: absolute;
}

.faq_content p {
    height: 367px;
}

.copyright {
    height: 50px;
    width: 100%;
    background-color: #37405f;
    text-align: center;
    font-size: 16px;
    position: relative;
}

.copyright p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
    color: #fff;
}

.contact {
    position: fixed;
    right: 100px;
    bottom: 100px;
}

.contact div {
    width: 64px;
    height: 64px;
    background-color: #f7f8f9;
    margin-bottom: 14px;
}

.contact div:hover {
    cursor: pointer;
}

.contact img {
    padding: 10px 17px 5px;
}

.contact p {
    font-size: 12px;
    text-align: center;
    margin: 0;
}
</style>