<template>
  <div class="login-container">
    <el-form
      ref="LoginFormRef"
      :model="loginForm"
      :rules="rules"
      label-width="0px"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">Login 页面啊</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          type="password"
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
        />
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
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
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 8,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
