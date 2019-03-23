<template>
  <div>
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
          <el-button type="primary" @click="addAgency">新建</el-button>
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
        prop="orgName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="20"
      :layout="layout"
      :total="totalCount">
    </el-pagination>
    <el-dialog :title="popTitle" :visible.sync="popShow" width="80%"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
      <ever-form2
        :schema="infoQuerySchema" 
        v-model="infoQueryObj"
        ref="form"
        class="package-sale"
        :info="true"
        labelWidth="80px"
        label-position="right">
      </ever-form2>
      <div class="log-btn-container">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="popShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
console.log(list)
let schema = [
  {
    name: 'orgName',
    label: '角色名称'
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
let infoSchema = [
  {
    name: 'orgName',
    label: '机构名称'
  },
  {
    name: 'contacts',
    label: '联系人'
  },
  {
    name: 'contactNumber',
    label: '联系电话'
  },
  {
    name: 'address',
    label: '地址'
  }
]
let rules = {
  batchObj: [
    {orgName: true, message: '请输入机构名称', trigger: 'change'}
  ]
}
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    var infoObj = this.createObjFromSchema(infoSchema)
    return {
      api,
      rules,
      popShow: false,
      popTitle: '新建机构',
      ageencyID: '',
      querySchema: schema,
      queryObj: obj,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      listApiName: 'agencyList',
      tableData: []
    }
  },
  methods: {
    prev () {
      api.agencyCreate(this.infoQueryObj).then(rs => {
        if (rs.code === 200) {
          this.popShow = false
          this.query()
          this.$messageTips(this, 'success', '新建成功')
        }
      })
    },
    addAgency () {
      this.popShow = true
    },
    emitInfo (row) {
      this.infoQueryObj.orgName = row.orgName
      this.infoQueryObj.contacts = row.contacts
      this.infoQueryObj.contactNumber = row.contactNumber
      this.infoQueryObj.address = row.contactNumber
      this.ageencyID = row.id
      this.popShow = true
    },
    delInfo (row) {

    }
  },
  watch: {
    'popShow': {
      handler (newValue) {
        if (!newValue) {
          this.infoQueryObj.orgName = ''
          this.infoQueryObj.contacts = ''
          this.infoQueryObj.contactNumber = ''
          this.infoQueryObj.address = ''
          this.ageencyID = ''
          this.popTitle = '新建机构'
        }
      },
      immediate: true
    }
  },
}
</script>


