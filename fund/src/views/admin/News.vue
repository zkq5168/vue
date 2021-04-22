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
                    label="交易商名称"
                    prop="newsName">
                </el-table-column>
                <el-table-column
                    label="交易商图片"
                    prop="newsPic">
                </el-table-column>
                <el-table-column
                    label="成立时间"
                    prop="setupTime">
                </el-table-column>
                <el-table-column
                    label="所属国家"
                    prop="country">
                </el-table-column>
                <el-table-column
                    label="货币点差"
                    prop="currencySpead">
                </el-table-column>
                <el-table-column
                    label="交易品种"
                    prop="newsCategory">
                </el-table-column>
                <el-table-column
                    label="监督机构"
                    prop="supervisor">
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
                <el-form-item label-width="100px" label="交易商名称">
                    <el-input v-model="newsForm.newsName"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动图片">
                    <el-upload v-model="newsForm.newsPic"
                        class="avatar-uploader"
                        action="/apis/upload"
                        list-type = "image/jpeg"
                        :show-file-list="true"
                        :on-success="uploadSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label-width="100px" label="成立时间">
                    <!-- <el-input v-model="newsForm.newsBegin"></el-input> -->
                    <el-date-picker
                        v-model="newsForm.setupTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label-width="100px" label="所属国家">
                    <el-input v-model="newsForm.country"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="货币点差">
                    <el-input v-model="newsForm.currencySpead"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="交易品种">
                    <el-input v-model="newsForm.newsCategory"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="监督机构">
                    <el-input v-model="newsForm.supervisor"></el-input>
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
                newsId: '',          //交易商ID
                newsName: '',        //交易商名称
                newsPic: '',         //交易商图片
                setupTime: '',         //成立时间
                country: '',           //所属国家
                currencySpead: '',     //货币点差
                newsCategory: '',    //交易品种
                supervisor: ''         //监督机构
            },
            //表格加载是否显示加载动画
            loading: true
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
            this.dialogTitle = '新增交易商';
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
            this.newsForm.newsPic = this.imageUrl;
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
            this.dialogTitle = '修改交易商';
            this.showNewsDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.newsForm[attr] = rowData[attr];
            }
        },
        updateNews(){
            let that = this;
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