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
                :page-size = 5
                :total="totalPage">
            </el-pagination>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="showActivityDialog">
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
                <el-form-item label-width="100px" label="活动图片">
                    <el-upload
                        class="avatar-uploader"
                        action="/apis/upload"
                        :list-type = "image/jpeg"
                        :show-file-list="true"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showActivityDialog = false">取 消</el-button>
                <el-button type="primary" @click="showActivityDialog = false">确 定</el-button>
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
            //总页数
            totalPage: 1,
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
                mainTitle: '',          //活动主题
                subTitle: '',           //活动子主题
                activityContent: '',    //活动内容
                activityDesc: ''        //活动描述
            }
        }
    },
    mounted() {
        this.listActivity(1, 5)
    },
    methods: {
        //查询活动
        listActivity(pageNum, pageSize) {
            let that = this;
            if(!pageNum){
                pageNum = 1;
            }
            if(!pageSize){
                pageSize = 10;
            }

            this.axios.post("/apis/activity/list", { "pageNum": pageNum, "pageSize": pageSize})
            .then(res=>{
                let data = res.data;
                that.totalPage = data.result.length;
                if(data.code == 0){
                    for(let i=0; i<data.result.length; i++){
                        that.activityList.push(data.result[i]);
                    }
                }else{
                    that.$message(data.msg);
                }
            }).catch(e=>{
                that.$message(e);
            })
        },
        //添加活动
        addActivity() {
            this.dialogTitle = '新增活动';
            this.showActivityDialog = true;
            //清空数据
            for(let attr in this.activityForm){
                this.activityForm[attr] = '';
            }
        },
        //编辑活动
        editActivity(index, rowData) {
            this.dialogTitle = '修改活动';
            this.showActivityDialog = true;
            //获取数据
            for(let attr in rowData){
                this.activityForm[attr] = rowData[attr];
            }
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
            console.log(value);
            this.axios.get('/apis/activity/search')
            .then(res=>{
                console.log(res);
            }).catch((e,data)=>{
                console.log(e, data);
            });
        },
        uploadSuccess(response, file, fileList) {
            debugger;
        }
    }
}
</script>

<style scoped>
.el-table {
    min-height: 450px;
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