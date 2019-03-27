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
        prop="name"
        align="center"
        label="角色名称">
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
    <el-dialog :title="dialogInfo.popTitle" :visible.sync="dialogInfo.popShow"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
      <ever-form2
        :schema="queryInfoSchema" 
        v-model="queryInfoObj"
        ref="form"
        class="package-sale"
        :info="true"
        labelWidth="80px"
        label-position="right">
        <template slot="description">
          <el-tree
            :data="treeData"
            ref="tree"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"
            :expand-on-click-node="false">
          </el-tree>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>
      <div class="log-btn-container">
        <el-button type="primary" @click="prev">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
import roleTree from '@/plugins/roletree'
let schema = [
  {
    name: 'name',
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
    name: 'name',
    label: '角色名称'
  },
  {
    name: 'description',
    label:'权限',
    comp: 'custom'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  }
]
export default {
  mixins: [list],
  data () {
    var obj = this.createObjFromSchema(schema)
    var infoObj = this.createObjFromSchema(infoSchema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      queryInfoSchema: infoSchema,
      queryInfoObj: infoObj,
      listApiName: 'roleList',
      tableData: [],
      treeData: [],
      dialogInfo: {
        popShow: false,
        popTitle: '',
        id: '',
      }
    }
  },
  created () {
    this.treeData = this.initTreeData(roleTree)
  },
  methods: {
    addAgency () {
      this.popTitle = '新建角色'
      this.dialogInfo.popShow = true
    },
    list () {
      api[this.listApiName]({name:this.queryObj.name || '', id: ''}).then(rs => {
        if (rs.code === 200) {
          this.tableData = rs.data
        }
      })
    },
    emitInfo (row) {
      this.dialogInfo.id = row.id
      this.queryInfoObj
      this.popTitle = '编辑角色'
      this.setCheck()
    },
    delInfo (row) {
      this.$confirm('确定要删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return api.roleDel({ids: [row.id]})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.query()
      })
    },
    initTreeData (data) {
      let arr = []
      data.forEach(item => {
        let obj = {label: item.menuName, id: item.auth}
        if (item.childMenus && item.childMenus.length > 0) {
          obj.children = this.initTreeData(item.childMenus)
        }
        arr.push(obj)
      })
      return arr
    },
    handleCheckChange (val) {
      console.log(val)
    },
    setCheck () {
      api.roleList({name: '',id: this.id}).then(rs => {
        if (rs.code === 200 && rs.data.length>0)
        this.queryObj.name = rs.data[0]['name']
        this.$refs.tree.setCheckedKeys(rs.data[0]['description'].split(','))
        this.dialogInfo.popShow = true
      })
    },
    prev () {
      let roleArr = this.$refs.tree.getCheckedKeys()
      let url = 'roleCreate'
      if (roleArr.length === 0) {
        this.$messageTips(this, 'error', '请选择权限')
        return
      }
      let params ={
        name: this.queryObj.name,
        description: roleArr.join(',')
      }
      if (this.id) {
        params.id = this.id
        url = 'roleUpdate'
      }
      api[url](params).then(rs => {
        if (rs.code === 200) {
          this.$messageTips(this, 'success', '保存成功')
          this.dialogInfo.popShow = false
          this.query()
        } else {
          this.$messageTips(this, 'error', '保存失败')
        }
      })
    },
    cancel () {
      this.dialogInfo.popShow = false
    },
    clearInfo () {
      this.queryInfoObj.name = ''
      this.queryInfoObj.description = []
    },
  },
  watch: {
    'dialogInfo.popShow': {
      handler (value) {
        if (!value) {
          this.clearInfo()
        }
      },
      immediate: true
    }
  }
}
</script>


