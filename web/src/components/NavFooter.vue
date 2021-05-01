<template>
    <div class="footer">
        <div class="rule">
            <div class="content">
                <div class="menu">
                    <ul>
                        <li><a href="javascript:;" @click="toggleFaq(0)">关于报名</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(1)">关于规则</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(2)">关于违规交易</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(3)">关于奖金</a></li>
                        <li><a href="javascript:;" @click="toggleFaq(4)">大赛介绍</a></li>
                    </ul>
                </div>
                <div class="faq">
                    <div class="faq_content" :style="{'top': faqPosStr}">
                        <h2>关于违规交易1</h2>
                        <ul>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                        </ul>
                        <h2>关于违规交易2</h2>
                        <ul>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                        </ul>
                        <h2>关于违规交易3</h2>
                        <ul>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                        </ul>
                        <h2>关于违规交易4</h2>
                        <ul>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                        </ul>
                        <h2>关于违规交易5</h2>
                        <ul>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                            <li>
                                <div class="ask"><img src="@/assets/ask.png" width="14px">这是一个问题</div>
                                <div class="answer"><img src="@/assets/answer.png" width="14px">这是对问题的回答</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            <p>© Huaban 杭州纬音智网络有限公司 | 浙公网安备 33010602001878号</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqPos: 0,
            faqPosStr: ''
        }
    },
    methods: {
        toggleFaq(pos) {
            this.faqPos = -1 * pos * 388;
            this.faqPosStr = this.faqPos + "px";
        }
    }
}
</script>


<style scoped>
.rule {
    height: 490px;
    background: url('../assets/footer.png') no-repeat;
    position: relative;
}

.content {
    width: 1196px;
    height: 390px;
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

.faq ul {
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
</style>