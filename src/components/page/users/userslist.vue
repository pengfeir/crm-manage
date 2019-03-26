<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2
        :schema="querySchema" 
        v-model="queryObj"
        @query="query"
        ref="form"
        class="package-sale"
        :info="true"
        :labelWidth="140"
        label-position="right"
        :nosubmit="true"
        :inline="true">
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addUsers">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table
      v-loading.body="loading"
      :data="tableData"
      style="width: 100%"
      border
      stripe>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delInfo(scope.row)">删除</el-button>
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
import list from '@/plugins/list'
import api from '@/api/api'
console.log(list)
let schema = [
  {
    name: 'name',
    label: '用户名'
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
// "email": "string",邮箱
//   "icon": "string",头像
//   "nickName": "string",用户名
//   "note": "string",备注
//   "orgId": 0,
//   "password": "string",密码
//   "username": "string"账号
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      listApiName: 'userList',
      tableData: []
    }
  },
  methods: {
    addUsers () {
      this.$router.push('/manage/usersadd')
    },
    list () {
      api[this.listApiName]({name:this.queryObj.name || '', id: ''}).then(rs => {
        if (rs.code === 200) {
          this.tableData = rs.data
        }
      })
    },
    emitInfo (row) {
      this.$router.push('/manage/usersadd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api.userDel({id: row.id})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.query()
      })
    }
  },
  watch: {
    $route: {
      handler (value) {
        if (value.path === '/manage/rolelist') {
          this.query()
        }
      },
      immediate: true
    }
  }
}
</script>


