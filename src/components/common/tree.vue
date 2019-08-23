<template>
  <div class="grid-content bg-purple">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="jumpPage"></el-tree>
  </div>
</template>
<script>
export default {
  mounted() {
    $('.col-l').css({
      height: $(window).height()
    })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    jumpPage(value, data) {
      this.$router.push(value.path);
    }
  },
  data() {
    return {
      filterText: '',
      data: [{
          label: '用户管理',
          children: [{
            label: '新增用户',
            path: '/createUser'
          }, {
            label: '用户列表',
            path: '/userList'
          }]
        },
        {
          label: '班级管理',
          children: [{
            label: '新增班级',
            path: '/createClass'
          }, {
            label: '班级列表',
            path: '/classList'
          }]
        },
        {
          label: '学生管理',
          children: [{
            label: '新增学生',
            path: '/createStudent'
          }, {
            label: '学生列表',
            path: '/studentList'
          }]
        },
        {
          label: '课程管理',
          children: [{
            label: '新增课程',
            path: '/createCourse'
          }, {
            label: '课程列表',
            path: '/courseList'
          }]
        },
        {
          label: '公告管理',
          children: [{
            label: '新增公告',
            path: '/createNotice'
          }, {
            label: '公告列表',
            path: '/noticeList'
          }]
        },
        {
          label: '账号管理',
          children: [{
            label: '修改密码',
            path: '/changePwd'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  }
}

</script>
<style scoped>
.box {
  position: fixed;
  width: 100%;
  height: 100%;
}

.bg-purple {
  margin: 30px 8% 0;
  margin-left: 8%;
  margin-top: 31px;
}

</style>
