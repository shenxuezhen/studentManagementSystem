<template>
  <div class="noticeBox">
    <el-form ref="noticeData" :model="noticeData" label-width="80px" :rules="rules">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="noticeData.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input type="textarea" v-model="noticeData.content" placeholder="请添加公告内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="editBtn" type="primary" @click="onSubmit">发布</el-button>
        <el-button class="editBtn" @click="saveDraft">存为草稿</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData: {
        title: '',
        content: '',
        state: null
      },
      rules: {
        title: [{ required: true, message: '公告标题不能为空' },
          { min: 1, max: 15, message: '公告标题在 1 - 15 个字符' }
        ],
        content: [{ required: true, message: '公告内容不能为空' },
          { min: 1, max: 300, message: '公告内容在 1 - 300 个字符' }
        ]
      }
    }
  },
  created() {
    var self = this;
    if (self.$route.query.id) {
      self.axios.get(`/notice?id=${self.$route.query.id}`).then(res => {
        self.noticeData = res.data;
      })
    }
  },
  mounted() {
    if (!this.$route.query.edit) {
      $(".editBtn").hide();
    }
  },
  methods: {
    onSubmit() { //发布
      var self = this;
      self.noticeData.state = 1;
      self.saveNotice('发布公告成功');
    },
    saveDraft() { //存草稿
      var self = this;
      self.noticeData.state = 2;
      self.saveNotice('公告存为草稿');
    },
    cancel() { //取消
      this.$router.push('/noticeList');
    },
    saveNotice(state) {
      var self = this;
      self.axios.post('/notice', self.noticeData).then((res) => {
        self.$notify({
          title: '成功',
          message: state,
          type: 'success',
          onClose() {
            self.$router.push('/noticeList');
          }
        });
      }).catch(error => {
        self.$notify({
          title: '失败',
          message: '公告操作失败'
        })
      })
    }
  }
}

</script>
<style scoped>
.noticeBox {
  width: 30%;
  margin: 30px 0 0 30px;
}

.el-select {
  width: 100%;
}

</style>
