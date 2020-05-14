<template>
  <el-aside :width="isCollapse ? '64px' : '230px'">
    <div class="leftnav">
      <div class="logo"></div>

      <el-menu
        default-active="/dashbord"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409BFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :unique-opened="true"
      >
        <el-menu-item index="/dashbord">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
          <template slot="title">
            <i :class="iconsObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="subItem.path + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >{{subItem.authName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "LeftNav",
  created() {
    this.getMenuList();
  },
  data() {
    return {
      isCollapse: false,
      switchVal: true,
      menulist: [],
      iconsObj: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-opportunity",
        "101": "el-icon-s-cooperation",
        "102": "el-icon-tickets",
        "145": "el-icon-postcard"
      }
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("/users/menus");
      if (res.meta.status !== 200) return this.$message.error(res.mets.msg);
      this.menulist = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
.leftnav {
  .logo {
    background-color: #606060;
    height: 60px;
  }

  .el-menu {
    border-right: none;
  }
}
</style>