<template>
    <div class="footer">
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
            faqPosStr: ''
        }
    },
    methods: {
        toggleFaq(pos) {
            this.faqPos = -1 * pos * 389;
            this.faqPos += pos/2;
            this.faqPosStr = this.faqPos + "px";
        },
        contactMe() {
            window.location.href = "tencent://message/?uin=3066342757Site=咨询&Menu=yes";
        }
    }
}
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
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