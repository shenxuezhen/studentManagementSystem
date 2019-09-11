<template>
  <div class="box">
    <template>
      <el-table :data="classList" height="700" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="科任老师：">
              </el-form-item>
              <el-form-item v-for="value in props.row.courseTeacher" :key="value.course" v-if="props.row.isMath">
                <span>{{ value.name }}：{{value.teacher}}</span>
              </el-form-item>
              <el-form-item v-for="value in props.row.courseTeacher" :key="value.course" v-if="!props.row.isMath">
                <span>{{ value.name }}：{{value.teacher}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="100px;">
        </el-table-column>
        <el-table-column prop="class" label="年级">
        </el-table-column>
        <el-table-column prop="isMath" label="文/理科">
          <template slot-scope="scope">
            <el-tag disable-transitions>{{scope.row.courseType=='math'?'理科':'文科'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="班级">
        </el-table-column>
        <el-table-column prop="studentTotal" label="学生人数">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classList: []
    }
  },
  created() {
    let self = this;
    self.axios.get('/class').then((res) => {
      self.classList = new Array().concat(res.data.first, res.data.second, res.data.third);
    })
  },
  mounted() {},
  methods: {
    filterMath(value, row) {
      console.log(value);
      console.log(row);
    }
  },
  computed: {}
}

</script>
<style>
.el-table td,
.el-table th {
  text-align: center;
}

.el-form--inline .el-form-item {
  margin-right: 50px;
}
.el-tag{
    background: #fff;
    border: none;
    color: #606266;
}
</style>
