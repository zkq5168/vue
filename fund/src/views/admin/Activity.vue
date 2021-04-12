<template>
    <div class="container">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="活动名称">
                <el-select v-model="formData.name" placeholder="活动名称">
                    <el-option label="活动一" value="activity1"></el-option>
                    <el-option label="活动二" value="activity2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动期数">
                <el-select v-model="formData.period" placeholder="活动期数">
                    <el-option label="第一期" value="p1"></el-option>
                    <el-option label="第二期" value="p2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: "",
                period: "",
            }
        }
    },
    methods: {
        onSearch() {
            this.axios.get("/activity/search").then(res=>{
                alert(res);
            }).catch(e=>{
                alert(e);
            });
        }
    }
}
</script>
