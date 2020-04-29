<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="http://www.ehousechina.com/resources/images/logo/logoHead.png" />
      </div>
      <div class="title">Apollo XxX 系统</div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <LeftNav></LeftNav>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import LeftNav from "@/components/LeftNav";

export default {
  name: "home",
  components: {
    LeftNav
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: antiquewhite;
  position: relative;

  .logo {
    > img {
      height: 30px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .title {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 180px;
    // margin: 10px 0 0 15px;
    font-size: 30px;
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: burlywood;
}
.el-footer {
  background-color: crimson;
}
</style>