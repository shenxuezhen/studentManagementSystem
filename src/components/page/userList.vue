<template>
  <div class="box">
    <template>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex==1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="class" label="年级">
        </el-table-column>
        <el-table-column prop="course" label="科目">
        </el-table-column>
        <el-table-column prop="courseType" label="文/理科">
          <template slot-scope="scope">
            <span>{{scope.row.courseType=='math'?'理科':'文科'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isCheckNewNotice" label="是否查看最新公告">
          <template slot-scope="scope">
            <span>{{scope.row.isCheckNewNotice?'已查看':'未查看'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column prop="telPhone" label="联系方式">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="isMarry" label="是否婚配">
          <template slot-scope="scope">
            <span>{{scope.row.isMarry?'已婚':'未婚'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button @click="checkClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    var self = this;
    self.axios.get('user').then(res => {
      self.tableData = res.data;
    })
  }
}

</script>
<style scoped>
.box {
  margin: 30px;
}

.el-table--border {
  height: 600px !important;
}

.footer {
  margin-top: 20px;
}

</style>
