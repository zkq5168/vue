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
                :data="signupList"
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
                    label="MT4账号"
                    prop="mt4Account">
                </el-table-column>
                <el-table-column
                    label="MT4只读密码"
                    prop="nickname">
                </el-table-column>
                <el-table-column
                    label="交易商"
                    prop="traderName">
                </el-table-column>
                <el-table-column
                    label="注册邮箱"
                    prop="traderServer">
                </el-table-column>
                <el-table-column
                    label="注册时间"
                    prop="signupTime">
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
                    type="danger"
                    @click="deleteSignup(scope.$index, scope.row)">删除</el-button>
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
            signupList: [
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
        // this.listSignup(1);
        this.getPeriodList();
    },
    methods: {
        searchByPage(val){
            this.listSignup(val);
        },
        //查询排名
        listSignup(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/signup/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.signupList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.signupList.push(data.result[i]);
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
        deleteSignup(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该排名?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/signup/delete?id=" + rowData.signupId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.signupList.splice(index, 1);
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
            this.listSignup(null, null, this.periodId);
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