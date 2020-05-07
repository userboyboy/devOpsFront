<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="http://www.ehousechina.com/resources/images/logo/logoHead.png" />
      </div>
      <div class="title">XxX 系统</div>
    </el-header>
    <el-container>
      <LeftNav></LeftNav>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import LeftNav from "@/components/LeftNav";

export default {
  name: "Home",
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
    font-size: 30px;
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: rgb(247, 246, 244);
}

.el-footer {
  background-color: crimson;
}
</style>
