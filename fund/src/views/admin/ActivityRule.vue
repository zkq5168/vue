<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addRule">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="ruleList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="规则名称"
                    prop="ruleName">
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
                    @click="editRule(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteRule(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showRuleDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="ruleForm">
                <el-form-item label-width="100px" label="规则名称">
                    <el-input v-model="ruleForm.ruleName"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="规则内容" class="editor">
                    <!-- <el-input v-model="ruleForm.ruleContent"></el-input> -->
                    <quill-editor class="editor"
                        ref="myTextEditor"
                        v-model="ruleForm.ruleContent"
                        :options="editorOption">
                    </quill-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showRuleDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateRule() : saveRule()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showRuleDialog: false,
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
            ruleList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            ruleForm: {
                ruleId: '',          //比赛规则ID
                ruleName: '',        //比赛规则名称
                ruleContent: '',     //比赛规则内容
                displayOrder: 0      //排序号
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
              placeholder: '请在这里添加优惠活动描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            }
        }
    },
    mounted() {
        this.listRule(1)
    },
    methods: {
        searchByPage(val){
            this.Rule(val);
        },
        //查询活动
        listRule(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/activity/rule/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.ruleList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.ruleList.push(data.result[i]);
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
        addRule() {
            this.dialogTitle = '新增活动规则';
            this.showRuleDialog = true;
            this.fileList = [];
            this.isEdit = false;
            //清空数据
            for(let attr in this.ruleForm){
                this.ruleForm[attr] = '';
            }
        },
        //保存活动
        saveRule() {
            let that = this;
            this.ruleForm.rulePic = this.imageUrl;
            this.axios.post("/apis/activity/rule/save", this.ruleForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showRuleDialog = false;
                    that.listRule();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editRule(index, rowData) {
            this.dialogTitle = '修改活动规则';
            this.showRuleDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.ruleForm[attr] = rowData[attr];
            }
        },
        updateRule(){
            let that = this;
            this.axios.post("/apis/activity/rule/update", this.ruleForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showRuleDialog = false;
                        that.listRule();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteRule(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/activity/rule/delete?id=" + rowData.ruleId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.ruleList.splice(index, 1);
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
            this.listRule(null, null, value);
        },
        uploadSuccess(response, file, fileList) {
            this.imageUrl = response.result.fileId;
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