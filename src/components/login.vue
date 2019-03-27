<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>elm后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="login">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <el-upload class="avatar-uploader" :action="uploadImage" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import api from "@/api/api.js";
export default {
  data() {
    return {
      uploadImage: "/manage/admin/upload",
      loginForm: {
        username: "",
        password: ""
      },
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmeXoiLCJjcmVhdGVkIjoxNTUzMDY3MDA5OTk3LCJleHAiOjE1NTM2NzE4MDl9.DPrNvLt7AO-YqLo8xKXXAnbIRcnGDWICfnzO89-1prgiUT6iQPvgKwo3qidO5puzxhlP8-wQFhpIiRFvUyhIXQ"
      },

      imageUrl: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  created() {
    this.list();
  },
  computed: {},
  methods: {
    async login () {
      let tokenRs = await api.login(this.loginForm)
      localStorage.setItem('token', tokenRs.data.token)
      let rolesRs = await api.userInfo()
      localStorage.setItem('orgId', rolesRs.data.orgId)
      localStorage.setItem('curUserId', rolesRs.data.id)
      localStorage.setItem('currentUser', JSON.stringify(rolesRs.data))
      this.$router.push(this.$route.query.redirect || '/manage/group')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async list() {
      try {
        let params = {
          username: "fyz",
          password: "1"
        };
        let data = await getInfo(params);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
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
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
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
