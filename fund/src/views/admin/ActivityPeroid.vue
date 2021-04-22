<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addPeriod">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="periodList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="活动名称"
                    prop="activityName">
                </el-table-column>
                <el-table-column
                    label="期数"
                    prop="periodName">
                </el-table-column>
                <el-table-column
                    label="报名开始时间"
                    prop="signupBegin">
                </el-table-column>
                <el-table-column
                    label="报名结束时间"
                    prop="signupEnd">
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
                    @click="editPeriod(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deletePeriod(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showPeriodDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="periodForm">
                <el-form-item label-width="100px" label="活动名称">
                    <el-select v-model="periodForm.activityId" placeholder="请选择活动">
                        <el-option v-for="item in activityList" :key="item.activityId" :label="item.activityName" :value="item.activityId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="100px" label="期数">
                    <el-input v-model="periodForm.periodName"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="报名开始时间">
                    <el-date-picker
                        v-model="periodForm.signupBegin"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-input v-model="periodForm.signupBegin"></el-input> -->
                </el-form-item>
                <el-form-item label-width="100px" label="报名结束时间">
                    <el-date-picker
                        v-model="periodForm.signupEnd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-input v-model="periodForm.signupEnd"></el-input> -->
                </el-form-item>
                <el-form-item label-width="100px" label="活动开始时间">
                    <el-date-picker
                        v-model="periodForm.periodBegin"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-input v-model="periodForm.periodBegin"></el-input> -->
                </el-form-item>
                <el-form-item label-width="100px" label="活动结束时间">
                    <el-date-picker
                        v-model="periodForm.periodEnd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <!-- <el-input v-model="periodForm.periodEnd"></el-input> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showPeriodDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updatePeriod() : savePeriod()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showPeriodDialog: false,
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
            periodList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            periodForm: {
                activityId: '',         //活动ID
                activityName: '',       //活动名称
                periodName: '',         //期数
                signupBegin: '',        //报名开始时间
                signupEnd: '',          //报名结束时间
                periodBegin: '',        //活动开始时间
                periodEnd: '',          //活动结束时间
            },
            //表格加载是否显示加载动画
            loading: true,
            //活动列表数据
            activityList: []
        }
    },
    mounted() {
        this.listPeriod(1);
        this.listActivity();
    },
    methods: {
        //查询活动
        listActivity(){
            let that = this;
            let params = {"pageNum": 1, "pageSize": 100, "param": null};
            this.axios.post("/apis/activity/list", params)
            .then(res=>{
                that.activityList = res.data.result;
            });
        },
        searchByPage(val){
            this.listPeriod(val);
        },
        //查询活动期数
        listPeriod(pageNum, pageSize, searchTxt) {
            debugger;
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

            this.axios.post("/apis/activity/period/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    this.periodList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.periodList.push(data.result[i]);
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
        addPeriod() {
            this.dialogTitle = '新增活动';
            this.showPeriodDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.periodForm){
                this.periodForm[attr] = '';
            }
        },
        //保存活动
        savePeriod() {
            let that = this;
            this.axios.post("/apis/activity/period/save", this.periodForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showPeriodDialog = false;
                    that.listPeriod();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editPeriod(index, rowData) {
            this.dialogTitle = '修改活动';
            this.showPeriodDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.periodForm[attr] = rowData[attr];
            }
        },
        updatePeriod(){
            let that = this;
            this.axios.post("/apis/activity/period/update", this.periodForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showPeriodDialog = false;
                        that.listPeriod();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deletePeriod(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/activity/period/delete?id=" + rowData.periodId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.periodList.splice(index, 1);
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
            this.listPeriod(null, null, value);
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