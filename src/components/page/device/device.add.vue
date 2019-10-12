<template>
    <div class="layout_inner">
      <ever-bread-crumb :showTitle="'物联设备'"></ever-bread-crumb>
      <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="130px" label-position="right" :rules="rules">
          <template slot="urlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="roomIds">
            <!-- :disabled="roomDisabled" -->
            <el-select v-model="queryObj.roomIds" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="extra">
            <el-button size="small" type="primary" @click="popShow=true">设置</el-button>
          </template>
          <template slot="default">
            <div></div>
          </template>
        </ever-form2>
      </div>
      <div class="log-btn-container" style="margin-bottom:60px;padding-left:130px;">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
      <el-dialog :title="'阈值设置'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="60%" :close-on-click-modal="false" :append-to-body="true">
        <div>
          <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column prop="name" align="center" label="阈值类型">
            </el-table-column>
            <el-table-column prop="value1" align="center" label="设定值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value1" @blur="thresholdCheck1(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value2" align="center" label="设定值2(预留)">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value2" @blur="thresholdCheck2(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="deviation" align="center" label="允许误差">
              <template slot-scope="scope">
                <div style="display:flex">
                  <div><el-input v-model="scope.row.deviation"></el-input></div>
                  <div style="line-height: 1;position: relative;top: 12px;margin-left: 10px;">%</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="单位">
            </el-table-column>
          </el-table>
        </div>
        <div class="pop-btn" style="margin-top:20px;">
          <el-button type="primary" @click="popShow=false">确认</el-button>
          <el-button @click="empty">重置</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
let schema = [
  {
    name: 'macAddr',
    label: 'MAC地址'
  },
  {
    name: 'model',
    label: '设备型号'
  },
  {
    name: 'kind',
    label: '物联设备类别',
    comp: 'el-select',
    props: {
      options: [
        {
          id: 'co',
          name: '协调器'
        },
        {
          id: 'gw',
          name: '网关'
        },
        {
          id: 'sensor',
          name: '监测终端'
        },
        {
          id: 'qr',
          name: '二维码'
        },
        {
          id: '4g',
          name: '4G模块'
        }
      ]
    }
  },
  {
    name: 'roomIds',
    label: '物联网络',
    comp: 'custom'
  },
  {
    name: 'extra',
    label: '阈值',
    comp: 'custom'
  },
  {
    name: 'urlList',
    label: '设备资料',
    comp: 'custom'
  }
]
export default {
  mixins: [token],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      querySchema: schema,
      queryObj: obj,
      detailId: '',
      iotDeviceIdsOptions: [],
      // 保存图片地址
      imgObj: {
        reportImg: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: []
      },
      rules: {
        macAddr: [
          {
            required: true,
            message: '必填项',
            trigger: ['blur']
          }
        ]
      },
      options: [],
      popShow: false,
      roomDisabled: false,
      tableData: [
        { name: '关机电流阈值', value1: '', value2: '', deviation: '', company: 'A' },
        { name: '待机电流阈值', value1: '', value2: '', deviation: '', company: 'A' },
        { name: '激活电流阈值', value1: '', value2: '', deviation: '', company: 'A' },
        { name: '正常电压', value1: '', value2: '', deviation: '', company: 'V' }
      ]
    }
  },
  methods: {
    thresholdCheck1 (row) {
      let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
      if (!regPos.test(row.value1) && !regNeg.test(row.value1)) {
        this.$messageTips(this, 'error', '请输入有效数字')
        row.value1 = ''
        return
      }
      if (row.value1 && row.value2) {
        if (Number(row.value1) < Number(row.value2)) {
          let title = `${row.name}的设定值应大于设定值2`
          this.$messageTips(this, 'error', title)
        }
      }
    },
    thresholdCheck2 (row) {
      let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/
      if (!regPos.test(row.value2) && !regNeg.test(row.value2)) {
        this.$messageTips(this, 'error', '请输入有效数字')
        row.value2 = ''
        return
      }
      if (row.value1 && row.value2) {
        if (Number(row.value1) < Number(row.value2)) {
          let title = `${row.name}的设定值应大于设定值2`
          this.$messageTips(this, 'error', title)
        }
      }
    },
    empty () {
      this.tableData.forEach(item => {
        item.value1 = ''
        item.value2 = ''
        item.deviation = ''
      })
    },
    handleClose () {
      this.$router.go(-1)
    },
    // 删除数组里面删除的图片地址
    handleReportRemove (file, fileList) {
      this.imgObj.reportImg = this.sliceArr(this.imgObj.reportImg, file, 'key')
    },
    // 保存上传的图片地址
    handleReportContractSuccess (response, file, fileList) {
      this.imgObj.reportImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      })
    },
    beforeUploadGetKey (file) {
      // 每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID()
      this.uploadData.token = this.uploadToken
    },
    checkThreshold () {
      if (this.queryObj.kind === 'gw') return false
      let emptyVal = false
      this.tableData.forEach(item => {
        for (let key in item) {
          if (!item[key] && item[key] !== 0) {
            emptyVal = true
          }
        }
      })
      return emptyVal
    },
    prev (id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          if (this.checkThreshold()) {
            this.$messageTips(this, 'error', '请完善阈值信息')
            return
          }
          let url = 'createIotDevice'
          if (this.detailId) {
            url = 'updateIotDevice'
          }
          let tips = this.detailId ? '更新' : '创建'
          let params = Object.assign({}, this.queryObj)
          params.urlList =
            this.imgObj.reportImg.length > 0
              ? JSON.stringify(this.imgObj.reportImg)
              : ''
          params.extra = JSON.stringify(this.tableData)
          params.roomIds = params.roomIds ? [params.roomIds] : []
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
      this.detailId = row.id
      Object.assign(this.queryObj, row)
      this.queryObj.roomIds = this.queryObj.roomIds[0] || ''
      console.log(this.queryObj.roomIds)
      this.filelistObj.reportList =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || []
      this.imgObj.reportImg =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || []
      if (row.extra) {
        let tableData = JSON.parse(row.extra)
        this.tableData.forEach(item => {
          let val = tableData.find(lab => lab.name === item.name)
          if (val) {
            item.value1 = val.value1
            item.value2 = val.value2
            item.deviation = val.deviation
          }
        })
      }
    },
    clearInfo () {
      Object.keys(this.queryObj).map(key => {
        if (key === 'iotDeviceIds') {
          this.queryObj[key] = []
        } else {
          this.queryObj[key] = ''
        }
      })
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = []
      })
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = []
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.findById({ id: this.detailId }).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
    api.roomList({ pageNum: 1, pageSize: 1000 }).then(rs => {
      if (rs.code === 200) {
        let data = []
        rs.data.list.forEach(item => {
          let obj = {}
          obj.name = `${item.buildingName} > ${item.roomNo}`
          obj.id = item.id
          data.push(obj)
        })
        this.options = data
      }
    })
  },
  watch: {
    // 'queryObj.kind': {
    //   handler (value) {
    //     if (value === 'gw') {
    //       this.roomDisabled = false
    //     } else {
    //       this.roomDisabled = true
    //       this.queryObj.roomIds = ''
    //     }
    //   },
    //   immediate: true
    // }
  }
}
</script>
<style lang="less" scoped>
  .pop-btn {
    .el-button--primary {
      color: #fff;
      background-color: #1c7bef;
      border-color: #1c7bef;
    }
    .el-button {
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
    }
  }
</style>
