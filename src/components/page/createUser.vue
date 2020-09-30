<template>
  <div class="userBox">
    <el-form label-position="right" label-width="80px" :model="userData" :rules="rules" ref="userData" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="userData.sex" placeholder="请选择性别">
          <el-option v-for="item in options.optionsSex" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="userData.age"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="class" class="select-1">
        <el-select v-model="userData.class" placeholder="请选择年级">
          <el-option v-for="item in options.optionsClass" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="userData.grade" placeholder="请选择班级">
          <el-option v-for="item in options.optionsGrade" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科目" prop="courseType" class="select-1">
        <el-select v-model="userData.courseType" placeholder="请选择文理科">
          <el-option v-for="item in options.optionsType" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="userData.course" placeholder="请选择科目">
          <el-option v-for="item in options.optionsCourse" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="userData.address"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telPhone">
        <el-input v-model="userData.telPhone"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="userName">
        <el-input v-model="userData.userName"></el-input>
      </el-form-item>
      <el-form-item label="是否婚配" prop="isMarry">
        <el-select v-model="userData.isMarry" placeholder="">
          <el-option v-for="item in options.optionsIsMarry" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userData')">创建</el-button>
        <el-button @click="resetForm('userData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        name: '',
        sex: '',
        class: '',
        grade: '',
        courseType: '', //文理科
        course: '',
        role: '', //角色
        userName: '',
        telPhone: null,
        address: '',
        email: '',
        isMarry: ''
      },
      course: {},
      class: {},
      options: {
        optionsSex: [{ value: '1', label: '男' },
          { value: '2', label: '女' }
        ],
        optionsClass: [{ value: '高一', label: '高一' },
          { value: '高二', label: '高二' },
          { value: '高三', label: '高三' }
        ],
        optionGrade: [],
        optionsType: [{ value: 'chinese', label: '文科', isMath: false },
          { value: 'math', label: '理科', isMath: true }
        ],
        optionsCourse: [],
        optionsRole: [{ value: 'admin', label: 'admin' },
          { value: 'classTeacher', label: 'classTeacher' },
          { value: 'user', label: 'user' }
        ],
        optionsIsMarry: [{ value: '1', label: '是' },
          { value: '2', label: '否' }
        ]
      },
      rules: {
        name: [{ required: true, message: '用户姓名不能为空' },
          { min: 2, max: 5, message: '用户姓名在 2 - 5 个字符' }
        ],
        sex: [{ required: true, message: '请选择用户性别' }],
        age: [{ type: 'number', message: '年龄必须为数字值' }],
        class: [{ required: true, message: '请选择年级' }],
        courseType: [{ required: true, message: '请选择科目' }],
        telPhone: [{ required: true, message: '用户手机号不能为空' },
          { min: 11, max: 11, message: '手机号格式不正确' }
        ],
        userName: [{ required: true, message: '用户昵称不能为空' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }]
      }
    }
  },
  created() {
    let self = this;
    self.axios.get('/course').then((res) => {
      self.course = res.data;
    });
    self.axios.get('/class').then(res => {
      self.class = res.data;
    })
  },
  mounted() {},
  methods: {
    submitForm(data) {

    },
    resetForm(data) {
      this.$refs[data].resetFields();
    }
  },
  watch: {
    'userData.courseType': function(newVal, oldVal) { //文理监视
      this.options.optionsCourse = this.course.filter(res => {
        return res.courseType == (newVal == '文科' ? 'chinese' : 'math');
      });
    },
    'userData.class': function(newVal, oldVal) { //班级监视
      this.userData.grade = '';
      var str = '';
      if (newVal == '高一') {
        str = 'first';
      } else if (newVal == '高二') {
        str = 'second';
      } else {
        str = 'third';
      }
      this.options.optionsGrade = this.class[str];
    }
  }
}

</script>
<style scoped>
.userBox {
  width: 30%;
  margin: 30px 0 0 30px;
}

.el-select {
  width: 100%;
}

.select-1 .el-select {
  width: 49.5%;
}

</style>
