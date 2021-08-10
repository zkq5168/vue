<template>
    <div class="container">
        <el-row>
            活动期数：
            <el-select v-model="periodId" placeholder="请选择" @change=search()>
                <el-option
                    v-for="item in periodList"
                    :key="item.periodId"
                    :label="item.periodName"
                    :value="item.periodId">
                </el-option>
            </el-select>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="commentList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="nickname">
                </el-table-column>
                <el-table-column
                    label="评论内容"
                    prop="commentContent">
                </el-table-column>
                <el-table-column
                    label="评论时间"
                    prop="commentTime">
                </el-table-column>
                <el-table-column
                align="right">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteComment(scope.$index, scope.row)">删除</el-button>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            commentList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //表格加载是否显示加载动画
            loading: false,
            //选择的期数
            periodId: null,
            //活动期数列表
            periodList: []
        }
    },
    mounted() {
        // this.listComment(1);
        this.getPeriodList();
    },
    methods: {
        searchByPage(val){
            this.listComment(val);
        },
        //查询排名
        listComment(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/comment/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.commentList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.commentList.push(data.result[i]);
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
        //删除活动
        deleteComment(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该评论?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/comment/delete?id=" + rowData.commentId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.commentList.splice(index, 1);
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
        search() {
            this.listComment(null, null, this.periodId);
        },
        uploadSuccess(response, file, fileList) {
            // this.imageUrl = response.result.filePath+"/"+response.result.fileId+"."+response.result.fileExt;
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
        },
        getPeriodList(){
            let self = this;
            this.axios.get("/apis/activity/period/listNewPeriod")
            .then(res => {
                self.periodList = res.data.result;
            });
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