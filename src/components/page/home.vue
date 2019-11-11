
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="home-module-only">
          <div v-for="(item,index) in overviewInfo" :key="index" style="flex:1;">
            <div class="echart-content">
              <div :class="{'no-border': index!==0, 'vice-title':true}">
                <div v-if="index ===0 ">概览</div>
              </div>
              <div class="vice-content">
                <div class="module">
                  <div>{{item.title}}</div>
                  <div class="content">{{item.value}}</div>
                  <div class="company"><span>台</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="home-module">
      <el-col :span="24">
        <span class="title title-sty">待办事项</span>
        <div class="rotation-chart-container">
          <div>
            <div style="padding:5px;">设备报修 <span style="color:#409eff;margin-left:5px;">({{toDoList.assetFailure.length/2}}台)</span></div>
            <div class="rotation-chart asset-failure">
              <ul>
                <li v-for="(item, index) in toDoList.assetFailure" :key="index">
                  <span class="name-ellipsis">{{item.name}}</span>
                  <span style="position:absolute;">{{'(' + item.sn + ')'}}</span>
                  <span class="btn">查看</span>
                  <span class="status">未完成</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div style="padding:5px;">设备保养 <span style="color:#409eff;margin-left:5px;">({{toDoList.assetMain.length/2}}台)</span></div>
            <div class="rotation-chart asset-main">
              <ul>
                <li v-for="(item, index) in toDoList.assetMain" :key="index">
                  <span class="name-ellipsis">{{item.name}}</span>
                  <span style="position:absolute;">{{'(' + item.sn + ')'}}</span>
                  <span class="btn">查看</span>
                  <span class="status">未完成</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div style="padding:5px;">设备质控 <span style="color:#409eff;margin-left:5px;">({{toDoList.assetQa.length/2}}台)</span></div>
            <div class="rotation-chart asset-qa">
              <ul>
                <li v-for="(item, index) in toDoList.assetQa" :key="index">
                  <span class="name-ellipsis">{{item.name}}</span>
                  <span style="position:absolute;">{{'(' + item.sn + ')'}}</span>
                  <span class="btn">查看</span>
                  <span class="status">未完成</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div style="padding:5px;">设备投诉 <span style="color:#409eff;margin-left:5px;">({{toDoList.assetComplaint.length/2}}台)</span></div>
            <div class="rotation-chart asset-complaint">
              <ul>
                <li v-for="(item, index) in toDoList.assetComplaint" :key="index">
                  <span class="name-ellipsis">{{item.name}}</span>
                  <span style="position:absolute;">{{'(' + item.sn + ')'}}</span>
                  <span class="btn">查看</span>
                  <span class="status">未完成</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="home-module">
      <el-col :span="24">
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
    <el-row class="home-module">
      <el-col :span="8">
        <div class="echart-content">
          <div class="vice-title">设备状态</div>
          <div class="vice-content">
            <div ref="failureEc" class="failureEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="complaintEc" class="complaintEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="placeEc" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
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
      </el-col>
    </el-row>
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
      overviewInfo: [
        { title: '当前在修台数', value: 0 },
        { title: '当前待修台数', value: 0 },
        { title: '当前已修台数', value: 0 },
        { title: '当前故障台数', value: 0 },
        { title: '当前在线台数', value: 0 },
        { title: '当前开机台数', value: 0 },
        { title: '当前激活台数', value: 0 },
        { title: '当前设备总数', value: 0 },
        { title: '当前保养台数', value: 0 },
        { title: '当前质控台数', value: 0 },
        { title: '当前投诉台数', value: 0 }
      ],
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
      spendInfo: {
        chart: null
      },
      chartObj: {
        assetChart: null,
        assetPlaceChart: null,
        fullLoadChart: null,
        abnormalChart: null,
        spendChart: null
      },
      assetTime: null,
      toDoList: {
        assetFailure: [], // 设备维修
        assetMain: [], // 设备保养
        assetQa: [], // 设备质控
        assetComplaint: [] // 设备投诉
      }
    }
  },
  created () {
    this.$nextTick(_ => {
      this.failureInit() // 设备报修
      this.complaintInit() // 设备投诉
      this.initOverviewInfo() // 概览数据
      this.spendInit() // 设备开机率
      this.fullLoadInit() // 设备平均开机时间
      this.assetPlaceInit() // 科室设备数量
      this.abnormalInit() // 科室设备故障率
      this.query() // 设备趋势查询按钮
      // this.assetTime = window.setInterval(_ => {
      //   this.initOverviewInfo()
      // }, 30000)
    })
    this.initToDoList() // 待办事项
  },
  methods: {
    initOverviewInfo () {
    },
    initToDoList () {
      let assetFailure = [
        {
          name: 'STORZ内窥镜STORZ内窥镜STORZ内窥镜',
          sn: '7612340',
          type: '1',
          id: '1'
        },
        {
          name: '基站自身',
          sn: 'FHHY001',
          type: '1',
          id: '2'
        },
        {
          name: '奥林巴斯超声刀',
          sn: 'B001345',
          type: '1',
          id: '3'
        },
        {
          name: 'STORZ内窥镜',
          sn: 'XS774089-P',
          type: '1',
          id: '4'
        },
        {
          name: 'STORZ冷光源',
          sn: 'PS0713453',
          type: '1',
          id: '5'
        }
      ]
      let assetMain = [
        {
          name: 'STORZ内窥镜',
          sn: '7612340',
          type: '1',
          id: '1'
        },
        {
          name: '基站自身',
          sn: 'FHHY001',
          type: '1',
          id: '2'
        },
        {
          name: '奥林巴斯超声刀',
          sn: 'B001345',
          type: '1',
          id: '3'
        },
        {
          name: 'STORZ内窥镜',
          sn: 'XS774089-P',
          type: '1',
          id: '4'
        }
      ]
      let assetQa = [
        {
          name: 'STORZ内窥镜',
          sn: '7612340',
          type: '1',
          id: '1'
        },
        {
          name: '基站自身',
          sn: 'FHHY001',
          type: '1',
          id: '2'
        },
        {
          name: '奥林巴斯超声刀',
          sn: 'B001345',
          type: '1',
          id: '3'
        }
      ]
      let assetComplaint = [
        {
          name: 'STORZ内窥镜',
          sn: '7612340',
          type: '1',
          id: '1'
        },
        {
          name: '基站自身',
          sn: 'FHHY001',
          type: '1',
          id: '2'
        },
        {
          name: '奥林巴斯超声刀',
          sn: 'B001345',
          type: '1',
          id: '3'
        },
        {
          name: 'STORZ内窥镜',
          sn: 'XS774089-P',
          type: '1',
          id: '4'
        },
        {
          name: 'STORZ冷光源',
          sn: 'PS0713453',
          type: '1',
          id: '5'
        }
      ]
      this.toDoList.assetFailure = [...assetFailure, ...assetFailure]
      this.toDoList.assetMain = [...assetMain, ...assetMain]
      this.toDoList.assetQa = [...assetQa, ...assetQa]
      this.toDoList.assetComplaint = [...assetComplaint, ...assetComplaint]
      let failure = this.initFramesStype(assetFailure.length, 'frames-failure', 'asset-failure')
      let main = this.initFramesStype(assetMain.length, 'frames-main', 'asset-main')
      let qa = this.initFramesStype(assetQa.length, 'frames-qa', 'asset-qa')
      let complaint = this.initFramesStype(assetComplaint.length, 'frames-complaint', 'asset-complaint')
      let style = document.createElement('style')
      style.type = 'text/css'
      style.id = 'key-frames'
      style.innerText = failure + '' + main + '' + qa + '' + complaint
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    initFramesStype (len, framesName, containerClass) {
      if (len === 0) return ''
      let text = `@keyframes ${framesName} {
        from {
          transform: translateY(${-len * 36}px);
        }
        to {
          transform: translateY(0px);
        }
      }
      .${containerClass} ul {
        width: 100%;
        list-style: none;
        cursor: pointer;
        animation: ${framesName} ${len * 1.5}s linear infinite;
      }`
      return text
    },
    query () {
      this.chartObj.assetChart = echarts.init(this.$refs.historyEc)
      this.chartObj.assetChart.showLoading()
      let data = this.getAll(this.queryObj.time[0].split(' ')[0], this.queryObj.time[1].split(' ')[0])
      if (this.queryObj.type === '1') {
        this.getAssetList(data) // 总量
      } else if (this.queryObj.type === '2') {
        this.getFaultRage(data) // 故障数
      } else if (this.queryObj.type === '3') {
        this.getTurnOnRate() // 开机数
      } else {
        this.getTurnOnRate() // 激活数
      }
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
    setDataTime (start, end, data) { // ('2019-01-01', '2019-01-03', {2019-01-02':0, '2019-01-02':0, '2019-01-03':0})
      let arr = this.getAll(start, end)
      for (let key in arr) {
        if (data[key] === 0 || !!data[key]) {
          data[key] += 1
        }
      }
    },
    getTurnOnRate (data) { // 获取开机数和激活数
      let data1 = []
      let data2 = []
      this.initEchart(data1, data2)
    },
    getFaultRage () { // 获取设备故障数
      let data1 = []
      let data2 = []
      this.initEchart(data1, data2)
    },
    getAssetList (data) { // 获取设备总数
      let data1 = []
      let data2 = []
      this.initEchart(data1, data2)
    },
    initEchart (data1, data2) {
      this.chartObj.assetChart.hideLoading()
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
      this.chartObj.assetChart.setOption(option, true)
    },
    initOptions (obj) { // 饼图模版
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
    rankingOptions (data1, data2, title, subtitle, unit) {
      let option = {
        color: ['#3398DB'],
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> ' + subtitle + ': {c} ' + unit
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
      return option
    },
    fullLoadInit () {
      this.chartObj.assetPlaceChart = echarts.init(this.$refs.fullLoad)
      let data1 = []
      let data2 = []
      let option = this.rankingOptions(data1, data2, '设备平均开机时间', '平均开机时间', 'H')
      this.chartObj.fullLoadChart.hideLoading()
      this.chartObj.fullLoadChart.setOption(option, true)
    },
    assetPlaceInit () {
      this.chartObj.assetPlaceChart = echarts.init(this.$refs.placeEc)
      let data1 = []
      let data2 = []
      let option = this.rankingOptions(data1, data2, '科室设备数量', '设备数', '')
      this.chartObj.assetPlaceChart.setOption(option, true)
    },
    abnormalInit () {
      this.chartObj.abnormalChart = echarts.init(this.$refs.abnormal)
      let data1 = []
      let data2 = []
      let option = this.rankingOptions(data1, data2, '科室设备故障率', '故障率', '%')
      this.chartObj.abnormalChart.setOption(option, true)
    },
    spendInit () {
      this.chartObj.assetPlaceChart = echarts.init(this.$refs.spend)
      let data1 = []
      let data2 = []
      let option = this.rankingOptions(data1, data2, '科室设备开机率', '开机率', '%')
      this.chartObj.spendChart.hideLoading()
      this.chartObj.spendChart.setOption(option, true)
    }
  },
  beforeDestroy () {
    window.clearInterval(this.assetTime)
    this.assetTime = null
    document.getElementsByTagName('head')[0].removeChild(document.querySelector('#key-frames'))
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
  .home-module-only {
    height: 235px;
    display: flex;
    background-color:#fff;
    padding-top: 10px;
  }
  .home-module {
    background-color:#fff;
    padding-top: 10px;
    .rotation-chart-container {
      margin: 10px 0 10px 30px;
      display: flex;
      &>div {
        flex:1;margin:5px;box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        .rotation-chart {
          height: 36px;
          overflow: hidden;
          margin-top: 10px;
        }
        ul {
          width:100%;
        }
        ul:hover {
          animation-play-state: paused;
        }
        li {
          height: 36px;
          padding: 0 5px;
          font-size: 14px;
          line-height: 36px;
          position: relative;
          .btn,.status{
            float:right;
          }
          .status {
            margin-right: 10px;
          }
          .btn {
            margin-right: 5px;
            cursor: pointer;
            color:#409eff;
          }
        }
      }
    }
  }
  .name-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 150px;
  }
</style>
