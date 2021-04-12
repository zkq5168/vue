<template>
    <div class="user">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-row class="btns">
            <el-button type="primary" plain @click="dialogFormVisible = true">新增</el-button>
        </el-row>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="账号名称">
                    <el-input v-model="form.accout" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-row>
            <el-table
                :data="tableData"
                header-cell-class-name="table_header"
                style="width: 100%">
                <el-table-column
                    label="用户名"
                    width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.name }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="手机号码"
                    width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.phone }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地址"
                    width="580">
                    <template slot-scope="scope">
                        <p>{{ scope.row.address }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-pagination
            :background=true
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        form: {
            account: '',
            username: ''
        },
        dialogFormVisible: false,
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            phone: '13900000001',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            phone: '13900000001',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            phone: '13900000001',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            phone: '13900000001',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        total: 0
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      addUser() {

      }
    }
}
</script>

<style scoped>
.btns {
    margin-bottom: 10px;
}

.el-table {
    min-height: 450px;
}

.el-pagination {
    margin-top: 10px;
    text-align: right;
}
</style>