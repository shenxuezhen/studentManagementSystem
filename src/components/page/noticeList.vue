<template>
  <div class="box">
    <template>
      <el-table :data="noticeData" height="250" border style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号">
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
        </el-table-column>
      </el-table>
    </template>
    <div class="footer">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData:[]
    }
  },
  created(){
    var self=this;
    self.axios.get('/notice').then(res=>{
      self.noticeData=res.data;
      
    })
  }
}

</script>
<style scoped>
.el-table--border {
  height: 500px !important;
}

</style>
