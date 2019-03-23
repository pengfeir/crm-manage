<template>
  <div>
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
      data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      api,
      querySchema: schema,
      queryObj: obj,
      treeData: []
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
