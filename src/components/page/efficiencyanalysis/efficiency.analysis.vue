<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" label-position="right" :nosubmit="true" :inline="true">
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
        <template slot="dept">
          <el-select v-model="queryObj.dept" filterable placeholder="请选择科室">
            <el-option
              v-for="item in deptArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button icon="el-icon-search" type="primary" @click="query"></el-button>
          <el-button @click="exportData">导出数据</el-button>
        </template>
      </ever-form2>
    </div>
    <div style="padding-top:10px;">
      <el-row>
        <el-col :span="12" style="padding-left:0;">
          <div class="demo-css">
            <div><h3>设备总保有量</h3></div>
            <div style="color:#409EFF;font-size:50px;text-align:center;height:190px;line-height:150px;">{{totalCount}} 台</div>
            <div style="border-top:2px solid #eee;">
              <el-row>
                <el-col :span="4" style="text-align:left">
                  开机率 <span style="color:#409EFF;">{{assetInfo.turnOnRate}}</span>
                </el-col>
                <el-col :span="4" style="text-align:right">
                  故障率 <span style="color:#409EFF;">{{assetInfo.failureRate}}</span>
                </el-col>
                <el-col :span="8" style="text-align:right">
                  总激活时间 <span style="color:#409EFF;">{{assetInfo.totalActivationTime | initTime}}</span>
                </el-col>
                <el-col :span="8" style="text-align:right">
                  平均激活时间 <span style="color:#409EFF;">{{assetInfo.averageActivationTime | initTime}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right:0;">
          <div class="demo-css">
            <div ref="asset" class="asset" style="height:250px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" style="padding-left:0;">
          <div class="demo-css" style="height:600px;">
            <div>
              <el-row>
                <el-col :span="4">
                  <h3>设备配置</h3>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="470">
                <el-table-column type="index" width="50" fixed="left" align="center" label="序号">
                </el-table-column>
                <el-table-column prop="assetName" width="160" align="center" label="设备名称">
                  <template slot-scope="scope">
                    <a href="#mao" @click="seeAsssetDetail(scope.row)">{{scope.row.assetName}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="sn" align="center" label="SN序列号" width="150">
                </el-table-column>
                <el-table-column prop="no" align="center" label="设备编号" width="200">
                </el-table-column>
                <el-table-column prop="deptName" align="center" label="科室">
                </el-table-column>
                <el-table-column prop="utilize" align="center" label="利用率" width="100">
                  <template slot-scope="scope">
                    {{scope.row.utilize + ' %'}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOffTime" align="center" label="开机次数">
                  <template slot-scope="scope">
                    {{scope.row.count}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOffTime" align="center" label="开机时间">
                  <template slot-scope="scope">
                    {{scope.row.powerOffTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="standbyTime" align="center" label="待机时间">
                  <template slot-scope="scope">
                    {{scope.row.standbyTime | initTime}}
                  </template>
                </el-table-column>
                <el-table-column prop="powerOnTime" align="center" label="关机时间">
                  <template slot-scope="scope">
                    {{scope.row.powerOnTime | initTime}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-right:0;">
          <div class="demo-css" style="height:600px;">
            <div><h3>设备满负荷率</h3></div>
            <div ref="assetRanking" class="asset" style="height:500px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding:5px 0;">
          <div class="demo-css" id="mao">
            <el-row>
              <el-col :span="4">
                <h3>设备明细</h3>
              </el-col>
              <el-col :span="20" style="text-align:right;padding-right:10px;">
                <div style="display:inline-block;width:300px;">
                  <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
                <div style="display:inline-block;">
                  <el-button icon="el-icon-search" @click="checkAsset"></el-button>
                </div>
              </el-col>
            </el-row>
            <div ref="assetDetails" class="asset" style="height:400px;width:100%;"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import echarts from 'echarts/lib/echarts'
import moment from 'moment'
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
let schema = [
  {
    label: '科室',
    name: 'dept',
    comp: 'custom'
  },
  {
    label: '时间',
    name: 'time',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn',
    comp: 'custom'
  },
  {
    label: '',
    name: 'btn1',
    comp: 'custom'
  }
]
export default {
  data () {
    let obj = this.createObjFromSchema(schema)
    obj.time = [
      moment(new Date().getTime() - 86400000 * 7).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      listApiName: 'deptList',
      tableData: [],
      loading: false,
      assetChart: null,
      assetUnusualChart: null,
      assetRankingChart: null,
      assetDetailsChart: null,
      assetTimeChart: null,
      totalCount: 0,
      deptArr: [],
      assetName: '',
      dateValue: [
        moment(new Date().getTime() - 86400000 * 7).format('YYYY-MM-DD HH:mm:ss'),
        moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      ],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      checkAssetId: '',
      assetInfo: {
        turnOnRate: 0, // 开机率
        failureRate: 0, // 故障率
        totalActivationTime: 0, // 总激活时间
        averageActivationTime: 0 // 平均激活时间
      },
      dataAsset: {},
      timeData: {},
      assetDeptInfo: {},
      isLen: false
    }
  },
  created () {
    this.getDept()
    this.$nextTick(_ => {
      this.initAssetDetails()
    })
  },
  filters: {
    initTime (value) {
      if (!value) {
        return 0
      }
      if (value > 86400000) {
        return (value / (86400000)).toFixed(2) + 'T'
      } else {
        return (value / (60 * 60 * 1000)).toFixed(2) + 'H'
      }
    }
  },
  methods: {
    async initAssetDeptInfo (callback, params) { // 先获取科室列表，再根据科室列表的第一个科室获取对应的具体信息
      let assets = await api.assetList({ pageNum: 1, pageSize: 2000 })
      assets.data.list.forEach(item => {
        this.assetDeptInfo[item.id] = {
          sn: item.sn,
          deptName: item.deptName,
          no: item.no
        }
      })
      this.isLen = true
      if (callback) {
        callback(params)
      }
    },
    query () {
      let params = {
        deptId: this.queryObj.dept,
        beginDate: moment(this.queryObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(this.queryObj.time[1]).format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.isLen) { // 如果在已进入页面就点击查询按钮，假如当时科室列表还没获取到，则走 获取科室列表逻辑
        this.getDeptAssetList(params)
      } else {
        this.initAssetDeptInfo(this.getDeptAssetList, params)
      }
    },
    exportData () {
      this.$router.push('/page/exportdata')
    },
    getDept () {
      api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.deptArr = rs.data.list || []
        this.queryObj.dept = rs.data.list[0]['id']
        this.initAssetDeptInfo(this.query)
      })
    },
    async getDeptAssetList (data) {
      let params = {
        pageNum: 0,
        pageSize: 100,
        timeDivide: true, // 是否间隔
        interval: 1, // 间隔天数
        beginDate: data.beginDate, // 开始时间
        endDate: data.endDate, // 结束时间
        deptId: data.deptId
      }
      let frequencyParams = {
        beginDate: data.beginDate, // 开始时间
        endDate: data.endDate, // 结束时间
        deptId: data.deptId
      }
      // this.assetData(data.deptId)
      let quencyTable = await api.findByParam(frequencyParams)
      let assetTable = await api.powerTimeStatistics(params)
      this.initQuencyTable(quencyTable.data)
      this.initTableData(assetTable.data)
      this.totalCount = this.tableData.length
      this.initAssetEcharts(assetTable.data)
      if (assetTable.data[0]['powerTimes'].length > 0) { // 科室有设备
        this.initAssetTime(data.deptId, assetTable.data)
      } else { // 科室无设备
        this.assetInfo.turnOnRate = 0
      }
    },
    initQuencyTable (data) {
      let timeData = {} // 根据时间来整合每天的开机次数
      let assetData = {} // 根据设备来整合当前设备的开机次数
      data.forEach(item => {
        let date = item.date
        let assetId = item.assetId
        if (timeData[date] || timeData[date] === 0) {
          timeData[date] += Number(item.count)
        } else {
          timeData[date] = Number(item.count) || 0
        }
        if (assetData[assetId] || assetData[assetId] === 0) {
          assetData[assetId] += Number(item.count)
        } else {
          assetData[assetId] = Number(item.count) || 0
        }
      })
      this.dataAsset = assetData
      this.timeData = timeData
    },
    initTableData (data) {
      let tableData = JSON.parse(JSON.stringify(data[0]['powerTimes']))
      let powerOffTime = 0
      data.forEach(item => {
        if (item.powerTimes && item.powerTimes.length > 0) {
          item.powerTimes.forEach(lab => {
            let info = tableData.find(e => e.assetId === lab.assetId)
            if (info) {
              info.powerOffTime += lab.powerOffTime
              info.powerOnTime += lab.powerOnTime
              info.standbyTime += lab.standbyTime
            } else {
              tableData.push(JSON.parse(JSON.stringify(lab)))
            }
          })
        }
      })
      tableData.forEach(item => {
        if (item.standbyTime === 0 && item.powerOffTime === 0) {
          item.utilize = 0
        } else {
          item.utilize = (item.powerOffTime * 100 / (item.powerOnTime + item.standbyTime + item.powerOffTime)).toFixed(2)
        }
        powerOffTime += item.powerOffTime
        item.count = this.dataAsset[item.assetId]
        item.sn = this.assetDeptInfo[item.assetId]['sn']
        item.no = this.assetDeptInfo[item.assetId]['no']
        item.deptName = this.assetDeptInfo[item.assetId]['deptName']
      })
      if (tableData.length > 0) {
        this.assetInfo.totalActivationTime = powerOffTime
        this.assetInfo.averageActivationTime = (powerOffTime / tableData.length) === 0 ? 0 : (powerOffTime / tableData.length).toFixed(2)
      } else {
        this.assetInfo.totalActivationTime = 0
        this.assetInfo.averageActivationTime = 0
      }
      this.tableData = tableData
      this.initAssetRanking()
    },
    initAssetEcharts (json) {
      this.assetChart = echarts.init(this.$refs.asset)
      let data = []
      let obj = {}
      this.tableData.map(item => {
        if (obj[item.assetName]) {
          obj[item.assetName] = obj[item.assetName] + 1
        } else {
          obj[item.assetName] = 1
        }
      })
      for (let key in obj) {
        data.push({ name: key, value: obj[key] })
      }
      let option = {
        title: {
          text: '设备概览',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.assetChart.setOption(option, true)
    },
    initAssetRanking () {
      let arr = JSON.parse(JSON.stringify(this.tableData))
      arr.sort((a, b) => {
        return a.utilize - b.utilize
      })
      let data = []
      let data1 = []
      arr.forEach(item => {
        data.push(item.assetName + ' ' + item.sn)
        data1.push(item.utilize)
      })
      if (arr.length < 10) {
        for (let i = 0; i < 10 - arr.length; i++) {
          data.unshift('--')
          data1.unshift(0)
        }
      }
      this.assetRankingEchart(data, data1)
    },
    assetRankingEchart (data, data1) {
      this.assetRankingChart = echarts.init(this.$refs.assetRanking)
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 负荷率: {c}%'
        },
        grid: {
          left: '0%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              // color: '#fff',
              fontWeight: '80'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: data,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            margin: 10,
            inside: false,
            textStyle: {
              fontWeight: '50'
            },
            formatter: function (name) {
              return (name.length > 4 ? (name.slice(0, 4) + '...') : name)
            }
          }
        },
        series: [{
          type: 'bar',
          label: {
            normal: {
              show: true,
              // formatter: '{c}',
              formatter: function (v) {
                var val = v.data
                if (val === 0) {
                  return ''
                }
                return val
              },
              color: '#fff'
            }
          },
          data: data1
        }]
      }
      this.assetRankingChart.setOption(option, true)
    },
    initAssetDetails (times, data1, data2, data3) {
      // data1 开机时间  data2待机时间  data3关机时间
      this.assetDetailsChart = echarts.init(this.$refs.assetDetails)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: '0%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          data: ['开机时间', '待机时间', '关机时间']
        },
        xAxis: [
          {
            type: 'category',
            data: times
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '时间(小时)',
            min: 0,
            interval: 50,
            axisLabel: {
              formatter: '{value} h'
            }
          }
        ],
        series: [
          {
            name: '开机时间',
            type: 'bar',
            barMaxWidth: 30,
            data: data1
          },
          {
            name: '待机时间',
            type: 'bar',
            barMaxWidth: 30,
            data: data2
          },
          {
            name: '关机时间',
            type: 'bar',
            barMaxWidth: 30,
            data: data3
          }
        ]
      }
      this.assetDetailsChart.setOption(option, true)
    },
    seeAsssetDetail (row) {
      console.log(row)
      this.dateValue = [
        moment(new Date().getTime() - 86400000 * 7).format('YYYY-MM-DD HH:mm:ss'),
        moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      ]
      this.checkAssetId = row.assetId

      this.getAssetTime(row.assetId)
    },
    getAssetTime (id) {
      let params = {
        pageNum: 0,
        pageSize: 1000,
        timeDivide: true, // 是否间隔
        interval: 1, // 间隔天数
        beginDate: moment(this.dateValue[0]).format('YYYY-MM-DD') + ' 00:00:00', // 开始时间
        endDate: moment(this.dateValue[1]).format('YYYY-MM-DD') + ' 23:59:59', // 结束时间
        assetId: id
      }
      api.powerTimeStatistics(params).then(rs => {
        this.initAssetTime1(rs.data)
      })
    },
    initAssetTime1 (data) {
      let times = []
      let data1 = [] // 开机时间
      let data2 = [] // 待机时间
      let data3 = [] // 关机时间
      data.forEach(item => {
        let info = item.powerTimes[0]
        if (info) {
          times.push((item.beginDate || '').split(' ')[0])
          data1.push((info.powerOffTime / (60 * 60 * 1000)).toFixed(2) || 0)
          data3.push((info.powerOnTime / (60 * 60 * 1000)).toFixed(2) || 0)
          data2.push((info.standbyTime / (60 * 60 * 1000)).toFixed(2) || 0)
        } else {
          times.push((item.beginDate || '').split(' ')[0])
          data1.push(0)
          data3.push(0)
          data2.push(0)
        }
      })
      this.initAssetDetails(times, data1, data2, data3)
    },
    checkAsset () {
      if (!this.checkAssetId) return
      this.getAssetTime(this.checkAssetId)
    },
    assetData (deptId) {
      let params = {
        pageNum: 0,
        pageSize: 1000,
        timeDivide: true, // 是否间隔
        interval: 1, // 间隔天数
        beginDate: moment('2019-06-01').format('YYYY-MM-DD') + ' 00:00:00', // 开始时间
        endDate: moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59', // 结束时间
        deptId: deptId
      }
      api.powerTimeStatistics(params).then(rs => {
        if (rs.data[0]['powerTimes'].length > 0) { // 科室有设备
          this.initAssetTime(deptId, rs.data)
        } else { // 科室无设备
          this.assetInfo.turnOnRate = 0
        }
      })
    },
    initAssetTime (deptId, data) {
      console.log(data, 1111)
      let obj = {}
      // let len = 0
      // let allTime = 0
      let allTurnOnRate = 0
      data.forEach(item => {
        // len++
        item.powerTimes.forEach(lab => {
          // allTime += (Number(lab.powerOffTime) + Number(lab.standbyTime))
          if (obj[lab.assetId]) {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId]['turnOnRate'] += 1
            }
          } else {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId] = { turnOnRate: 1 }
            } else {
              obj[lab.assetId] = { turnOnRate: 0 }
              // turnOnRate 当天激活就+1，最后激活率就是激活次数/总天数 ，time激活时间
            }
          }
        })
      })
      for (let key in obj) {
        allTurnOnRate += obj[key]['turnOnRate']
      }
      this.assetInfo.turnOnRate = allTurnOnRate / (data[0]['powerTimes'].length) === 0 ? 0 : (allTurnOnRate / (data[0]['powerTimes'].length)).toFixed(2)
    }
  },
  watch: {}
}
</script>
<style lang='less' scoped>
  .el-col {
    padding: 5px;
  }
  .demo-css {
    background-color: #FFF;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }
  .el-form {
    height: 45px;
  }
  .el-date-editor{
    height: 30px;
    line-height: 30px;
    & /deep/ .el-input__icon {
      line-height: 20px;
    }
    & /deep/ .el-range-separator {
      line-height: 22px !important;
    }
  }
  .el-button {
    margin-left: 10px;
    padding: 7px 8px;
  }
  .el-input /deep/ input {
    height: 30px !important;
  }
</style>
