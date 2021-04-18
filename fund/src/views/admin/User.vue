<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addUser">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="userList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="用户账户"
                    prop="account">
                </el-table-column>
                <el-table-column
                    label="用户密码"
                    prop="password">
                </el-table-column>
                <el-table-column
                    label="用户类型"
                    prop="userType">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userType==='origin'">普通用户</span>
                        <span v-else>管理员</span>
                    </template>
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
                    @click="editUser(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteUser(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showUserDialog" :isEdit="isEdit">
            <el-form v-model="userForm">
                <el-form-item label-width="100px" label="用户账户">
                    <el-input v-model="userForm.account"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="用户密码">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="用户类型">
                    <el-select v-model="userForm.userType">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="普通用户" value="origin"></el-option>
                    </el-select>
                    <!-- <el-input v-model="userForm.userType"></el-input> -->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateUser() : saveUser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showUserDialog: false,
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
            userList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            userForm: {
                userId: '',             //用户ID
                account: '',            //用户账户
                password: '',           //用户密码
                userType: ''            //用户类型
            },
            //表格加载是否显示加载动画
            loading: true
        }
    },
    mounted() {
        this.listUser(1)
    },
    methods: {
        searchByPage(val){
            this.listUser(val);
        },
        //查询活动
        listUser(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/user/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    this.userList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.userList.push(data.result[i]);
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
        addUser() {
            this.dialogTitle = '新增用户';
            this.showUserDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.userForm){
                this.userForm[attr] = '';
            }
        },
        //保存活动
        saveUser() {
            let that = this;
            this.userForm.userPic = this.imageUrl;
            this.axios.post("/apis/user/save", this.userForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showUserDialog = false;
                    that.listUser();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editUser(index, rowData) {
            this.dialogTitle = '修改用户';
            this.showUserDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.userForm[attr] = rowData[attr];
            }
        },
        updateUser(){
            let that = this;
            this.axios.post("/apis/user/update", this.userForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showUserDialog = false;
                        that.listUser();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteUser(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/user/delete?id=" + rowData.userId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.userList.splice(index, 1);
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
            this.listUser(null, null, value);
        },
        uploadSuccess(response, file, fileList) {
            this.imageUrl = response.result.filePath+"/"+response.result.fileId+"."+response.result.fileExt;
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