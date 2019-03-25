<template>
  <div>
    <ever-bread-crumb></ever-bread-crumb>
    <div class="layout_inner">
      <ever-form2
        :schema="querySchema" 
        v-model="queryObj"
        ref="form"
        class="package-sale"
        :info="true"
        labelWidth="80px"
        label-position="right">
        <template slot="treeVal">
          <el-tree
            :data="data"
            ref="tree"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"
            :expand-on-click-node="false">
          </el-tree>
        </template>
      </ever-form2>
      <div>
        <el-button type="primary" @click="prev">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import roleTree from '@/plugins/roletree'
console.log(roleTree)
let schema = [
  {
    name: 'orgName',
    label: '角色名称'
  },
  {
    name: 'treeVal',
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
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      data: []
    }
  },
  created () {
    this.data = this.initTreeData(roleTree)
    console.log(this.data)
  },
  methods: {
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
    handleCheckChange () {

    },
    prev () {

    },
    cancel () {

    }
  },
  watch: {
  },
}
</script>
