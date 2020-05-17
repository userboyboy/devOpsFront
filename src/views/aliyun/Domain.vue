<template>
  <div class="users">
    <el-card class="box-card">
      <!-- 搜索和添加 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.KeyWord"
            clearable
            @clear="getdomainList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getdomainList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="AddDialogVisible = true">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="domainList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="DomainName" label="域名名称"></el-table-column>
        <el-table-column prop="RecordCount" label="解析数量"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="VersionCode" label="版本">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.VersionCode == 'mianfei'">免费版</el-tag>
            <el-tag type="success" v-else>非免费版</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="ShowEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserByID(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.PageNumber"
        F
        :page-sizes="[5, 10, 15, 50]"
        :page-size="queryInfo.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加解析对话框 -->
    <el-dialog title="添加解析" :visible.sync="AddDialogVisible" width="50%">
      <el-form :model="AddForm" :rules="FormRules" ref="AddFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="AddForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="AddForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="AddForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="user_type">
          <el-input v-model="AddForm.user_type"></el-input>普通用户为0，管理员为1
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="AddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改解析对话框 -->
    <el-dialog title="修改用户" :visible.sync="EditDialogVisible" width="50%">
      <el-table :data="editDomainDnsData" style="width: 100%">
        <el-table-column prop="RR" label="主机记录" width="180"></el-table-column>
        <el-table-column prop="Type" label="记录类型" width="180"></el-table-column>
        <el-table-column prop="Value" label="记录值" width="180"></el-table-column>
        <el-table-column prop="TTL" label="生存时间" width="180"></el-table-column>
        <el-table-column prop="Status" label="当前的解析记录状态" width="180"></el-table-column>
        <el-table-column prop="Locked" label="当前解析记录锁定状态"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  created() {
    this.getdomainList();
  },
  data() {
    return {
      // DNS 解析弹出列表
      editDomainDnsData: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 关键字，按照“%KeyWord%”模式搜索，不区分大小写。
        KeyWord: "",
        // 当前页数，起始值为1，默认为1。
        PageNumber: 1,
        // 分页查询时设置的每页行数，最大值100，默认为20。
        PageSize: 10
      },
      AddForm: {
        username: "",
        password: "",
        email: "",
        user_type: ""
      },
      // EditForm: {
      //   username: "",
      //   password: "",
      //   email: "",
      //   mobile: ""
      // },
      FormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
        ]
      },
      // 获取用户信息
      domainList: [],
      total: 0,
      // 添加用户对话框的显示和隐藏
      AddDialogVisible: false,
      // 修改用户对话框的显示和隐藏
      EditDialogVisible: false
    };
  },
  methods: {
    async getdomainList() {
      const { data: res } = await this.$http.post("aliyun/domain/list", {
        params: this.queryInfo
      });
      console.log(res);
      this.domainList = res.Domains.Domain;
      this.total = res.TotalCount;
      if (res.Domains.Domain == []) return;
    },
    handleSizeChange(newSize) {
      this.queryInfo.PageSize = newSize;
      this.getdomainList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.PageNumber = newPage;
      this.getdomainList();
    },
    addUser() {
      this.$refs.AddFormRef.validate(async valid => {
        if (!valid) return;
        // 发起添加用户的请求
        const { data: res } = await this.$http.post("users/add", this.AddForm);
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.AddDialogVisible = false;
        this.getdomainList();
      });
    },
    // 打开修改弹窗
    async ShowEditDialog(EditFromData) {
      const { data: res } = await this.$http.post("aliyun/domain/dns", {
        params: {
          KeyWord: EditFromData.DomainName
        }
      });
      console.log(res.DomainRecords.Record, "res==============res");
      this.editDomainDnsData = res.DomainRecords.Record;
      console.log(EditFromData.DomainName, "EditFromData=============");

      this.EditForm = EditFromData;
      this.EditDialogVisible = true;
    },
    // 发起修改用户的请求
    EditUserInfo() {
      this.$refs.EditFormRef.validate(async val => {
        if (!val) return;
        const { data: res } = await this.$http.put(
          "users/" + this.EditForm.id,
          { email: this.EditForm.email, mobile: this.EditForm.mobile }
        );
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg);
        }
        this.EditDialogVisible = false;
        this.getdomainList();
        this.$message.success(res.meta.msg);
      });
    },
    // 根据ID删除用户
    async removeUserByID(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      // 如果用户确定删除，返回字符串 confirm , 如果用户去掉删除，返回字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      const { data: res } = await this.$http.delete("users/delete/" + id);
      if (res.meta.status !== 200) {
        this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getdomainList();
    }
  }
};
</script>

<style lang='less' scoped>
</style>