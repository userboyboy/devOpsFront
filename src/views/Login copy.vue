<template>
  <div class="login">
    <div class="login_box">
      <div class="title">
        <img src="http://www.ehousechina.com/resources/images/logo/logoHead.png" alt srcset />
      </div>
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
          return this.$message.error("error 账户或者密码错误，请重试");
        else this.$message.success("success , 登录成功");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/");
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
    margin: -130px 0 30px 0;
    > img {
      position: relative;
      height: 100px;
      width: 350px;
    }
  }
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 250px;
    width: 430px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    .login_form {
      position: absolute;
      // top: 50%;
      // transform: translateY(-100%);
      // margin-top: 10px;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .login_button {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0;
      }
    }
  }
}
</style>