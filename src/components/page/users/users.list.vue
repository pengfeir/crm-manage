<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query" plain>查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addUsers" v-if="currentUser.icon!=2" plain>新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading.body="loading" :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="nickName" align="center" label="用户名">
      </el-table-column>
      <el-table-column prop="username" align="center" label="账号">
      </el-table-column>
      <el-table-column prop="email" align="center" label="邮箱">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="更新时间">
      </el-table-column>
      <el-table-column prop="name" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="emitInfo(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="text" class="delete-btn-color" @click="delInfo(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="overflow:hidden;margin-bottom:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="20"
        :layout="layout"
        :total="totalCount">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import list from "@/plugins/list";
import api from "@/api/api";
let schema = [
  {
    name: "name",
    label: "用户名"
  },
  {
    name: "btn",
    label: "",
    comp: "custom"
  },
  {
    label: "",
    name: "rightbtn",
    comp: "custom"
  }
];
export default {
  mixins: [list],
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let obj = this.createObjFromSchema(schema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      listApiName: "userList",
      tableData: []
    };
  },
  created() {},
  methods: {
    addUsers() {
      this.$router.push('/page/useradd');
    },
    list() {
      api[this.listApiName]({ name: this.queryObj.name || "", id: "" }).then(
        rs => {
          if (rs.code === 200) {
            this.tableData = rs.data;
          }
        }
      );
    },
    emitInfo(row) {
      this.$router.push('/page/useradd?id=' + row.id);
    },
    delInfo(row) {
      this.$confirm("确定要删除该账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        try {
          let data = await api.userDel({ id: row.id });
          if (data && data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.query();
          }
        } catch (err) {
          console.log(err);
        }
      }).then(() => {});
    },
    init() {
      if (Number(this.currentUser.orgId) === 0) {
        this.dialogInfo.superAdmin = true;
      } else {
        this.queryInfoObj.orgId = this.currentUser.orgId;
        this.dialogInfo.superAdmin = false;
      }
    },
    getInfo() {
      api.userList({ id: this.id }).then(rs => {
        this.queryInfoObj = rs.data[0];
      });
    }
  },
  watch: {}
};
</script>


