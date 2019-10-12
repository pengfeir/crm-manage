<template>
  <div class="layout_inner" :key="'main'">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="actionUserId">
          <el-select v-model="queryObj.actionUserId" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <div class="table-contant">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
        <el-table-column type="index" width="50" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="no" label="保修合同编号" width="150" align="center">
        </el-table-column>
        <el-table-column prop="provider" label="保修提供方" width="150" align="center">
        </el-table-column>
        <el-table-column prop="totalFee" label="保修总金额" width="150" align="center">
          <template slot-scope="scope">
            {{scope.row.totalFee | formatToFinacial}}
          </template>
        </el-table-column>
        <el-table-column prop="assetName" label="设备名称" width="200" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.assetName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="subItemFee" label="设备分项金额" width="150" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.amount | formatToFinacial}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="assetModel" label="设备型号" width="200" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.assetModel?item.assetModel: '--'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="assetSn" label="设备序列号" width="200" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.assetSn?item.assetSn: '--'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="vender" label="生产厂家" width="200" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.vender?item.vender: '--'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="assetName" label="验收时间" width="200" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{item.assetMtime?item.assetMtime.split(' ')[0]: '--'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="保修类别" width="150" align="center">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.assetServiceContracts" :key="index">
              {{JSON.parse(item.kind).whole ? '全保' : '部分保'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="planDate" label="保修起止时间" width="220" align="center">
          <template slot-scope="scope">
            {{(scope.row.beginDate ? scope.row.beginDate.split(' ')[0] : '') + ' 至 ' + (scope.row.endDate ? scope.row.endDate.split(' ')[0] : '')}}
          </template>
        </el-table-column>
        <el-table-column prop="guaranteeCycle" label="保修周期" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.guaranteeCycle}}个月
          </template>
        </el-table-column>
        <el-table-column prop="reportUrlList" label="保修合同附件" width="150" align="center">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.enclosure"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" align="center" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
            <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
            <el-button type="text" class="delete-btn-color"  icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table id="excelTable" :data="excelTableData" style="width: 100%" border stripe max-height="650">
        <el-table-column type="index" width="50" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="no" label="保修合同编号" align="center">
        </el-table-column>
        <el-table-column prop="provider" label="保修提供方" align="center">
        </el-table-column>
        <el-table-column prop="totalFee" label="保修总金额" align="center">
        </el-table-column>
        <el-table-column prop="assetName" label="设备名称" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="设备分项金额" align="center">
        </el-table-column>
        <el-table-column prop="assetModel" label="设备型号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="assetSn" label="设备序列号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="vender" label="生产厂家" width="200" align="center">
        </el-table-column>
        <el-table-column prop="assetName" label="验收时间" width="200" align="center">
          <template slot-scope="scope">
            {{scope.row.assetMtime?scope.row.assetMtime.split(' ')[0]: '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="保修类别" width="150" align="center">
          <template slot-scope="scope">
            <div v-if="JSON.parse(scope.row.kind).whole">全保</div>
            <div v-else>
              部分保({{JSON.parse(scope.row.kind).artificial ? '人工保,' : ''}}
              {{JSON.parse(scope.row.kind).partVal ? '零件保' : ''}}）
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="planDate" label="保修起止时间" width="220" align="center">
          <template slot-scope="scope">
            {{(scope.row.beginDate ? scope.row.beginDate.split(' ')[0] : '') + ' 至 ' + (scope.row.endDate ? scope.row.endDate.split(' ')[0] : '')}}
          </template>
        </el-table-column>
        <el-table-column prop="guaranteeCycle" label="保修周期" width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.guaranteeCycle}}个月
          </template>
        </el-table-column>
        <el-table-column prop="extra" width="200" label="保修零件">
          <template slot-scope="scope">
            <div v-if="scope.row.kind.indexOf('partNameArr') > -1">
              <span v-for="(item,index) in JSON.parse(scope.row.kind).partNameArr" :key="index">
                {{item.name}}
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="'保修合同详情'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'enclosure' || item.id == 'tenderInfo' || item.id == 'extra' || item.id == 'assets' ? 24 : 6">
            <div v-if="item.id == 'enclosure'">
               <label>{{item.label}}</label>: <span><fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow></span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>: <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else-if="item.id == 'subItemFee' || item.id == 'totalFee'">
              <label>{{item.label}}</label>: <span>{{item.value | formatToFinacial}}</span>
            </div>
            <div v-else-if="item.id == 'endDate' || item.id == 'beginDate'">
              <label>{{item.label}}</label>: <span>{{item.value.split(' ')[0]}}</span>
            </div>
            <div v-else-if="item.id == 'assets'">
               <label>{{item.label}}</label>
              <el-table id="assetTable" :data="assetTable" style="width: 100%" border stripe max-height="650">
                <el-table-column type="index" width="50" label="序号" fixed="left">
                </el-table-column>
                <el-table-column prop="assetName" align="center" width="150" label="设备名称">
                </el-table-column>
                <el-table-column prop="amount" align="center" width="150" label="设备分项金额">
                  <template slot-scope="scope">
                    {{scope.row.amount | formatToFinacial}}
                  </template>
                </el-table-column>
                <el-table-column prop="assetModel" align="center" width="150" label="设备型号">
                </el-table-column>
                <el-table-column prop="assetSn" align="center" width="150" label="设备序列号">
                </el-table-column>
                <el-table-column prop="vender" align="center" width="150" label="生产厂家">
                </el-table-column>
                <el-table-column prop="amount" align="center" width="150" label="验收时间">
                  <template slot-scope="scope">
                    {{scope.row.assetMtime?scope.row.assetMtime.split(' ')[0]:'--'}}
                  </template>
                </el-table-column>
                <el-table-column prop="planDate" align="center" width="180" label="保修类别">
                  <template slot-scope="scope">
                    <div v-if="JSON.parse(scope.row.kind).whole">全保</div>
                    <div v-else>
                      部分保({{JSON.parse(scope.row.kind).artificial ? '人工保,' : ''}}
                      {{JSON.parse(scope.row.kind).partVal ? '零件保' : ''}}）
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="extra" width="200" label="保修零件">
                  <template slot-scope="scope">
                    <div v-if="scope.row.kind.indexOf('partNameArr') > -1">
                      <span v-for="(item,index) in JSON.parse(scope.row.kind).partNameArr" :key="index">
                        {{item.name}}
                      </span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else-if="item.id == 'tenderInfo'">
              <label>{{item.label}}</label>:
              <fieldset>
                <legend>投标方一</legend>
                <div class="bidder">
                  <div class="module">
                    <label>投标方名称</label>: <span>{{item.value.name1}}</span>
                  </div>
                  <div class="module">
                    <label>投标方报价</label>: <span>{{item.value.price1 | formatToFinacial}}</span>
                  </div>
                  <div class="module">
                    <label>标书附件</label>
                    <span>
                      <fileshow class="maxsize" :type="'img'" :fileurlList="item.value.img1" :isNoShowBtn="false" :tailor="false"></fileshow>
                    </span>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>投标方二</legend>
                <div class="bidder">
                  <div class="module">
                    <label>投标方名称</label>: <span>{{item.value.name2}}</span>
                  </div>
                  <div class="module">
                    <label>投标方报价</label>: <span>{{item.value.price2 | formatToFinacial}}</span>
                  </div>
                  <div class="module">
                    <label>标书附件</label>
                    <span>
                      <fileshow class="maxsize" :type="'img'" :fileurlList="item.value.img2" :isNoShowBtn="false" :tailor="false"></fileshow>
                    </span>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>投标方三</legend>
                <div class="bidder">
                  <div class="module">
                    <label>投标方名称</label>: <span>{{item.value.name3}}</span>
                  </div>
                  <div class="module">
                    <label>投标方报价</label>: <span>{{item.value.price3 | formatToFinacial}}</span>
                  </div>
                  <div class="module">
                    <label>标书附件</label>
                    <span>
                      <fileshow class="maxsize" :type="'img'" :fileurlList="item.value.img3" :isNoShowBtn="false" :tailor="false"></fileshow>
                    </span>
                  </div>
                </div>
              </fieldset>
            </div>
            <div v-else>
              <label>{{item.label}}</label>: <span>{{item.value}}{{item.id == 'guaranteeCycle' ? '个月' : ''}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="log-btn-container">
        <el-button @click="popShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from '@/plugins/list'
import api from '@/api/api'
import token from '@/plugins/getUploadToken'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    name: 'assetId',
    label: '设备名称',
    comp: 'assets-select'
  },
  {
    label: '保修提供方',
    name: 'provider'
  },
  {
    label: '合同编号',
    name: 'no'
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
let arr = [
  {
    id: 'no',
    label: '保修合同编号',
    value: ''
  },
  {
    id: 'provider',
    label: '保修提供方',
    value: ''
  },
  {
    id: 'type',
    label: '保修范围',
    value: ''
  },
  {
    id: 'totalFee',
    label: '保修总金额',
    value: ''
  },
  {
    id: 'beginDate',
    label: '保修开始时间',
    value: ''
  },
  {
    id: 'endDate',
    label: '保修终止时间',
    value: ''
  },
  {
    id: 'guaranteeCycle',
    label: '保修周期',
    value: ''
  },
  {
    id: 'iphone',
    label: '联系方式',
    value: ''
  },
  {
    id: 'assets',
    label: '关联设备',
    value: ''
  },
  {
    id: 'enclosure',
    label: '保修合同附件',
    value: ''
  },
  {
    id: 'tenderInfo',
    label: '投标方',
    value: ''
  }
]
export default {
  mixins: [list, token],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      arr,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      excelTableData: [],
      options: [],
      popShow: false,
      partArr: [],
      assetTable: [],
      listApiName: 'contractList'
    }
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '保修合同.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    list () {
      this.loading = true
      var params = Object.assign({ pageNum: this.offset, pageSize: this.pagesize }, this.queryObj)
      for (let key in params) {
        if (params[key] === '' || key === 'requestSwitch') {
          delete params[key]
        }
      }
      this.api[this.listApiName](params).then(result => {
        this.loading = false
        if (result) {
          this.tableData = result.data.list
          this.totalCount = result.data.totalCount ? result.data.totalCount : 0
          this.initExeclData(result.data.list)
        } else {
          this.emptyData = true
          this.totalCount = 0
        }
      }).catch(rj => {
        this.loading = false
      })
    },
    initExeclData (data) {
      let arr = []
      if (data.length > 0) {
        data.forEach(item => {
          if (item.assetServiceContracts && item.assetServiceContracts.length > 0) {
            item.assetServiceContracts.forEach(lab => {
              let obj = Object.assign({}, item, lab)
              arr.push(obj)
            })
          }
        })
      }
      this.excelTableData = arr
    },
    seeDetail (row) {
      arr.forEach(item => {
        item.value = row[item.id] || ''
        if (item.id === 'tenderInfo') {
          let val = JSON.parse(row[item.id])
          val.img1 = JSON.stringify(val.img1)
          val.img2 = JSON.stringify(val.img2)
          val.img3 = JSON.stringify(val.img3)
          item.value = val
        } else if (item.id === 'type') {
          let str = row[item.id].replace('1', '维修').replace('2', '保养')
          item.value = str
        } else if (item.id === 'extra') {
          item.value = this.initContractType(row)
        }
      })
      this.assetTable = row.assetServiceContracts
      this.popShow = true
    },
    initContractType (obj) {
      let info = ''
      let extra = JSON.parse(obj.extra)
      if (extra.whole) {
        info = '全保'
      } else if (extra.part) {
        if (extra.artificial) {
          info = '人工保'
        }
        if (extra.partVal) {
          info += (extra.artificial ? ',' : '') + '零件保'
          let partArr = []
          extra.partNameArr.forEach(item => {
            partArr.push(item.name)
          })
          info += '(' + partArr.join(',') + ')'
        }
      }
      return info
    },
    addAsset () {
      this.$router.push('/page/contractAdd')
    },
    emitInfo (row) {
      this.$router.push('/page/contractAdd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该保修合同?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            let data = await api.delContract({ id: row.id })
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.query()
            }
          } catch (err) {
            console.log(err)
          }
        })
        .then(() => {})
    }
  },
  created () {
    api.userList({ id: '', name: '' }).then(rs => {
      if (rs.code === 200 && rs.data.length > 0) {
        this.options = rs.data
      }
    })
    this.$nextTick(_ => {
      let height = document.documentElement.clientHeight
      document.querySelector('.table-contant').style.height = height - 300 + 'px'
    })
    window.onresize = () => {
      if (document.querySelector('.table-contant')) {
        let height = document.documentElement.clientHeight
        document.querySelector('.table-contant').style.height = height - 300 + 'px'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
fieldset {
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 10px;
}
legend {
  padding: 0 10px;
}
.bidder .module {
  margin-top: 5px;
}
</style>
