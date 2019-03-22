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
        label="机构名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="name"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作">
        <template slot-scope="scope">
          <el-buttom type="primary" @click="emitInfo(scope.row)">编辑</el-buttom>
          <el-buttom type="primary" @click="delInfo(scope.row)">删除</el-buttom>
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
    <el-dialog :title="popTitle" :visible.sync="popShow"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
    </el-dialog>
  </div>
</template>
<script>
import list from '@/plugins/list'
let schema = [
  {
    name: 'name',
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
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      popShow: false,
      querySchema: schema,
      queryObj: obj,
      listApiName: 'aaa',
      tableData: [
      ]
    }
  },
  methods: {
    addAgency () {
      this.popShow = true
    },
    emitInfo (row) {

    },
    delInfo (row) {

    }
  }
}
</script>

