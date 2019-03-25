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
        <template slot="description">
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
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      id: this.$route.query.id,
      data: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.queryObj.name = ''
      this.data = this.initTreeData(roleTree)
      if (this.id) {
        this.setCheck()
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
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
      api.roleInfo({id: this.id}).then(rs => {
        this.$refs.tree.setCheckedKeys(['eeee'])
      })
    },
    prev () {
      let roleArr = this.$refs.tree.getCheckedKeys()
      if (roleArr.length === 0) {
        this.$messageTips(this, 'error', '请选择权限')
        return
      }
      let params ={
        name: this.queryObj.name,
        description: roleArr.join(',')
      }
      api.roleCreate(params).then(rs => {
        if (rs.code === 200) {
          this.$messageTips(this, 'success', '保存成功')
          this.$router.go(-1)
        } else {
          this.$messageTips(this, 'error', '保存失败')
        }
      })
    },
    cancel () {

    }
  },
  watch: {
    $route: {
      handler (value) {
        if (value.path === '/manage/roleadd') {
          this.id = this.$route.query.id || ''
          this.init()
        }
      },
      immediate: true
    }
  }
}
</script>
