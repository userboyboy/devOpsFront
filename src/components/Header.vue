<template>
  <div class="header">
    <i class="el-icon-s-fold"></i>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  }
};
</script>

<style lang="less" scoped>
.el-icon-s-fold {
  margin-top: 22px;
}
</style>