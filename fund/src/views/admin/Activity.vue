<template>
    <div class="container">
        <!-- <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="活动名称">
                <el-select placeholder="活动名称">
                    <el-option label="活动一" value="activity1"></el-option>
                    <el-option label="活动二" value="activity2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动期数">
                <el-select placeholder="活动期数">
                    <el-option label="第一期" value="p1"></el-option>
                    <el-option label="第二期" value="p2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain>查询</el-button>
            </el-form-item>
        </el-form> -->
        <el-row>
            <el-button type="primary" plain @click="addActivity">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="activityList"
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
                    label="活动主题"
                    prop="mainTitle">
                </el-table-column>
                <el-table-column
                    label="活动子标题"
                    prop="subTitle">
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
                    @click="editActivity(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteActivity(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showActivityDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="activityForm">
                <el-form-item label-width="100px" label="活动名称">
                    <el-input v-model="activityForm.activityName"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动主题">
                    <el-input v-model="activityForm.mainTitle"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动子主题">
                    <el-input v-model="activityForm.subTitle"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动内容">
                    <el-input v-model="activityForm.activityContent"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动描述">
                    <el-input v-model="activityForm.activityDesc"></el-input>
                </el-form-item>
                <el-form-item label-width="100px">
                    <el-upload
                        class="upload-demo"
                        action="/apis/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="uploadSuccess"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label-width="100px" label="活动图片">
                    <el-upload v-model="activityForm.activityPic"
                        class="avatar-uploader"
                        action="/apis/upload"
                        list-type = "image/jpeg"
                        :show-file-list="true"
                        :on-success="uploadSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showActivityDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateActivity() : saveActivity()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showActivityDialog: false,
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
            activityList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            activityForm: {
                activityName: '',       //活动名称
                activityPic: '',        //活动图片
                mainTitle: '',          //活动主题
                subTitle: '',           //活动子主题
                activityContent: '',    //活动内容
                activityDesc: ''        //活动描述
            },
            //表格加载是否显示加载动画
            loading: true
        }
    },
    mounted() {
        this.listActivity(1)
    },
    methods: {
        searchByPage(val){
            this.listActivity(val);
        },
        //查询活动
        listActivity(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/activity/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    this.activityList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.activityList.push(data.result[i]);
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
        addActivity() {
            this.dialogTitle = '新增活动';
            this.showActivityDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.activityForm){
                this.activityForm[attr] = '';
            }
        },
        //保存活动
        saveActivity() {
            let that = this;
            this.activityForm.activityPic = this.imageUrl;
            this.axios.post("/apis/activity/save", this.activityForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showActivityDialog = false;
                    that.listActivity();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editActivity(index, rowData) {
            this.dialogTitle = '修改活动';
            this.showActivityDialog = true;
            this.imageUrl = rowData.activityPic;
            this.fileList = [];
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.activityForm[attr] = rowData[attr];
            }
            this.axios.get("/apis/activity/images/list?ids=" + this.imageUrl)
            .then(res=>{
                this.fileList = res.data;
                for(let i=0; i<this.fileList.length; i++){
                    if(this.fileList[i].fileName != undefined){
                        this.fileList[i].name = this.fileList[i].fileName;
                    }
                }
            });
        },
        updateActivity(){
            let that = this;
            this.axios.post("/apis/activity/update", this.activityForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showActivityDialog = false;
                        that.listActivity();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteActivity(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/activity/delete?id=" + rowData.activityId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.activityList.splice(index, 1);
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
            this.listActivity(null, null, value);
        },
        uploadSuccess(response, file, fileList) {
            let imageArr = [];
            for(let i=0; i<fileList.length; i++){
                let f = fileList[i];
                imageArr.push(f.response.result.fileId);
                this.activityForm.activityPic = imageArr.join(",");
            }
            console.log(this.activityForm.activityPic);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning('不允许超过' + fileList.length + '个文件');
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
</style>