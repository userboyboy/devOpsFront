<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="DomainName" label="域名"></el-table-column>
      <el-table-column prop="RecordCount" label="记录数"></el-table-column>
      <el-table-column prop="date" label="标签">
        <el-tag>房友</el-tag>
      </el-table-column>
      <el-table-column prop="VersionCode" label="付费版本" width="180"></el-table-column>
      <el-table-column prop="address" label="DNS状态" width="150"></el-table-column>
      <el-table-column prop="address" label="操作" width="210">
        <template slot-scope="scope">
          <!-- 父元素不显示操作，子元素显示操作 -->
          <div v-if="!scope.row.hasChildren">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleStop(scope.$index, scope.row)">暂停</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  created() {
    this.getDomainList();
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getDomainList() {
      const res = await this.$http.get("aliyun/domain");
      console.log(res);
      
      this.tableData = res.data.Domains.Domain
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(scope, row) {
      console.log(scope, row);
    },

  }
};
</script>