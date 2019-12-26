
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="height: 235px;display:flex;background-color:#fff;padding-top:10px;">
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title">概览</div>
                <div class="vice-content">
                  <div class="module">
                    <div>设备总量</div>
                    <div class="content">{{assetNum.allNum}}</div>
                    <div class="company"><span>台</span></div>
                  </div>
                </div>
              </div>
            </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>当前在线</div>
                  <div class="content">{{assetNum.dqzx}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>当前活跃</div>
                  <div class="content">{{assetNum.dqhy}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>当前开机</div>
                  <div class="content">{{assetNum.kdj}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>当前故障</div>
                  <div class="content">{{assetNum.gz}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>当前维修</div>
                  <div class="content">{{assetNum.wx}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>设备保养</div>
                  <div class="content">{{assetNum.maintainCount}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>设备质控</div>
                  <div class="content">{{assetNum.qaCount}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1;">
            <div class="echart-content">
              <div class="vice-title no-border"></div>
              <div class="vice-content">
                <div class="module">
                  <div>设备投诉</div>
                  <div class="content">{{assetNum.complaintCount}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="background-color:#fff;padding-top:10px;" :span="24">
        <span class="title title-sty">设备趋势</span>
        <div style="margin: 10px 0 0 30px; ">
          <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
            <template slot="time">
              <el-date-picker
                v-model="queryObj.time"
                type="daterange"
                value-format = "yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </template>
            <template slot="btn">
              <el-button type="primary" @click="query" style="padding: 8px 10px;">查询</el-button>
            </template>
          </ever-form2>
        </div>

        <div ref="historyEc" class="historyEc" style="height:350px;width:100%;"></div>
      </el-col>
    </el-row>
    <el-row style="background-color:#fff;padding-top:10px;">
      <el-col :span="12">
        <div class="echart-content">
          <div class="vice-title">设备状态</div>
          <div class="vice-content">
            <div ref="failureEc" class="failureEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="complaintEc" class="complaintEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col> -->
      <el-col :span="12">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="placeEc" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="fullLoad" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="abnormal" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="spend" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <!-- <el-row>
      <el-col style="background-color:#fff;padding-top:10px;" :span="24">
        <span class="title title-sty">位置分布</span>
        <div ref="roomEc" class="roomEc" style="height:800px;width:100%;"></div>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import api from '@/api/api'
import moment from 'moment'
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/tree')
require('echarts/lib/chart/bar')
let schema = [
  {
    name: 'type',
    label: '类型',
    comp: 'el-select',
    props: {
      options: [
        { id: '1', name: '设备总量' },
        { id: '2', name: '故障数量' },
        { id: '3', name: '开机数量' },
        { id: '4', name: '激活数量' }
      ],
      clearable: false
    }
  },
  {
    name: 'time',
    label: '时间',
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
    obj.type = '1'
    obj.time = [
      moment(new Date().getTime() - 86400000 * 30).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]
    return {
      querySchema: schema,
      queryObj: obj,
      assetNum: {
        dqzx: 0, // 当前在线
        dqhy: 0, // 当前活跃
        allNum: 0, // 总量
        kdj: 0, // 当前开待机
        complaintCount: 0, // 投诉设备
        gz: 0, // 故障设备
        wx: 0, // 维修设备
        maintainCount: 0, // 保养设备
        qaCount: 0 // 质控设备
      },
      assetInfo: {
        x: [],
        y: [],
        data: [],
        now: +new Date(),
        oneDay: 24 * 60 * 60 * 1000,
        value: Math.random() * 20,
        chart: null
      },
      assetfailureInfo: { // 报修设备
        chart: null,
        text: '设备报修',
        titleData: ['未知', '已上报', '待维修', '正在维修', '完成', '取消'],
        name: '维修状态',
        data: [
          { value: 0, name: '未知', label: 'unknown' },
          { value: 0, name: '已上报', label: 'reported' },
          { value: 0, name: '待维修', label: 'todo' },
          { value: 0, name: '正在维修', label: 'doing' },
          { value: 0, name: '完成', label: 'done' },
          { value: 0, name: '取消', label: 'abort' }
        ]
      },
      complaintInfo: {
        chart: null,
        text: '设备投诉',
        titleData: ['非常严重', '严重', '一般', '较轻', '很轻'],
        name: '设备投诉',
        data: [
          { value: 0, name: '非常严重' },
          { value: 0, name: '严重' },
          { value: 0, name: '一般' },
          { value: 0, name: '较轻' },
          { value: 0, name: '很轻' }
        ]
      },
      assetPlaceInfo: {
        chart: null
      },
      fullLoadInfo: {
        chart: null
      },
      abnormalInfo: {
        chart: null
      },
      spendInfo: {
        chart: null
      },
      deptLen: 0,
      deptCallbackLen: 0,
      turnOnArr: {},
      standbyTimeArr: {},
      failureType: ['reported', 'todo', 'doing', 'unknown'], // 维修中的状态值
      spendDeptArr: [],
      spendDeptArrData: [],
      assetTime: null
    }
  },
  created () {
    this.$nextTick(_ => {
      this.failureInit() // 设备报修
      // this.complaintInit() // 设备投诉
      this.initAssetNum() // 概览数据
      // this.spendDeptList() // 科室设备开机率
      this.initDept() // 科室设备数量 科室设备故障率
      this.query()
      this.assetTime = window.setInterval(_ => {
        this.initAssetNum()
      }, 30000)
    })
  },
  methods: {
    async initDept () {
      let deptList = await api.deptList({ pageNum: 1, pageSize: 200 })
      this.assetPlaceInit(deptList) // 科室设备数量
      // this.abnormalInit(deptList) // 科室设备故障率
    },
    query () {
      this.assetInfo.chart = echarts.init(this.$refs.historyEc)
      this.assetInfo.chart.showLoading()
      let data = this.getAll(this.queryObj.time[0].split(' ')[0], this.queryObj.time[1].split(' ')[0])
      if (this.queryObj.type === '1') {
        this.getAssetList(data) // 总量
      } else if (this.queryObj.type === '2') {
        this.getFaultRage(data) // 故障数
      } else { //  if (this.queryObj.type === '3')
        this.turnOnArr = data
        this.getTurnOnRate() // 开机数
      }
      // else {
      //   this.standbyTimeArr = data
      //   this.getTurnOnRate() // 激活数
      // }
    },
    getAll (begin, end) {			// 开始日期和结束日期
      let start = new Date(begin).getTime()
      let end1 = new Date(end).getTime()
      let arr = {}
      if (end1 > new Date().getTime()) {
        end1 = new Date().getTime()
      } else {
        end1 += 24 * 60 * 60 * 1000
      }
      while (start < end1) {
        arr[moment(start).format('YYYY-MM-DD')] = 0
        start += 24 * 60 * 60 * 1000
      }
      return arr
    },
    getTurnOnRate (data) {
      api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.deptLen = rs.data.totalCount
        rs.data.list.forEach(item => {
          this.getDeptAsset(item.id)
        })
      })
    },
    getFaultRage () {
      api.faultList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.initFaultData(rs.data.list)
      })
    },
    initFaultData (data) {
      let timeArr = this.getAll(this.queryObj.time[0].split(' ')[0], this.queryObj.time[1].split(' ')[0])
      data.forEach(item => {
        let ctime = item.ctime.split(' ')[0]
        let mtime = item.mtime.split(' ')[0]
        if (timeArr[ctime] === 0 || !!timeArr[ctime]) { // 创建时间在查询时间段内
          if (this.failureType.includes(item.fixStep)) { // 当前还是未完成状态
            let start = ctime
            let end = this.queryObj.time[1].split(' ')[0]
            this.setDataTime(start, end, timeArr)
          } else { // 当前是完成或取消状态
            let start = ctime
            let end = mtime
            this.setDataTime(start, end, timeArr)
          }
        } else { // 创建时间不在查询时间段内
          if (this.failureType.includes(item.fixStep)) { // 当前还是未完成状态
            let start = ctime
            let end = this.queryObj.time[1].split(' ')[0]
            this.setDataTime(start, end, timeArr)
          } else { // 当前是完成或取消状态
            if (timeArr[mtime] === 0 || !!timeArr[mtime]) { // 完成或者取消时间在查询时间段内
              let start = ctime
              let end = mtime
              this.setDataTime(start, end, timeArr)
            }
          }
        }
      })
      let data1 = []
      let data2 = []
      for (let key in timeArr) {
        data1.push(key)
        data2.push(timeArr[key])
      }
      this.initEchart(data1, data2)
    },
    setDataTime (start, end, data) { // ('2019-01-01', '2019-01-03', {2019-01-02':0, '2019-01-02':0, '2019-01-03':0})
      let arr = this.getAll(start, end)
      for (let key in arr) {
        if (data[key] === 0 || !!data[key]) {
          data[key] += 1
        }
      }
    },
    getDeptAsset (deptId) {
      let params = {
        pageNum: 0,
        pageSize: 1000,
        timeDivide: true, // 是否间隔
        interval: 1, // 间隔天数
        beginDate: moment(this.queryObj.time[0]).format('YYYY-MM-DD') + ' 00:00:00', // 开始时间
        endDate: moment(this.queryObj.time[1]).format('YYYY-MM-DD') + ' 23:59:59', // 结束时间
        deptId: deptId
      }
      api.powerTimeStatistics(params).then(rs => {
        this.initTurnOnRateData(rs.data)
      })
    },
    initTurnOnRateData (data) {
      this.deptCallbackLen++
      data.forEach(item => {
        let time = item.beginDate.split(' ')[0]
        item.powerTimes.forEach(lab => {
          if (this.queryObj.type === '3') {
            if (lab.powerOffTime > 0) {
              this.turnOnArr[time] += 1
            }
          } else {
            if (lab.standbyTime > 0) {
              this.standbyTimeArr[time] += 1
            }
          }
        })
      })
      if (this.deptCallbackLen === this.deptLen) {
        let data1 = []
        let data2 = []
        if (this.queryObj.type === '3') {
          for (let key in this.turnOnArr) {
            data1.push(key)
            data2.push(this.turnOnArr[key])
          }
        } else {
          for (let key in this.standbyTimeArr) {
            data1.push(key)
            data2.push(this.standbyTimeArr[key])
          }
        }
        this.initEchart(data1, data2)
      }
    },
    getAssetList (data) {
      api.assetList({ pageNum: 1, pageSize: 2000 }).then(rs => {
        if (rs.code === 200 && rs.data.list.length > 0) {
          let len = 0
          let startTime = new Date(this.queryObj.time[0].split(' ')[0]).getTime()
          rs.data.list.forEach(item => {
            let time = item.ctime.split(' ')[0]
            if (data[time] === 0 || !!data[time]) {
              data[time] += 1
            }
            if (new Date(time) < startTime) {
              len++
            }
          })
          this.initData(data, len)
        }
      })
    },
    initData (data, len) {
      let data1 = []
      let data2 = []
      let index = -1
      for (let key in data) {
        data1.push(key)
        if (index === -1) {
          data2.push(data[key] + len)
        } else {
          data2.push(data[key] + data2[index])
        }
        index++
      }
      this.initEchart(data1, data2)
    },
    // randomNum (minNum, maxNum) {
    //   switch (arguments.length) {
    //     case 1:
    //       return parseInt(Math.random() * minNum + 1, 10)
    //       break;
    //     case 2:
    //       return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    //       break;
    //     default:
    //       return 0
    //       break
    //   }
    // },
    initAssetNum () {
      // 获取设备总量
      api.assetList({ pageNum: 1, pageSize: 20 }).then(rs => {
        if (rs.code === 200) {
          this.assetNum.allNum = rs.data.totalCount
        } else {
          this.assetNum.allNum = '--'
        }
      })
      api.faultList({ pageNum: 1, pageSize: 2000 }).then(rs => {
        if (rs.code === 200 && rs.data && rs.data.list) {
          let len = 0
          rs.data.list.forEach(item => {
            if (item.fixStep !== 'abort' && item.fixStep !== 'done') {
              len++
            }
          })
          this.assetNum.wx = len
        } else {
          this.assetNum.wx = '--'
        }
      })
      api.tempList({}).then(rs => {
        if (rs.code === 200) {
          let time = new Date().getTime()
          let dqhy = 0
          let kdj = 0
          let gz = 0
          let qt = 0
          rs.data.forEach(item => {
            let curTime = new Date(item.ctime).getTime()
            if (curTime + 2 * 60 * 1000 < time) {
              item.networkStatus = '离线'
            } else {
              item.networkStatus = '在线'
            }

            // 当前在线： 就是在线设备。 当前活跃： 处于激活状态的设备。 当前开待机： 处于开机和待机的设备。当前故障：处于故障状态的设备
            if (item.networkStatus === '在线') {
              let assetStatus = String(item.assetStatus)
              if (assetStatus === '40') {
                dqhy++
              } else if (assetStatus === '20' || assetStatus === '30') {
                kdj++
              } else if (assetStatus === '50') {
                gz++
              } else {
                qt++
              }
            }
          })
          this.assetNum.dqzx = dqhy + kdj + gz + qt
          this.assetNum.dqhy = dqhy
          this.assetNum.gz = gz
          this.assetNum.kdj = kdj
        }
      })
      api.notDone().then(rs => {
        if (rs.code === 200) {
          Object.assign(this.assetNum, rs.data)
        }
      })
    },
    randomData () {
      this.assetInfo.now = new Date(+this.assetInfo.now - this.assetInfo.oneDay)
      this.assetInfo.value = this.assetInfo.value + Math.random() * 2
      let minutes = (this.assetInfo.now.getMinutes() < 10 ? '0' : '') + this.assetInfo.now.getMinutes()
      let seconds = (this.assetInfo.now.getSeconds() < 10 ? '0' : '') + this.assetInfo.now.getSeconds()
      this.assetInfo.x.unshift(this.assetInfo.now.getFullYear() + '-' + (this.assetInfo.now.getMonth() + 1) + '-' + this.assetInfo.now.getDate()),
      this.assetInfo.y.push(Math.round(this.assetInfo.value))
    },
    initEchart (data1, data2) {
      this.assetInfo.chart.hideLoading()
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '30',
          top: '15',
          right: '30',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: {
          data: data1,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          data: data2,
          barMaxWidth: 30,
          large: true
        }]
      }
      this.assetInfo.chart.setOption(option, true)
    },
    initOptions (obj) {
      var option = {
        title: {
          text: obj.text,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} :  ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: obj.titleData
        },
        series: [
          {
            name: obj.name,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: obj.data,
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
      return option
    },
    // 初始化设备报修图表
    failureInit () {
      let params = {
        pageNum: 1,
        pageSize: 2000
      }
      api.faultList(params).then(rs => {
        if (rs.data.list && rs.data.list.length > 0) {
          rs.data.list.forEach(item => {
            let val = this.assetfailureInfo.data.find(e => e.label === item.fixStep)
            if (val) {
              val.value++
            }
          })
        }
        this.assetfailureInfo.chart = echarts.init(this.$refs.failureEc)
        let option = this.initOptions(this.assetfailureInfo)
        this.assetfailureInfo.chart.setOption(option, true)
      })
    },
    async assetPlaceInit (deptList) {
      let list = deptList.data.list || []
      api.findGroupByDept().then(rs => {
        let data = []
        let data1 = []
        list.forEach(item => {
          let deptInfo = rs.data.find(lab => lab.deptId === item.id) || ''
          if (deptInfo) {
            item.count = deptInfo.count
          } else {
            item.count = 0
          }
        })
        let arr = JSON.parse(JSON.stringify(list))
        arr.sort(function (a, b) {
          return a.count - b.count
        })
        arr.forEach(item => {
          data.push(item.name)
          data1.push(item.count)
        })
        if (arr.length < 10) {
          for (let i = 0; i < 10 - arr.length; i++) {
            data.unshift('--')
            data1.unshift(0)
          }
        }
        this.assetPlaceEchart(data, data1)
      })
    },
    assetPlaceEchart (data, data1) {
      this.assetPlaceInfo.chart = echarts.init(this.$refs.placeEc)
      let option = {
        color: ['#3398DB'],
        title: {
          text: '科室设备数量',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 设备数: {c}'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01],
          // min: 0,
          // max: 200,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
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
      this.assetPlaceInfo.chart.setOption(option, true)
    },
    // 初始化设备投诉
    complaintInit () {
      let params = {
        pageNum: 1,
        pageSize: 2000
      }
      api.complaintList(params).then(rs => {
        if (rs.data.list && rs.data.list.length > 0) {
          rs.data.list.forEach(item => {
            let val = this.complaintInfo.data.find(e => e.label === item.levelName)
            if (val) {
              val.value++
            }
          })
        }
      })
      this.complaintInfo.chart = echarts.init(this.$refs.complaintEc)
      var option = this.initOptions(this.complaintInfo)
      this.complaintInfo.chart.setOption(option, true)
    },
    fullLoadInit (data1, data2) {
      this.fullLoadInfo.chart.hideLoading()
      let option = {
        color: ['#3398DB'],
        title: {
          text: '设备开机时间',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 开机时间: {c} H'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01],
          // min: 0,
          // max: 200,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              // color: '#fff',
              fontWeight: '80'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: data1,
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
          data: data2
        }]
      }
      this.fullLoadInfo.chart.setOption(option, true)
    },
    async abnormalInit (deptList) {
      let data = []
      let data1 = []
      // api.countDeptFault().then(rs => {
      //   let data = []
      //   let data1 = []
      //   if (rs.data && rs.data.length > 0) {
      //     let list = deptList.data.list || []
      //     list.forEach(item => {
      //       let deptInfo = rs.data.find(lab => lab.deptId === item.id) || ''
      //       if (deptInfo) {
      //         item.value = (deptInfo.faultCount * 100 / deptInfo.deptAssetCount).toFixed(2)
      //       } else {
      //         item.value = 0
      //       }
      //     })
      //     let arr = JSON.parse(JSON.stringify(list))
      //     arr.sort((a, b) => {
      //       return a.value - b.value
      //     })
      //     arr.forEach(item => {
      //       data.push(item.name)
      //       data1.push(item.value)
      //     })
      //     if (arr.length < 10) {
      //       for (let i = 0; i < 10 - arr.length; i++) {
      //         data.unshift('--')
      //         data1.unshift(0)
      //       }
      //     }
      //   }
      //   this.abnormalEchart(data, data1)
      // })
      let list = deptList.data.list || []
      list.forEach(item => {
        item.value = (Math.random()).toFixed(2)
      })
      let arr = JSON.parse(JSON.stringify(list))
      arr.sort((a, b) => {
        return a.value - b.value
      })
      arr.forEach(item => {
        data.push(item.name)
        data1.push(item.value)
      })
      if (arr.length < 10) {
        for (let i = 0; i < 10 - arr.length; i++) {
          data.unshift('--')
          data1.unshift(0)
        }
      }
      this.abnormalEchart(data, data1)
    },
    abnormalEchart (data, data1) {
      this.abnormalInfo.chart = echarts.init(this.$refs.abnormal)
      let option = {
        color: ['#3398DB'],
        title: {
          text: '科室设备故障率',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 故障率: {c} %'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
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
      this.abnormalInfo.chart.setOption(option, true)
    },
    spendDeptList () {
      this.spendInfo.chart = echarts.init(this.$refs.spend)
      // this.fullLoadInfo.chart = echarts.init(this.$refs.fullLoad)
      this.spendInfo.chart.showLoading()
      this.fullLoadInfo.chart.showLoading()
      api.deptList({ pageNum: 1, pageSize: 500 }).then(rs => {
        this.spendDeptArr = rs.data.list
        rs.data.list.forEach(item => {
          this.assetData(item.id)
        })
      })
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
          this.initNoAssetTime(deptId)
        }
      })
    },
    initNoAssetTime (deptId) {
      let deptInfo = {
        deptName: this.spendDeptArr.find(item => item.id === deptId)['name'],
        time: 0,
        allTurnOnRate: 0
      }
      this.spendDeptArrData.push(deptInfo)
      if (this.spendDeptArrData.length === this.spendDeptArr.length) {
        this.spendInitData()
      }
    },
    initAssetTime (deptId, data) {
      let obj = {}
      let len = 0
      let allTime = 0
      let allTurnOnRate = 0
      data.forEach(item => {
        len++
        item.powerTimes.forEach(lab => {
          allTime += (Number(lab.powerOffTime) + Number(lab.standbyTime))
          if (obj[lab.assetId]) {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId]['turnOnRate'] += 1
              obj[lab.assetId]['time'] += (Number(lab.powerOffTime) + Number(lab.standbyTime))
            }
          } else {
            if (lab.powerOffTime > 0 || lab.standbyTime > 0) {
              obj[lab.assetId] = { turnOnRate: 1, time: (Number(lab.powerOffTime) + Number(lab.standbyTime)) }
            } else {
              obj[lab.assetId] = { turnOnRate: 0, time: 0 }
              // turnOnRate 当天激活就+1，最后激活率就是激活次数/总天数 ，time激活时间
            }
          }
        })
      })
      for (let key in obj) {
        obj[key]['turnOnRate'] = (obj[key]['turnOnRate'] / len === 0) ? 0 : (obj[key]['turnOnRate'] / len).toFixed(2)
        allTurnOnRate += Number(obj[key]['turnOnRate'])
      }
      let deptInfo = {
        deptName: this.spendDeptArr.find(item => item.id === deptId)['name'],
        time: allTime,
        allTurnOnRate: allTurnOnRate / (data[0]['powerTimes'].length) === 0 ? 0 : (allTurnOnRate * 100 / (data[0]['powerTimes'].length)).toFixed(2)
      }
      this.spendDeptArrData.push(deptInfo)
      if (this.spendDeptArrData.length === this.spendDeptArr.length) {
        this.spendInitData()
      }
    },
    spendInitData () {
      let data1 = []
      let data2 = []
      let data3 = []
      this.spendDeptArrData.forEach(item => {
        data1.push(item.deptName)
        data2.push(item.allTurnOnRate)
        data3.push((item.time / (60 * 60 * 1000)).toFixed(2))
      })
      if (this.spendDeptArrData.length < 10) {
        for (let i = 0; i < 10 - this.spendDeptArrData.length; i++) {
          data1.unshift('--')
          data2.unshift(0)
          data3.unshift(0)
        }
      }
      this.spendInit(data1, data2)
      // this.fullLoadInit(data1, data3)
    },
    spendInit (data1, data2) {
      this.spendInfo.chart.hideLoading()
      let option = {
        color: ['#3398DB'],
        title: {
          text: '科室设备开机率',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 开机率: {c}%'
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              // color: '#fff',
              fontWeight: '80'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: data1,
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
          data: data2
        }]
      }
      this.spendInfo.chart.setOption(option, true)
    }
  },
  beforeDestroy () {
    window.clearInterval(this.assetTime)
    this.assetTime = null
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
  .el-row {
    margin: 15px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  }
  .module-head {
    background-color: #fff;
    height:50px;
    line-height:50px;
  }
  .title {
    border-left:3px solid blue;
    padding-left:10px;
    font-size:18px;
  }
  .title-sty {
    margin: 10px 0;
  }
  .module {
    background-color: #fff;
    border-right: 1px solid #eee;
    height:150px;
    padding:20px;
    .content {
      padding-top: 10px;
      font-size: 60px;
      text-align: center;
    }
    .company {
      padding-right: 10%;
      text-align: right;
    }
  }
  .echart-content {
    .vice-title {
      height:25px;
      line-height: 25px;
      border-left: 3px solid blue;
      padding-left: 10px;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .no-border {
      border: none;
    }
    .vice-content {
      border-right: 1px solid #eee;
      &:last-child{
        border:none !important;
      }
    }
  }
  .echart-content .vice-content:last-child{
    border:none !important;
  }
  .package-sale /deep/ .el-date-editor {
    height: 32px;
    line-height: 32px;
    .el-range-separator {
      line-height: 26px;
    }
    .el-input__icon {
      line-height: 25px;
    }
  }
</style>
