<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <img src="../assets/logo.home.png" alt="logo" style="width:100%;">
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>
<script>
import api from '@/api/api.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async login () {
      this.clearStore()
      let tokenRs = await api.login(this.loginForm)

      if (tokenRs && tokenRs.code === 200) {
        localStorage.setItem('token', tokenRs.data.token)
        this.$router.push(this.$route.query.redirect || '/page/home')
      }
    },
    clearStore () {
      window.localStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background: url('../assets/login_bg.jpg') no-repeat center;
  background-size:100% 100%;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p.title {
    text-shadow: 0 0 2px #1c7bef;
    font-size: 34px;
    color: #1c7bef;
  }
  p.vice-title {
    font-size: 20px;
    color: #666;
  }
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  // background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
