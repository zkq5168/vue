<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addActivityDetail">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="activityDetailList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="活动"
                    prop="activityId">
                </el-table-column>
                <el-table-column
                    label="活动期数"
                    prop="peroidId">
                </el-table-column>
                <el-table-column
                    label="明细标题"
                    prop="detailTitle">
                </el-table-column>
                <!-- <el-table-column
                    label="明细内容"
                    prop="detailContent">
                </el-table-column> -->
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
                    @click="editActivityDetail(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteActivityDetail(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" :isEdit="isEdit">
            <el-form v-model="activityDetailForm">
                <el-form-item label-width="100px" label="活动名称">
                    <el-input v-model="activityDetailForm.activityId"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动期数">
                    <el-input v-model="activityDetailForm.peroidId"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="明细标题">
                    <el-input v-model="activityDetailForm.detailTitle"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="明细内容">
                    <el-input v-model="activityDetailForm.detailContent"></el-input>
                </el-form-item>
                <!-- <el-form-item label-width="100px" label="用户类型">
                    <el-select v-model="activityDetailForm.userType">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="普通用户" value="origin"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateActivityDetail() : saveActivityDetail()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showDialog: false,
            //列表搜索关键字
            searchTxt: '',
            //对话框标题
            dialogTitle: '',
            //上传图片地址
            imageUrl: '',
            //总页数
            totalPage: 1,
            //是否修改
            isEdit: false,
            //列表数据
            activityDetailList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            activityDetailForm: {
                activityId: '',
                peroidId: '',
                detailTitle: '',
                detailContent: ''
            },
            //表格加载是否显示加载动画
            loading: true
        }
    },
    mounted() {
        this.listActivityDetail(1)
    },
    methods: {
        searchActivity() {
            let that = this;

            this.axios.get("/activity/detail/list")
            .then(res => {

            }).finally(()=>{

            });
        },
        searchByPage(val){
            this.listActivityDetail(val);
        },
        //查询活动
        listActivityDetail(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/activity/detail/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    this.activityDetailList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.activityDetailList.push(data.result[i]);
                    }
                }else{
                    that.$message(data.msg);
                }
            }).catch(e=>{
                that.$message(e);
            }).finally(() => {
                that.loading = false;
            });
        },
        //添加活动
        addActivityDetail() {
            this.dialogTitle = '新增活动明细';
            this.showDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.activityDetailForm){
                this.activityDetailForm[attr] = '';
            }
        },
        //保存活动
        saveActivityDetail() {
            let that = this;
            this.axios.post("/apis/activity/detail/save", this.activityDetailForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showDialog = false;
                    that.listActivityDetail();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editActivityDetail(index, rowData) {
            this.dialogTitle = '修改活动明细';
            this.showDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.activityDetailForm[attr] = rowData[attr];
            }
        },
        updateActivityDetail(){
            let that = this;
            this.axios.post("/apis/activity/detail/update", this.activityDetailForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showDialog = false;
                        that.listActivityDetail();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteActivityDetail(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动明细?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/activity/detail/delete?id=" + rowData.detailId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.activityDetailList.splice(index, 1);
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
            this.listActivityDetail(null, null, value);
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
</style>