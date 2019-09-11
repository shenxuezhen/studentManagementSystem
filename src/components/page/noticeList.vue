<template>
  <div class="box">
    <template>
      <el-table :data="noticeData" height="300" border style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号" width=100>
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="userSum" label="总用户数">
        </el-table-column>
        <el-table-column prop="noLookSum" label="未查看人数">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state==1?'已发布':'草稿'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button @click="checkClick(scope.row.id)" type="text" size="small" v-if="scope.row.state==1">查看</el-button>
            <el-button @click="editClick(scope.row.id)" type="text" size="small" v-if="scope.row.state==2">编辑</el-button>
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
      noticeData: []
    }
  },
  created() {
    var self = this;
    self.axios.get('/notice').then(res => {
      self.noticeData = res.data;
    })
  },
  methods: {
    checkClick(id) {
      this.$router.push(`/createNotice?id=${id}`);
    },
    editClick(id) {
      this.$router.push(`/createNotice?id=${id}&edit=true`);
    },
    deleteClick(id) {
      var self = this;
      self.axios.delete(`/notice?id=${id}`).then(res => {
        self.noticeData = res.data;
      })
    }
  }
}

</script>
<style scoped>
.el-table--border {
  height: 500px !important;
}

</style>
