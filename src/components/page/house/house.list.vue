<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" label-position="right" :nosubmit="true" :inline="true">
        <template slot="area">
          <el-select v-model="queryObj.area" filterable placeholder="请选择" clearable @change="val => {areaChange(val)}">
            <el-option
              v-for="item in options.areaArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="building">
          <el-select v-model="queryObj.building" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in options.buildingArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="floorNo">
          <el-select v-model="queryObj.floorNo" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in options.floorNoArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="dept">
          <el-select v-model="queryObj.dept" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in options.deptArr"
              :key="item.id"
              :label="item.name"
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
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="areaName" label="院区">
      </el-table-column>
      <el-table-column prop="buildingName" label="楼名">
      </el-table-column>
      <el-table-column prop="deptName" label="所属科室">
      </el-table-column>
      <el-table-column prop="floorNo" label="楼层">
        <template slot-scope="scope">
          {{Number(scope.row.floorNo) < 0 ?'B':''}}{{Math.abs(scope.row.floorNo) + " 层"}}
        </template>
      </el-table-column>
      <el-table-column prop="roomNo" label="房间号">
      </el-table-column>
      <el-table-column prop="urlList" label="房间资料" width="150">
        <template slot-scope="scope">
          <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.urlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
          <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button type="text" class="delete-btn-color" icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table id="excelTable" v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="areaName" label="院区">
        </el-table-column>
        <el-table-column prop="buildingName" label="楼名">
        </el-table-column>
        <el-table-column prop="deptName" label="所属科室">
        </el-table-column>
        <el-table-column prop="floorNo" label="楼层">
          <template slot-scope="scope">
            {{Number(scope.row.floorNo) < 0 ? 'B':''}}{{Math.abs(scope.row.floorNo) + " 层"}}
          </template>
        </el-table-column>
        <el-table-column prop="roomNo" label="房间号">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="mtime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="urlList" label="房间资料" width="150">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.urlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="extra" label="其他扩展信息" width="150">
        </el-table-column>
        <el-table-column prop="orgName" label="机构" width="180">
        </el-table-column>
        <el-table-column prop="userId" label="创建者ID" width="180">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="'详情'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :close-on-click-modal="false" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'urlList'?24:6">
            <div v-if="item.id == 'urlList'">
              <label>{{item.label}}</label>:
              <span>
                <fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow>
              </span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>:
              <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else-if="item.id == 'floorNo'">
              <label>{{item.label}}</label>:
              <span>{{Number(item.value) < 0 ?'B':''}}{{Math.abs(item.value) + " 层"}}</span>
            </div>
            <div v-else>
              <label>{{item.label}}</label>:
              <span>{{item.value}}</span>
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
import token from '@/plugins/getUploadToken'
import api from '@/api/api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let schema = [
  {
    name: 'area',
    label: '院区',
    comp: 'custom'
  },
  {
    name: 'building',
    label: '楼名',
    comp: 'custom'
  },
  {
    label: '楼层',
    name: 'floorNo',
    comp: 'custom'
  },
  {
    label: '房间号',
    name: 'roomNo'
  },
  {
    label: '科室',
    name: 'dept',
    comp: 'custom'
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
    id: 'areaName',
    label: '院区',
    value: ''
  },
  {
    id: 'buildingName',
    label: '楼名',
    value: ''
  },
  {
    id: 'deptName',
    label: '所属科室',
    value: ''
  },
  {
    id: 'floorNo',
    label: '楼层',
    value: ''
  },
  {
    id: 'roomNo',
    label: '房间号',
    value: ''
  },
  {
    id: 'ctime',
    label: '创建时间',
    value: ''
  },
  {
    id: 'mtime',
    label: '更新时间',
    value: ''
  },
  {
    id: 'extra',
    label: '其他扩展信息',
    value: ''
  },
  {
    id: 'urlList',
    label: '房间资料',
    value: ''
  }
]
export default {
  mixins: [list, token],
  data () {
    var obj = this.createObjFromSchema(schema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      popShow: false,
      arr,
      listApiName: 'roomList',
      options: {
        areaArr: [], // 院区
        buildingArr: [], // 建筑
        floorNoArr: [], // 楼层
        deptArr: [] // 科室
      },
      floorNoDefault: [
        { id: '6', name: '6 层' },
        { id: '5', name: '5 层' },
        { id: '4', name: '4 层' },
        { id: '3', name: '3 层' },
        { id: '2', name: '2 层' },
        { id: '1', name: '1 层' },
        { id: '-1', name: 'B1 层' },
        { id: '-2', name: 'B2 层' }
      ],
      allBuildingArr: {},
      buildingArrt: []
    }
  },
  methods: {
    areaChange (val) {
      if (!val) {
        this.options.buildingArr = this.buildingArrt
        return
      }
      this.options.buildingArr = this.allBuildingArr[val]
      this.queryObj.building = this.allBuildingArr[val][0]['id']
      this.options.floorNoArr = this.initFloorNoArr(this.allBuildingArr[val][0]['floorsOnGround'], this.allBuildingArr[val][0]['floorsUnderground'])
    },
    initFloorNoArr (on, under) {
      let arr = []
      for (let i = on; i > 0; i--) {
        let obj = { id: i, name: i + ' 层' }
        arr.push(obj)
      }
      for (let i = 1; i < under + 1; i++) {
        let obj = { id: '-' + i, name: 'B' + i + ' 层' }
        arr.push(obj)
      }
      if (arr.length === 0) {
        arr = this.floorNoDefault
      }
      return arr
    },
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '物联网络配置.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    seeDetail (row) {
      arr.forEach(item => {
        item.value = row[item.id] || ''
      })
      this.popShow = true
    },
    addAsset () {
      this.$router.push('/page/houseAdd')
    },
    emitInfo (row) {
      this.$router.push('/page/houseAdd?id=' + row.id)
    },
    delInfo (row) {
      this.$confirm('确定要删除该房间记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let data = await api.deleteRoom({ id: row.id })
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
    },
    async initOptions () {
      let area = api.areaList({ pageNum: 1, pageSize: 200 })
      let building = api.buildingList({ pageNum: 1, pageSize: 1000 })
      let dept = api.deptList({ pageNum: 1, pageSize: 100 })
      let areaArr = await area
      let buildingArr = await building
      let deptArr = await dept
      this.options.areaArr = areaArr.data.list || [];
      (buildingArr.data.list || []).forEach(item => {
        if (this.allBuildingArr[item.hospitalArea]) {
          this.allBuildingArr[item.hospitalArea].push(item)
        } else {
          this.allBuildingArr[item.hospitalArea] = []
          this.allBuildingArr[item.hospitalArea].push(item)
        }
        let curArea = this.options.areaArr.find(lab => lab.id === item.hospitalArea) || { name: '' }
        item.hospitalAreaName = curArea.name
        item.composeName = item.name + ' < ' + item.hospitalAreaName
      })
      this.options.buildingArr = buildingArr.data.list || []
      this.buildingArrt = buildingArr.data.list || []
      this.options.deptArr = deptArr.data.list || []
      this.options.floorNoArr = this.floorNoDefault
    }
  },
  created () {
    this.initOptions()
  }
}
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
.package-sale /deep/ .el-input {
  width: 150px;
}
</style>
