<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="leftnav">
      <!-- <div @click="toggleCollapse" class="toggleImg">
        <img src="../assets/img/toggleCollapse.png" />
      </div>-->
      <div @click="toggleCollapse" class="toggleImg">
        <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <el-menu
        default-active="2"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
      >
        <el-menu-item index="/dashbord">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      isCollapse: false,
      switchVal: true
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.leftnav {
  .toggleImg {
    display: flex;
    .el-switch {
      height: 35px;
      margin: 0 auto;
    }
  }
  position: relative;
  .el-icon-s-fold {
    margin-left: 45%;
  }
  .el-menu {
    border-right: none;
  }
}
</style>