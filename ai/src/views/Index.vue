<template>
    <div class="container">
        <el-row class="form-row">
            <div class="left">语言：</div>
            <div class="content">
                <el-select v-model="value" placeholder="请选择">
                    <el-option>中文</el-option>
                    <el-option>英语</el-option>
                    <el-option>日语</el-option>
                    <el-option>韩语</el-option>
                </el-select>
            </div>
            <div class="right"> </div>
        </el-row>
        <!-- <el-row class="form-row">
            <div class="left">音量：</div>
            <div class="content">
                <el-select v-model="value" placeholder="请选择">
                    <el-option>English</el-option>
                </el-select>
            </div>
            <div class="right"> </div>
        </el-row> -->
        <!-- <el-row class="form-row">
            <div class="left">Gender param(性别参数)：</div>
            <div class="content">
                <el-input></el-input>
            </div>
            <div class="right">(-0.8 ≤ x ≤ 0.8, 默认0.55)</div>
        </el-row> -->
        <el-row class="form-row">
            <div class="left">Vibrato intensity（振动强度）：</div>
            <div class="content">
                <el-input></el-input>
            </div>
            <div class="right">(0.0 ≤ x ≤ 2.0, 默认1.0)</div>
        </el-row>
        <el-row class="form-row">
            <div class="left">Pitch shift（音高）：</div>
            <div class="content">
                <el-input></el-input>
            </div>
            <div class="right">(-24 ≤ x ≤ 24, 默认0)</div>
        </el-row>
        <el-row class="form-row">
            <div class="left">Musical score（乐谱）：</div>
            <div class="content">
                <el-upload
                    class="upload-demo"
                    action="#"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
            <div class="right"> </div>
        </el-row>
        <el-row class="form-row">
            <div class="btns">
                <el-button type="primary">发送</el-button>
            </div>
        </el-row>

        <div class="banner">About Sinsy</div>
        <div>
            <div class="sample">样例</div>
            <ul>
                <li v-for="item in sampleAudioList" :key="item">
                    <div class="title">{{item.name}}</div>
                    <div class="audio">
                        <audio :src="require(`@/static/${item.path}`)" controls="controls"></audio>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            sampleAudioList: [
                {name: 'f00001j', path: '20210724085155_21899.wav'},
                {name: 'f00001j', path: '20210724085155_21899.wav'},
                {name: 'f00001j', path: '20210724085155_21899.wav'},
                {name: 'f00001j', path: '20210724085155_21899.wav'}
            ]
        }
    }
}
</script>


<style scoped>
html, body{
    widows: 100%;
    height: 100%;
}
.container{
    margin: 0 auto;
    width: 800px;
    height: 100%;
}
.form-row {
    margin: 20px 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
}

.el-button{
    box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.2), 6px 6px 4px 0 rgba(0, 0, 0, 0.3);
}

.left{
    flex: 2;
    text-align: right;
}

.content {
    flex: 2;
}

.el-select{
    width: 100%;
}

.right{
    flex: 2;
    text-align: left;
    padding-left: 5px;
}

.btns {
    margin: 0 auto;
}

.banner {
    height: 50px;
    line-height: 50px;
    background-color: #278adb;
    padding-left: 10px;
    /* box-shadow: 0px 3px 2px grey; */
    box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.2);
}

.sample{
    margin-top: 10px;
    margin-left: 10px;
}

ul {
    margin-left: 50px;
}

ul li{
    height: 54px;
    line-height: 54px;
    margin-top: 10px;
    position: relative;
}

ul li::after{
    clear: both;
}

.title{
    height: 54px;
    line-height: 54px;
    position: absolute;
    left: 0;
}

.audio{
    position: absolute;
    right: 0;
}
</style>