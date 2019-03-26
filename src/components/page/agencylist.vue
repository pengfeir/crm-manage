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
        label="机构名称">
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="contactNumber"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <!-- <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.address || ''" placement="top">
            <el-button>{{scope.row.address}}</el-button>
          </el-tooltip>
        </template> -->
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
    <el-dialog :title="popTitle" :visible.sync="popShow"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
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
let schema = [
  {
    name: 'orgName',
    label: '名称'
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
      let url = 'agencyCreate'
      let tips = '新建'  
      let params = Object.assign({}, this.infoQueryObj)
      if (this.ageencyID) {
        url = 'agencyUpdate'
        tips = '修改'
        params['id'] = this.ageencyID
      }
      api[url](params).then(rs => {
        this.popShow = false
        if (rs.code === 200) {
          this.query()
          this.$messageTips(this, 'success', tips + '成功')
        } else {
          this.$messageTips(this, 'error', tips + '失败')
        }
      })
    },
    addAgency () {
      this.popShow = true
    },
    emitInfo (row) {
      this.popTitle = '编辑机构'
      this.infoQueryObj.orgName = row.orgName
      this.infoQueryObj.contacts = row.contacts
      this.infoQueryObj.contactNumber = row.contactNumber
      this.infoQueryObj.address = row.address
      this.ageencyID = row.id
      this.popShow = true
    },
    delInfo (row) {
      this.$confirm('确定要删除该机构?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api.agencyDel({id: row.id})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.query()
      })
    },
    clearInfo () {
      this.infoQueryObj.orgName = ''
      this.infoQueryObj.contacts = ''
      this.infoQueryObj.contactNumber = ''
      this.infoQueryObj.address = ''
      this.ageencyID = ''
      this.popTitle = '新建机构'
    }
  },
  watch: {
    'popShow': {
      handler (newValue) {
        if (!newValue) {
          this.clearInfo()
        }
      },
      immediate: true
    }
  },
}
</script>

