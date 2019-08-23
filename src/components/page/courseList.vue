<template>
  <div class="courseBox">
    <!-- <el-table :data="courseForm" height="700" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100px;">
        </el-table-column>
        <el-table-column type="" label="文/理科" width="100px;">
        </el-table-column>
        <el-table-column type="" label="课程名称" width="100px;">
        </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
        courseForm:{

        }
    }
  },
  created() {
    var self=this;
    self.axios.get('/course').then(res=>{
        console.log(res);
    })
  },
  mounted() {},
  methods: {}
}

</script>
<style scoped> 
</style>
