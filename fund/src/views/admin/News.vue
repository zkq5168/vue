<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addNews">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="newsList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="新闻标题"
                    prop="newsTitle">
                </el-table-column>
                <el-table-column
                    label="新闻图片"
                    prop="newsLogo">
                </el-table-column>
                <el-table-column
                    label="新闻内容"
                    prop="newsContent">
                </el-table-column>
                <el-table-column
                    label="发布日期"
                    prop="publishDate">
                </el-table-column>
                <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="searchTxt"
                    @input="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="editNews(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteNews(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                class="tr10"
                background
                layout="prev, pager, next"
                @current-change="searchByPage"
                :page-size = 8
                :total="totalPage">
            </el-pagination>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="showNewsDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="newsForm">
                <el-form-item label-width="100px" label="新闻标题">
                    <el-input v-model="newsForm.newsTitle"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动图片">
                    <el-upload v-model="newsForm.newsLogo"
                        class="upload-demo"
                        action="/apis/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="uploadSuccess"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <!-- <el-upload v-model="newsForm.newsLogo"
                        class="avatar-uploader"
                        action="/apis/upload"
                        list-type = "image/jpeg"
                        :show-file-list="true"
                        :on-success="uploadSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label-width="100px" label="发布日期">
                    <el-date-picker
                        v-model="newsForm.publishDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label-width="100px" label="新闻内容">
                    <quill-editor class="editor"
                        ref="myTextEditor"
                        v-model="newsForm.newsContent"
                        :options="editorOption">
                    </quill-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showNewsDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateNews() : saveNews()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showNewsDialog: false,
            //列表搜索关键字
            searchTxt: '',
            //对话框标题
            dialogTitle: '',
            //上传图片地址
            imageUrl: '',
            //上传图片地址
            fileList: [],
            //总页数
            totalPage: 1,
            //是否修改
            isEdit: false,
            //列表数据
            newsList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            newsForm: {
                newsId: '',           //新闻ID
                newsTitle: '',        //新闻标题
                newsLogo: '',         //新闻图片
                newsContent: '',      //新闻内容
                publishDate: ''       //发布日期
            },
            //表格加载是否显示加载动画
            loading: true,
            editorOption: {
              modules: {
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ], //工具菜单栏配置
              },
              placeholder: '请在这里添加新闻内容描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            }
        }
    },
    mounted() {
        this.listNews(1)
    },
    methods: {
        searchByPage(val){
            this.listNews(val);
        },
        //查询活动
        listNews(pageNum, pageSize, searchTxt) {
            let that = this;
            var searchObj = {"pageNum": 1, "pageSize": 8, "param": null};
            if(pageNum){
                // pageNum = 1;
                searchObj.pageNum = pageNum;
            }
            if(pageSize){
                // pageSize = 3;
                searchObj.pageSize = pageSize;
            }
            if(searchTxt){
                searchObj.param = searchTxt;
            }

            this.axios.post("/apis/news/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.newsList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.newsList.push(data.result[i]);
                    }
                }else{
                    that.$message(data.msg);
                }
            }).catch(err => {
                // that.$message(err.message);
            }).finally(() => {
                that.loading = false;
            });
        },
        //添加活动
        addNews() {
            this.dialogTitle = '新增新闻';
            this.showNewsDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.newsForm){
                this.newsForm[attr] = '';
            }
        },
        //保存活动
        saveNews() {
            let that = this;
            this.newsForm.newsLogo = this.imageUrl;
            this.axios.post("/apis/news/save", this.newsForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showNewsDialog = false;
                    that.listNews();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editNews(index, rowData) {
            this.dialogTitle = '修改新闻';
            this.showNewsDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.newsForm[attr] = rowData[attr];
            }

            this.axios.get("/apis/activity/images/list?ids=" + rowData.newsLogo)
            .then(res=>{
                this.fileList = res.data;
                for(let i=0; i<this.fileList.length; i++){
                    if(this.fileList[i].fileName != undefined){
                        this.fileList[i].name = this.fileList[i].fileName;
                    }
                }
            });
        },
        updateNews(){
            let that = this;
            this.newsForm.newsLogo = this.imageUrl;
            this.axios.post("/apis/news/update", this.newsForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showNewsDialog = false;
                        that.listNews();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteNews(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/news/delete?id=" + rowData.newsId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.newsList.splice(index, 1);
                    }else{
                        that.$message({
                            type: 'warning',
                            message: res.data.msg
                        });
                    }
                }).catch(e => {
                    that.$message({
                        type: 'warning',
                        message: res.data.msg
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除!'
                });          
            });
        },
        search(value) {
            this.listNews(null, null, value);
        },
        uploadSuccess(response, file, fileList) {
            this.imageUrl = response.result.filePath+"/"+response.result.fileId+"."+response.result.fileExt;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning('只能上传' + fileList.length + '个文件');
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>

<style scoped>
.el-table {
    min-height: 475px;
}

.avatar-uploader {
    border: 1px dashed #333;
    border-radius: 6px;
    cursor: pointer;
    width: 100px;
    height: 100px;
}

.avatar-uploader i {
    width: 100px;
    height: 100px;
    line-height: 100px;
}

.tr10 {
    text-align: right;
    margin-top: 10px;
}

.editor {
    height: 300px;
}

.dialog-footer {
    margin-top: 50px;
}
</style>