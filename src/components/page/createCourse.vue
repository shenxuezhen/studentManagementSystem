<template>
  <div class="courseBox">
    <el-form ref="form" :model="courseForm" label-width="80px">
      <el-form-item label="文/理科">
        <el-select v-model="courseForm.courseType" placeholder="请选择文/理科">
          <el-option label="文科" value="chinese"></el-option>
          <el-option label="理科" value="math"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="courseForm.label"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseForm: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      var self = this;
      self.axios.post('/course', self.courseForm).then(res => {
        self.$message({
          message: '创建课程成功',
          type: 'success'
        })
      }).catch(error => {
        self.$notify({
          title: '失败',
          message: '创建课程失败'
        })
      })
    },
    cancel() {
      this.$router.push('/courseList');
    }
  }
}

</script>
<style>
.courseBox {
  width: 30%;
  margin: 30px 0 0 30px;
}

.el-select {
  width: 100%;
}

</style>
