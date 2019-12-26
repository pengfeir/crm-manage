<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'机构'"></ever-bread-crumb>
    <ever-form2
      :schema="infoQuerySchema"
      v-model="infoQueryObj"
      ref="form"
      :rules="rules"
      class="package-sale"
      labelWidth="80px"
      label-position="right">
      <template slot="default">
        <div></div>
      </template>
    </ever-form2>
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">保存</el-button>
      <el-button @click="popShow = false">取消</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
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
export default {
  data () {
    let infoObj = this.createObjFromSchema(infoSchema)
    let rules = {
      'orgName': [
        { required: true, message: '必填项', trigger: 'blur' }
      ]
    }
    return {
      api,
      rules,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      detailId: ''
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      this.getInfo()
    }
  },
  methods: {
    getInfo () {
      api.agencyFindById({ id: this.detailId }).then(rs => {
        if (rs.code === 200) {
          this.infoQueryObj = Object.assign(this.infoQueryObj, rs.data.list[0])
        }
      })
    },
    prev () {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = 'agencyCreate'
          let tips = '新建'
          let params = Object.assign({}, this.infoQueryObj)
          if (this.detailId) {
            url = 'agencyUpdate'
            tips = '修改'
            params['id'] = this.detailId
          }
          api[url](params).then(rs => {
            this.popShow = false
            if (rs.code === 200) {
              this.$messageTips(this, 'success', tips + '成功')
              this.$router.go(-1)
            } else {
              this.$messageTips(this, 'error', tips + '失败')
            }
          })
        }
      })
    },
    emitInfo (row) {
      this.popTitle = '编辑机构'
      this.infoQueryObj.orgName = row.orgName
      this.infoQueryObj.contacts = row.contacts
      this.infoQueryObj.contactNumber = row.contactNumber
      this.infoQueryObj.address = row.address
      this.ageencyID = row.id
      this.popShow = true
    }
  },
  watch: {}
}
</script>
