<template>
  <div class="classBox">
    <el-form label-position="right" ref="classForm" :model="classForm" label-width="80px">
      <el-form-item label="年级">
        <el-select v-model="classForm.class" placeholder="请选择年级">
          <el-option v-for="item in options.optionsClass" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文/理科">
        <el-select v-model="classForm.courseType" placeholder="请选择文/理科">
          <el-option v-for="item in options.optionsCourseType" :key="item.label" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="classForm.label"></el-input>
      </el-form-item>
      <el-form-item label="班主任">
        <el-select v-model="classForm.classTeacher" placeholder="请选择班主任">
          <el-option v-for="item in options.optionsTeacher" :key="item.id" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(classForm)">立即创建</el-button>
        <el-button @click="reset()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classForm: {
        class: '',
        classTeacher: '',
        courseType: '',
        courseTeacher: []
      },
      options: {
        optionsClass: [{ label: '高一' },
          { label: '高二' },
          { label: '高三' }
        ],
        optionsTeacher: [], //班主任列表
        optionsCourseType: [{ value: 'chinese', label: '文科', isMath: false },
          { value: 'math', label: '理科', isMath: true }
        ]
      }
    }
  },
  methods: {
    getUserList() { //获取用户列表，参数
      var self = this;
      var data = {};
      if (self.classForm.class && self.classForm.courseType) {
        data = {
          class: self.classForm.class,
          courseType: self.classForm.courseType
        }
      }
      self.axios.get('/user', { params: data }).then((res) => {
        self.options.optionsTeacher = res.data.classTeacher;
      })
    },
    onSubmit(data) {
      var self = this;
      self.axios.post('/class', data).then(res => {
        self.$notify({
          title: '成功',
          message: '创建班级成功',
          type: 'success',
          onClose() {
            self.$router.push('/classList');
          }
        });
      }).catch(error => {
        self.$notify({
          title: '失败',
          message: '创建班级失败'
        });
      })
    },
    reset(data) {
      this.$router.push('/classList');
    }
  },
  watch: {
    'classForm.class': function(nv, ov) {
      if (!this.classForm.courseType) return;
      this.getUserList();
    },
    'classForm.courseType': function() {
      if (!this.classForm.class) return;
      this.getUserList();
    }
  }
}

</script>
<style scoped>
.classBox {
  width: 30%;
  margin: 30px 0 0 30px;
}

.el-select {
  width: 100%;
}

.courseTeacher .el-select {
  margin-bottom: 10px;
}

</style>
