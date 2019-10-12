<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addAgency" plain>新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="name" align="center" label="科室名称">
      </el-table-column>
      <el-table-column prop="remark" align="center" label="备注">
      </el-table-column>
      <el-table-column prop="mtime" align="center" label="更新时间">
      </el-table-column>
      <el-table-column prop="ctime" align="center" label="创建时间">
      </el-table-column>
      <el-table-column prop="name" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button type="text" class="delete-btn-color" icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow:hidden;margin-bottom:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="20"
        :layout="layout"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
let schema = [
  {
    name: 'name',
    label: '科室名称'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  },
  {
    label: '',
    name: 'rightbtn',
    comp: 'custom'
  }
]
export default {
  mixins: [list],
  data () {
    let obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      listApiName: 'deptList',
      tableData: []
    }
  },
  created () {
  },
  methods: {
    addAgency () {
      this.$router.push('/page/sectionadd')
    },
    emitInfo (row) {
      this.$router.push('/page/sectionadd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该科室?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.delDept({ id: row.id })
          if (data && data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.query()
          }
        } catch (err) {
          console.log(err)
        }
      })
        .then(() => {})
    }
  },
  watch: {}
}
</script>
<style lang='less' scoped>
.ui_dialog_02 /deep/ .el-col .el-form-item > label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
