<template>
    <div class="container">
        <el-row>
            <el-button type="primary" plain @click="addTrader">新增</el-button>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                :data="traderList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50px">
                </el-table-column>
                <el-table-column
                    label="交易商名称"
                    prop="traderName">
                </el-table-column>
                <el-table-column
                    label="交易商图片"
                    prop="traderPic">
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
                    prop="traderCategory">
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
                    @click="editTrader(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteTrader(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="dialogTitle" :visible.sync="showTraderDialog" :close-on-click-modal=false :isEdit="isEdit">
            <el-form v-model="traderForm">
                <el-form-item label-width="100px" label="交易商名称">
                    <el-input v-model="traderForm.traderName"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="活动图片">
                    <el-upload v-model="traderForm.traderPic"
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
                    <!-- <el-input v-model="traderForm.traderBegin"></el-input> -->
                    <el-date-picker
                        v-model="traderForm.setupTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label-width="100px" label="所属国家">
                    <el-input v-model="traderForm.country"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="货币点差">
                    <el-input v-model="traderForm.currencySpead"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="交易品种">
                    <el-input v-model="traderForm.traderCategory"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="监督机构">
                    <el-input v-model="traderForm.supervisor"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showTraderDialog = false">取 消</el-button>
                <el-button type="primary" @click="isEdit ? updateTrader() : saveTrader()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //控制弹窗显示
            showTraderDialog: false,
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
            traderList: [
            // {
            //     activityPic: '',
            //     activityName: '活动',
            //     mainTitle: '活动主题',
            //     subTitle: '活动子标题'
            // }
            ],
            //活动表单数据
            traderForm: {
                traderId: '',          //交易商ID
                traderName: '',        //交易商名称
                traderPic: '',         //交易商图片
                setupTime: '',         //成立时间
                country: '',           //所属国家
                currencySpead: '',     //货币点差
                traderCategory: '',    //交易品种
                supervisor: ''         //监督机构
            },
            //表格加载是否显示加载动画
            loading: true
        }
    },
    mounted() {
        this.listTrader(1)
    },
    methods: {
        searchByPage(val){
            this.listTrader(val);
        },
        //查询活动
        listTrader(pageNum, pageSize, searchTxt) {
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

            this.axios.post("/apis/trader/list", searchObj)
            .then(res=>{
                let data = res.data;
                that.totalPage = data.totalNum;
                if(data.code == 0){
                    that.traderList.splice(0);

                    for(let i=0; i<data.result.length; i++){
                        that.traderList.push(data.result[i]);
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
        addTrader() {
            this.dialogTitle = '新增交易商';
            this.showTraderDialog = true;
            this.isEdit = false;
            //清空数据
            for(let attr in this.traderForm){
                this.traderForm[attr] = '';
            }
        },
        //保存活动
        saveTrader() {
            let that = this;
            this.traderForm.traderPic = this.imageUrl;
            this.axios.post("/apis/trader/save", this.traderForm)
            .then(res=>{
                let data = res.data;
                if(data.code == 0){
                    that.$message({
                        type: "success",
                        message: res.data.msg
                    });
                    that.showTraderDialog = false;
                    that.listTrader();
                }else{
                    that.$message(res.data.msg);
                }
            })
        },
        //编辑活动
        editTrader(index, rowData) {
            this.dialogTitle = '修改交易商';
            this.showTraderDialog = true;
            this.isEdit = true;
            //获取数据
            for(let attr in rowData){
                this.traderForm[attr] = rowData[attr];
            }
        },
        updateTrader(){
            let that = this;
            this.axios.post("/apis/trader/update", this.traderForm)
                .then(res => {
                    if(res.data.code == 0){
                        that.$message({
                            type: "success",
                            message: res.data.msg
                        });
                        that.showTraderDialog = false;
                        that.listTrader();
                    }else{
                        that.$message({
                            type: "warning",
                            message: res.data.msg
                        });
                    }
                })
        },
        //删除活动
        deleteTrader(index,rowData) {
            let that = this;
            this.$confirm('是否确认删除该活动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.get("/apis/trader/delete?id=" + rowData.traderId)
                .then(res=>{
                    if(res.data.code == 0){
                        that.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        //删除列表元素
                        that.traderList.splice(index, 1);
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
            this.listTrader(null, null, value);
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