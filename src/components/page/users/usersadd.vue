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
        <template slot="orgId">
          <el-select v-model="queryObj.orgId" :disabled="!superAdmin" placeholder="请选择">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.orgName"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="roleIds">
          <el-select v-model="queryObj.roleIds" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </ever-form2>
      <div class="log-btn-container">
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
    name: 'username',
    label: '账号'
  },
  {
    name: 'password',
    label: '密码'
  },
  {
    name: 'orgId',
    label: '机构',
    comp: 'custom'
  },
  {
    name: 'nickName',
    label: '用户名'
  },
  {
    name: 'email',
    label: '邮箱'
  },
  {
    name: 'note',
    label: '备注'
  },
  {
    name: 'roleIds',
    label:'角色',
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
    obj.roleIds = []
    obj.orgId = this.getStore('orgId')
    console.log(typeof obj.orgId, 11111)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      id: this.$route.query.id,
      superAdmin: true,
      options: [],
      orgs: []
    }
  },
  created () {
    this.clearInfo()
    this.init()
  },
  methods: {
    init () {
      this.getRoles()
      this.getOrgs()
      if (this.id) {
        this.getInfo()
      }
    },
    getInfo () {
      api.userList({id: this.id}).then(rs => {
        this.queryObj = rs.data[0]
      })
    },
    getRoles () {
      api.roleList({name:'', id: ''}).then(rs => {
        this.options = rs.data || []
      })
    },
    getOrgs () {
      api.agencyList({pageNum: 0, pageSize: 100}).then(rs => {
        this.orgs = rs.data.list || []
      })
    },
    handleCheckChange (val) {
      console.log(val)
    },
    setCheck () {
      api.roleList({name: '',id: this.id}).then(rs => {
        if (rs.code === 200 && rs.data.length>0)
        this.queryObj.name = rs.data[0]['name']
        this.$refs.tree.setCheckedKeys(rs.data[0]['description'].split(','))
      })
    },
    prev () {
      let url = 'userCreate'
      let title = '保存成功'
      let params = Object.assign({}, this.queryObj)
      if (this.id) {
        url = 'userUpdate'
        params.id = this.id
        title = '修改成功'
      }
      api[url](params).then(rs => {
        if (rs.code === '200') {
          this.$messageTips(this, 'success', title)
          this.$router.go(-1)
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    clearInfo () {
      this.queryObj.username = ''
      this.queryObj.password = ''
      this.queryObj.orgId = ''
      this.queryObj.nickName = ''
      this.queryObj.email = ''
      this.queryObj.note = ''
      this.queryObj.roleIds = []
    }
  },
  watch: {
    $route: {
      handler (value) {
        if (value.path === '/manage/usersadd') {
          this.id = this.$route.query.id || ''
          this.init()
        }
      },
      immediate: true
    }
  }
}
</script>
