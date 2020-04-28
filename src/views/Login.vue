<template>
  <div class="login">
    <div class="login_box">
      <div class="title">xx XZX 是西湖区最具影响力的 Web 设计规范</div>
      <el-form
        ref="LoginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <div class="login_button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    resetForm() {
      this.$refs.LoginFormRef.resetFields();
    },
    login() {
      this.$refs.LoginFormRef.validate(async val => {
        if (!val) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200)
          return this.$message.error('警告哦，这是一条警告消息');
          
        else
          this.$message.success('恭喜你，这是一条成功消息');
          this.$rpi
      });
    }
  },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.login {
  // background-color: #f0f2f5;
  background-image: url(../assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  .title {
    text-align: center;
    margin-top: -100px;
  }
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 30vh;
    width: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .login_button {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
    }
  }
}
</style>