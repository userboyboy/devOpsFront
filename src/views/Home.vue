<template>
  <el-container>
    <!-- <el-header>
      <div class="logo">
        <img src="http://www.ehousechina.com/resources/images/logo/logoHead.png" />
      </div>
      <div class="title"></div>
    </el-header>-->
    <LeftNav></LeftNav>

    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer style="height:30px">Copyright 2020 by 易居企业集团 - 运维</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LeftNav from "@/components/LeftNav";
import Header from "@/components/Header";

export default {
  name: "Home",
  components: {
    LeftNav,
    Header
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #fff;
  position: relative;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: rgb(247, 246, 244);
}

.el-footer {
  text-align: center;
  background-color: rgb(247, 246, 244);
}
</style>
