<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addRank">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="rankList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="活动期数"
                    prop="periodId">
                </el-table-column>
                <el-table-column
                    label="名次"
                    prop="rankNum">
                </el-table-column>
                <el-table-column
                    label="昵称"
                    prop="nickname">
                </el-table-column>
                <el-table-column
                    label="MT4"
                    prop="mt4">
                </el-table-column>
                <el-table-column
                    label="盈利(%)"
                    prop="profit">
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
                    @click="editRank(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteRank(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showRankDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="rankForm">
                <el-form-item label-width="100px" label="活动期数">
                    <el-select v-model="rankForm.periodId">
                        <el-option v-for="item in periodList" :key="item.periodId" :label="item.periodName" :value="item.periodId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" label="名次">
                    <el-input v-model="rankForm.rankNum"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="昵称">
                    <el-input v-model="rankForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="MT4">
                    <el-input v-model="rankForm.mt4"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="盈利(%)">
                    <el-input v-model="rankForm.profit"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showRankDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateRank() : saveRank()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showRankDialog: false,
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
            rankList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            rankForm: {
                rankId: '',           //排名ID
                periodId: '',         //活动期数
                rankNum: '',          //活动名次
                mt4: '',              //MT4
                profit: ''       //盈利(%)
            },
            //表格加载是否显示加载动画
            loading: true,
            //活动期数列表
            periodList: []
        }
    },
    mounted() {
        this.listRank(1);
        this.getPeriodList();
    },
    methods: {
        searchByPage(val){
            this.listRank(val);
        },
        //查询排名
        listRank(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/rank/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.rankList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.rankList.push(data.result[i]);
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
        //添加排名
        addRank() {
            this.dialogTitle = '新增排名';
            this.showRankDialog = true;
            this.fileList = [];
            this.isEdit = false;
            //清空数据
            for(let attr in this.rankForm){
                this.rankForm[attr] = '';
            }
        },
        //保存活动
        saveRank() {
            let that = this;
            this.rankForm.rankLogo = this.imageUrl;
            this.axios.post("/apis/rank/save", this.rankForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showRankDialog = false;
                    that.listRank();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editRank(index, rowData) {
            this.dialogTitle = '修改排名';
            this.showRankDialog = true;
            this.imageUrl = rowData.rankLogo;
            this.isEdit = true;
            //获取数据

            let that = this;
            for(let attr in rowData){
                this.rankForm[attr] = rowData[attr];
            }

            this.axios.get("/apis/activity/images/list?ids=" + rowData.rankLogo)
            .then(res=>{
                that.fileList = res.data;
                for(let i=0; i<that.fileList.length; i++){
                    if(that.fileList[i].fileName != undefined){
                        that.fileList[i].name = that.fileList[i].fileName;
                    }
                }
            });
        },
        updateRank(){
            let that = this;
            this.rankForm.rankLogo = this.imageUrl;
            this.axios.post("/apis/rank/update", this.rankForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showRankDialog = false;
                        that.listRank();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteRank(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该排名?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/rank/delete?id=" + rowData.rankId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.rankList.splice(index, 1);
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
            this.listRank(null, null, value);
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