<template>
  <div class="homeBox">
    <el-row class="header">
      <div>
        <el-col :span="10">
        </el-col>
        <el-col :span="14">
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-col :span="4" class="col-l">
        <vTree></vTree>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="grid-content bg-purple">
            <transition name="move" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
        
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vTree from './tree'
export default {
  mounted() {
    $('.col-l').css({ 'height': $(window).innerHeight() })
  },
  components: { vTree }
}

</script>
<style scoped>
.homeBox {
  position: fixed;
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #DCDFE6;
}

.col-l {
  border-right: 1px solid #DCDFE6;
}
.content{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
