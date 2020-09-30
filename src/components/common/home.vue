<template>
  <div class="homeBox">
    <el-row class="header">
      <el-col :span="4">
        <div class="tltle">学生信息管理系统</div>
      </el-col>
      <el-col :span="20">
        <div class="userInfo">
          <span>{{user.name}}</span>
          <span class="logout-btn" @click="logout">注销</span>
        </div>
      </el-col>
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
  data() {
    return {
      user: {}
    }
  },
  created() {
    var user=JSON.parse(localStorage.getItem('user'));
    if(user){
      this.user=user;
    }else{
       this.$message.error('登陆失败，即将跳转到登录页面');
       this.$router.push('/login')
    }
  },
  mounted() {
    $('.col-l').css({ 'height': $(window).innerHeight() })
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$router.push('/login')
    }
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

.header .tltle{
  font-size: 30px;
  font-weight: bold;
  height: 100px;
  line-height: 100px;
  text-align: left;
  padding-left: 30px;
}
.userInfo{
  float: right;
  margin: 16px 40px;
}
.userInfo span{
  display: block;
  line-height: 30px;
}
.userInfo .logout-btn{
  cursor: pointer;
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
