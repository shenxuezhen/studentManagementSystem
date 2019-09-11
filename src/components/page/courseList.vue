<template>
  <div class="courseBox">
    <el-table :data="courseForm" height="700" border style="width: 100%;">
        <el-table-column type="index" label="序号" width="100px;">
        </el-table-column>
        <el-table-column prop="courseType" label="文/理科" center>
        </el-table-column>
        <el-table-column prop="label" label="课程名称">
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
        courseForm:[]
    }
  },
  created() {
    var self=this;
    self.axios.get('/course').then(res=>{
      res.data.forEach(function(val,ind){
        val.courseType=(val.courseType=='math'?'理科':'文科');
      })
        self.courseForm=res.data;
    })
  },
  mounted() {},
  methods: {}
}

</script>
<style scoped> 
.el-table td, .el-table th{
  text-align: center;
}
</style>
