<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'科室'"></ever-bread-crumb>
    <ever-form2 :schema="queryInfoSchema" v-model="queryInfoObj" ref="form" class="package-sale" :info="true" :rules="rules" labelWidth="100px" label-position="right">
      <template slot="default">
        <div></div>
      </template>
    </ever-form2>
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
let infoSchema = [
  {
    name: 'name',
    label: '科室名称'
  },
  {
    name: 'remark',
    label: '备注'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  }
]
export default {
  data () {
    let infoObj = this.createObjFromSchema(infoSchema)
    let rules = {
      name: [{ required: true, message: '必填项', trigger: 'blur' }]
    }
    return {
      api,
      rules,
      queryInfoSchema: infoSchema,
      queryInfoObj: infoObj,
      detailId: ''
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      this.getInfo()
    }
    this.detailId = this.$route.query.id
  },
  methods: {
    getInfo () {
      api.findByIdDept({ id: this.detailId }).then(rs => {
        if (rs.code === 200) {
          this.queryInfoObj.name = rs.data.name
          this.queryInfoObj.remark = rs.data.remark
        }
      })
    },
    addAgency () {
      this.dialogInfo.popTitle = '新建角色'
      this.dialogInfo.popShow = true
    },
    initTreeData (data) {
      let arr = []
      data.forEach(item => {
        let obj = { label: item.menuName, id: item.auth }
        if (item.childMenus && item.childMenus.length > 0) {
          obj.children = this.initTreeData(item.childMenus)
        }
        arr.push(obj)
      })
      return arr
    },
    handleCheckChange (val) {},
    prev () {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = 'createDept'
          let params = Object.assign({}, this.queryInfoObj)
          if (this.detailId) {
            params.id = this.detailId
            url = 'updateDept'
          }
          api[url](params).then(rs => {
            if (rs.code === 200) {
              this.$messageTips(this, 'success', '保存成功')
              this.$emit('getstatus', {
                data: new Date().getTime(),
                isGetMenu: true
              })
              this.$router.go(-1)
            } else {
              this.$messageTips(this, 'error', '保存失败')
            }
          })
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  },
  watch: {}
}
</script>
<style lang='less' scoped>
.ui_dialog_02 /deep/ .el-col .el-form-item > label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.el-tree {
  background-color: #f8fafe;
}
</style>
