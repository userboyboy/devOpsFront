<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="always">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <el-progress type="circle" :percentage="0"></el-progress>
        <el-progress type="circle" :percentage="25"></el-progress>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="always">
        <div id="myChart" :style="{ height: '120px'}"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 初始化Echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "xx 数据" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-progress {
  padding: 5px;
}
</style>