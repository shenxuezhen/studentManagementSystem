<template>
  <div class="box">
    <div class="title">学生信息管理系统</div>
    <div class="login" v-if="isLogin">
      <img src="../../assets/default.png">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="用户昵称"></el-input>
        </el-form-item>
        <p v-show="isShowWarning.name">请输入用户昵称</p>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <p v-show="isShowWarning.password">请输入密码</p>
        <el-form-item>
          <el-button type="primary" @click="onLogin(ruleForm)">登录</el-button>
          <!-- <el-button @click="onChangePaw(ruleForm)">修改密码</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="changePwd" v-if="!isLogin">
      <img src="../../assets/changePaw.png">
      <el-form :model="ruleForm" :rules="rulesPwd" ref="ruleForm" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="name">
          <el-input v-model="ruleForm.name" placeholder="新密码" type="password"></el-input>
        </el-form-item>
        <p v-show="isShowWarning.password">请输入新密码</p>
        <el-form-item label="确认新密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="确认新密码" type="password"></el-input>
        </el-form-item>
        <p v-show="isShowWarning.password">请输入确认新密码</p>
        <el-form-item>
          <el-button type="primary" @click="onLogin(ruleForm)">登录</el-button>
          <el-button @click="onChangePaw(ruleForm)">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    <script>
    export default {
      data() {
        return {
          ruleForm: {
            userName: '',
            password: ''
          },
          isLogin: true,
          isShowWarning: {
            userName: false,
            password: false
          },
          rules: {
            userName: [
              { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ],
            password: [
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ]
          },
          rulesPwd: {
            password: [
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            repeatPwd: [
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        onLogin() {
          var that = this;
          if (!that.ruleForm.userName) {
            return that.isShowWarning.userName = true;
          }
          if (!that.ruleForm.password) {
            return that.isShowWarning.password = true;
          }
          that.axios.get(`/login?userName=${that.ruleForm.userName}&password=${that.ruleForm.password}`).then(res => {
            if (res.data.code == 0) {
              localStorage.setItem('user', JSON.stringify(res.data.data))
              that.$router.push('/createUser')
            } else if (res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          })


        },
        onChangePaw() {
          this.isLogin = false;
        }
      }
    }

    </script>
<style scoped>
.box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #2f4050;
}

.title {
  color: #fff;
  font-size: 36px;
  margin: 40px;
  float: left;
}

.login,
.changePwd {
  position: relative;
  max-width: 380px;
  margin: 260px auto;
  padding: 100px 40px 40px;
  border-radius: 4px;
  background-color: #fff;
}

.login img,
.changePwd img {
  position: absolute;
  top: -60px;
  left: 50%;
  overflow: hidden;
  width: 140px;
  height: 140px;
  margin-left: -70px;
  border: 10px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 5px #ccc;
}

.demo-ruleForm {
  margin-top: 22px;
}

.login p {
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 44%;
  left: 30%;
}

.login p:nth-of-type(2) {
  top: 62%;
}

</style>
