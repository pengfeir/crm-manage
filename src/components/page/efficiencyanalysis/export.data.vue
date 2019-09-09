<template>
  <div class="layout_inner">
    <div class="ever-bread-crumb">
      <el-button @click="go" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
      <span>返回</span>
    </div>
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :inline="true">
        <template slot="time">
          <el-date-picker
            v-model="queryObj.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </template>
        <template slot="type">
          <el-select v-model="queryObj.type" filterable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template>
          <el-button type="primary" @click="query">查看</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" id="excelTable" :data="tableData" style="width: 100%" :show-header="false" :row-class-name="tableRowClassName" border>
      <el-table-column prop="vender" label="厂家">
      </el-table-column>
      <!-- <el-table-column prop="b" label="医院">
      </el-table-column> -->
      <!-- <el-table-column prop="c" label="医院总量(院区)" width="100">
      </el-table-column> -->
      <el-table-column prop="type" label="设备分类">
      </el-table-column>
      <el-table-column prop="assetName" label="设备名称">
      </el-table-column>
      <el-table-column prop="kind" label="设备类别">
      </el-table-column>
      <el-table-column prop="deptName" label="科室">
      </el-table-column>
      <el-table-column prop="num" label="分项数量">
      </el-table-column>
      <el-table-column prop="timeSlot" label="时间" width="200">
      </el-table-column>
      <el-table-column prop="turnOnRate" label="开机率">
      </el-table-column>
      <!-- <el-table-column prop="i" label="故障率">
      </el-table-column> -->
      <el-table-column prop="time" label="总激活时间">
      </el-table-column>
      <el-table-column prop="averageTime" label="平均激活时间">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "@/api/api";
import FileSaver from 'file-saver';
import moment from 'moment';
import XLSX from 'xlsx';
let schema = [
  {
    label: "设备分类",
    name: "type",
    comp: "custom"
  },
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  }
];
export default {
  data() {
    let obj = this.createObjFromSchema(schema);
    obj.type = 1
    obj.time = [
      moment(new Date().getTime() - 86400000 * 30).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      loading: false,
      options: [
        {id: 1, name: '按科室'},
        {id: 2, name: '按设备类别'}
      ],
      deptArr: [], // 科室列表
      tableData: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      deptAssetInfo: {},
      deptAssetArr: [],
      areaNameInfo: {},
      assetList: {}
    };
  },
  created () {
    api.assetList({pageNum: 1, pageSize: 2000}).then(rs => {
      let obj = {}
      rs.data.list.forEach(item => {
        obj[item.id] = item
      })
      this.assetList = obj
    })
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备.xlsx')
      } catch (e) { 
        if (typeof console !== 'undefined') {
          console.log(e, wbout) 
        }
      }
      return wbout
    },
    query () {
      this.loading = true
      this.deptAssetArr = []
      this.tableData = []
      api.deptList({pageNum: 1, pageSize: 500}).then(rs => {
        this.deptArr = rs.data.list || [];
        this.getAssetData()
      })
    },
    async getAssetData () {
      this.deptArr.forEach(item => {
        this.assetData(item.id)
      })
    },
    initNoAssetTime (deptId) {
      let deptInfo = {
        deptName: this.deptArr.find(item => item.id === deptId)['name'],
        num: 0,
        time: 0,
        averageTime: 0,
        list: []
      } 
      this.deptAssetArr.push(deptInfo)
      this.initTableData()
    },
    initAssetTime (data ,deptId, areaName) {
      let obj = {}
      let len = 0
      let allTime = 0
      data.forEach(item => {
        len ++
        item.powerTimes.forEach(lab => {
          allTime += (Number(lab.powerOffTime) + Number(lab.standbyTime))
          if (obj[lab.assetId]) {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId]['turnOnRate'] += 1
              obj[lab.assetId]['time'] += (Number(lab.powerOffTime) + Number(lab.standbyTime))
            }
          } else {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId] = {turnOnRate: 1, time: (Number(lab.powerOffTime) + Number(lab.standbyTime)), assetName: lab.assetName, vender: this.assetList[lab.assetId]['vender'], areaName: areaName, num:1, kind: this.assetList[lab.assetId]['kind']}
            } else {
              obj[lab.assetId] = {turnOnRate: 0, time: 0, assetName: lab.assetName, vender: this.assetList[lab.assetId]['vender'], areaName: areaName,num:1, kind: this.assetList[lab.assetId]['kind']}
              // turnOnRate 当天激活就+1，最后激活率就是激活次数/总天数 ，time激活时间，averageTime平均激活时间，assetName设备名称，vender厂家名称，areaname院区 ，num个数, kind设备类别
            }
          }
        })
      })
      for (let key in obj) {
        obj[key]['averageTime'] = (obj[key]['time']/len === 0)? 0: (obj[key]['time']/len).toFixed(2)
        obj[key]['turnOnRate'] = (obj[key]['turnOnRate']/len === 0)? 0: (obj[key]['turnOnRate']/len).toFixed(2)
      }
      let deptInfo = {
        deptName: this.deptArr.find(item => item.id === deptId)['name'],
        num: Object.keys(obj).length,
        time: allTime,
        averageTime: (allTime/len) === 0? 0: (allTime/len).toFixed(2),
        list: Object.values(obj)
      }
      this.deptAssetArr.push(deptInfo)
      this.initTableData()
    },
    async assetData (deptId) {
      let params = {
        pageNum: 0,
        pageSize: 1000,
        timeDivide: true, //是否间隔
        interval: 1, //间隔天数
        beginDate: moment(this.queryObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00', //开始时间
        endDate: moment(this.queryObj.time[1]).format('YYYY-MM-DD')+ ' 23:59:59', //结束时间
        deptId: deptId
      }
      await api.powerTimeStatistics(params).then(rs => {
        if (rs.data[0]['powerTimes'].length > 0) { // 科室有设备
          this.getAssetMacId(deptId, rs.data)
        } else { // 科室无设备
          this.initNoAssetTime(deptId)
        }
      })
    },
    async getAssetMacId (deptId, data) {
      let mac = await api.findById({id: data[0]['powerTimes'][0]['iotDeviceId']}) // 根据mac对应id获取mac地址
      let areaName = await api.findByMacAddr({macAddr: mac.data.macAddr}) // 根据mac地址获取对应的物联院区信息
      this.areaNameInfo[deptId] = areaName.data.areaName     
      this.initAssetTime(data, deptId, areaName.data.areaName)
    },
    tableRowClassName({row, rowIndex}) {
      if (row.vender === '汇总') {
        return 'warning-row';
      } else if (row.vender === '厂家名称') {
        return  'title-row'
      }
      return '';
    },
    go () {
      this.$router.go(-1)
    },
    initTableData () {
      if (this.deptAssetArr.length !== this.deptArr.length) return
      this.loading = false
      this.initTableData2()
    },
    initTableData2 () {
      let title = {
        vender: '厂家名称',
        type: '设备分类',
        assetName: '设备名称',
        kind: '设备类别',
        deptName: '科室',
        num: '分项数量',
        timeSlot: '时间',
        turnOnRate: '开机率',
        time: '总激活时间',
        averageTime: '平均激活时间'
      }
      let tableData = []
      let obj = {}
      let timeSlot = moment(this.queryObj.time[0]).format('YYYY-MM-DD') + '至' + moment(this.queryObj.time[1]).format('YYYY-MM-DD')
      this.deptAssetArr.forEach(item => {
        tableData.push(title)
        if (item.list.length === 0) {
          tableData.push({deptName: item.deptName, num: 0})
        }
        item.list.forEach(lab => {
          lab.deptName = item.deptName;
          lab.timeSlot = timeSlot
          tableData.push(lab)
          if(obj[lab.kind]){
            obj[lab.kind].push(lab)
          } else {
            obj[lab.kind] = [lab]
          }
        })
        tableData.push(Object.assign({}, item, {vender: '汇总', type: this.queryObj.type ===1?'按科室': '按设备类别', deptName: ''}))
      })
      let tableData1 = []
      let len = this.datedifference(moment(this.queryObj.time[0]).format('YYYY-MM-DD'), moment(this.queryObj.time[1]).format('YYYY-MM-DD'))
      for(let key in obj) {
        tableData1.push(title)
        let info = {
          num: 0,
          time: 0,
          averageTime: 0
        }
        obj[key].forEach(item => {
          info.num ++;
          info.time += item.time;
          tableData1.push(item)
        })
        info.averageTime = (info.time/len) === 0? 0: (info.time/len).toFixed(2)
        tableData1.push(Object.assign({}, info, {vender: '汇总', type: this.queryObj.type ===1?'按科室': '按设备类别', kind: key}))
      }
      if (this.queryObj.type ===1) {
        this.tableData = tableData
      } else {
        this.tableData = tableData1
      }
    },
    datedifference (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
      let dateSpan,tempDate,iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays + 1
    }
  }
};
</script>
<style lang="less" scoped>
  .scroll {
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .package-sale /deep/ .el-form-item__label {
    width: 80px;
  }
  .ever-bread-crumb {
    margin-bottom: 10px;
    color:#606266;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin-right: 5px;
  }
  .main-head /deep/ .el-date-editor {
    position: relative;
    top: 4px;
    .el-input__icon {
      position: relative;
      top: -3px;
    }
    .el-range-separator {
      position: relative;
      top: -3px;
    }
  }
  .package-sale /deep/ .el-form-item__label {
    width: 80px;
  }
  #excelTable /deep/ .warning-row {
    font-weight: 500;
  }
  #excelTable /deep/ .title-row {
    background: #eee;
  }
  #excelTable /deep/ .crevice {
    background: #f8fafe;
  }
  .package-sale /deep/ .el-button {
    top: 4px;
  }
</style>