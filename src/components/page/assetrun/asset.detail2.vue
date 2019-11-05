<template>
  <div>
    <div class="ever-bread-crumb">
      <el-button @click="go" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
      <span>返回</span>
    </div>
    <el-row>
      <el-col :span="10" style="height:241px;">
        <div class="demo-css">
          <!-- 设备名称  设备编号-->
          <div><h3>{{info.assetName || '未知'}} {{info.assetNo || '未知'}}</h3></div>
          <!-- 设备型号 -->
          <div><span style="color:#409EFF;">{{info.assetModel || '未知'}}</span></div>
          <div style="text-align:center;position: absolute;width: calc( 100% - 40px);bottom: 30px">
            <!-- 设备SN序列号 -->
            <!-- 设备品牌  -->
            <!-- 科室 -->
            <!-- 位置 -->
            <span class="asset-info-ul">
              <span>{{info.assetSn || '未知'}}</span>
              <span>{{info.brand || '未知'}}</span>
              <span>{{info.deptName || '未知'}}</span>
              <span>{{info.seat || '未知'}}</span>
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="demo-css">
          <el-row style="margin-bottom:30px;">
            <el-col :span="6">
              <div class="type-container">
                <div>年利用率</div>
                <div>
                  <el-button type="success" plain>{{((timeInfo.yearTime)/(365*24 * 60 * 60 * 10)).toFixed(2)}}%</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="type-container">
                <div>保修状态</div>
                <div>
                  <el-button v-if="infoQueryObj.guaranteeType === '1'" type="primary" plain>在保</el-button>
                  <el-button v-else-if="infoQueryObj.guaranteeType === '2'" type="danger" plain>出保</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="type-container">
                <div>网络状态</div>
                <div>
                  <el-button v-if="infoQueryObj.networkStatus === '在线'" type="primary" plain>在线</el-button>
                  <el-button v-if="infoQueryObj.networkStatus === '离线'" plain>离线</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="type-container">
                <div>运行状态</div>
                <div v-if="infoQueryObj.networkStatus === '在线'">
                  <el-button v-if="infoQueryObj.assetType == 40 || infoQueryObj.assetType == 20" type="primary" plain>激活</el-button>
                  <el-button v-else-if="infoQueryObj.assetType == 30 || infoQueryObj.assetType == 10" type="primary">{{`${infoQueryObj.assetType == 10? '关机': '待机'}`}}</el-button>
                  <el-button v-else-if="infoQueryObj.assetType == 50" type="danger">故障</el-button>
                  <el-button v-else plain>未知</el-button>
                </div>
                <div v-if="infoQueryObj.networkStatus === '离线'">
                  <el-button plain>未知</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="asset-run-info">
            <el-col :span="4" style="">
              <div class="max-size green">{{timeInfo.yearTime | initTime}}</div>
              <div class="min-size">本年开机时间</div>
            </el-col>
            <el-col :span="4">
              <div class="max-size green">{{timeInfo.allTime | initTime}}</div>
              <div class="min-size">累计开机时间</div>
            </el-col>
            <el-col :span="4">
              <div class="max-size green">{{timeInfo.monthTime | initTime}}</div>
              <div class="min-size">本月开机时间</div>
            </el-col>
            <el-col :span="4">
              <div class="max-size green">{{timeInfo.dayTime | initTime}}</div>
              <div class="min-size">今日开机时间</div>
            </el-col>
            <el-col :span="4">
              <div class="max-size green">{{timeInfo.frequency}} 次</div>
              <div class="min-size">今日开机次数</div>
            </el-col>
            <el-col :span="4">
              <div class="max-size green">{{timeInfo.averageTime}} H</div>
              <div class="min-size">平均开机间隔时间</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19">
        <div class="demo-css" style="height: 572px;">
          <el-row>
            <el-col :span="24">
              <div class="tab-module">
                <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
                  <template slot="type">
                    <el-select v-model="queryObj.type" @change="typeChange" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                  <template slot="dataType">
                    <el-select v-model="queryObj.dataType" placeholder="请选择">
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                  <template slot="date">
                    <el-date-picker
                      v-model="queryObj.date"
                      :disabled="queryObj.dataType===1"
                      class="diy-date"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </template>
                  <template slot="btn">
                    <el-button @click="query">查看</el-button>
                  </template>
                </ever-form2>

              </div>
            </el-col>
          </el-row>
          <div>
            <div>
              <echarts-module v-show="queryObj.dataType===1 && infoQueryObj.networkStatus === '在线'" :title="echartsInfo.title" :eData='echartsInfo.data' :unit="echartsInfo.unit"></echarts-module>
              <div v-show="queryObj.dataType===1 && infoQueryObj.networkStatus === '离线'" style="text-align:center;padding-top:50px;font-size:25px;">暂无数据</div>
              <echarts-history ref="child1" v-show="queryObj.dataType===2" :obj="queryObj"></echarts-history>
            </div>
            <!-- <div v-if="activeName===2">2</div>
            <div v-if="activeName===3">3</div> -->
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="demo-css data-module">
          <div class="title">实时有效电压(V)</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '在线'">{{info.inputV}}</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '离线'">未知</div>
          <div class="ranage">正常范围：{{`${ranage.V.min} ~ ${ranage.V.max}`}}</div>
        </div>
        <div class="demo-css data-module">
          <div class="title">实时有效电流(A)</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '在线'">{{info.inputI}}</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '离线'">未知</div>
          <div class="ranage"></div>
        </div>
        <div class="demo-css data-module">
          <div class="title">实时有效功率(W)</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '在线'">{{info.realPower}}</div>
          <div class="data" v-if="infoQueryObj.networkStatus === '离线'">未知</div>
          <div class="ranage"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
          <div class="demo-css">
            <echarts-asset-time @getAverageTime="getAverageTime"></echarts-asset-time>
          </div>
        </el-col>
      </el-row>
    <el-row>
      <el-col :span="24">
        <div class="demo-css">
          <div><h3>异常详情</h3></div>
          <el-table v-loading="loading" :data="tableData" style="width: 100%" height="440" border stripe>
            <el-table-column prop="assetStatus" align="center" label="设备状态" width="100">
                <template slot-scope="scope">
                    {{scope.row.assetStatus | filterAssetStatus}}
                </template>
            </el-table-column>
            <el-table-column prop="temperature" align="center" label="温度" width="80">
              <template slot-scope="scope">
                {{scope.row.temperature}}<span style="color:#409EFF;">{{scope.row.temperature? ' °C': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="energy" align="center" label="电能计量" width="100">
              <template slot-scope="scope">
                {{scope.row.energy}}<span style="color:#409EFF;">{{scope.row.energy? ' kW': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="inputI" align="center" label="输入电流" width="80">
              <template slot-scope="scope">
                {{scope.row.inputI}}<span style="color:#409EFF;">{{scope.row.inputI? ' A': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="inputV" align="center" label="输入电压" width="80">
              <template slot-scope="scope">
                {{scope.row.inputV}}<span style="color:#409EFF;">{{scope.row.inputV? ' V': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pos1" align="center" label="位置信息1" width="130">
            </el-table-column>
            <el-table-column prop="pos2" align="center" label="位置信息2" width="130">
            </el-table-column>
            <el-table-column prop="pos3" align="center" label="位置信息3" width="130">
            </el-table-column>
            <el-table-column prop="powerFactor" align="center" label="功率因数" width="80">
            </el-table-column>
            <el-table-column prop="powerHz" align="center" label="电源频率" width="80">
              <template slot-scope="scope">
                {{scope.row.powerHz}}<span style="color:#409EFF;">{{scope.row.powerHz? ' Hz': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="realPower" align="center" label="有功功率" width="80">
              <template slot-scope="scope">
                {{scope.row.realPower}}<span style="color:#409EFF;">{{scope.row.realPower? ' kW/H': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mtime" align="center" label="更新时间">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api/api'
import echartsModule from '../echarts/echartsmodule'
import echartsHistory from '../echarts/echartshistory'
import echartsAssetTime from '../echarts/echartassettime'
import moment from 'moment'
let schema = [
  {
    label: '',
    name: 'type',
    comp: 'custom'
  },
  {
    name: 'dataType',
    label: '',
    comp: 'custom'
  },
  {
    name: 'date',
    label: '',
    comp: 'custom'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  }
]
export default {
  components: {
    echartsModule,
    echartsHistory,
    echartsAssetTime
  },
  data () {
    var obj = this.createObjFromSchema(schema)
    obj.type = 1
    obj.dataType = 1
    obj.date = [
      moment(new Date().getTime() - 86400000).format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
    ]

    return {
      api,
      querySchema: schema,
      queryObj: obj,
      id: this.$route.query.id,
      loading: false,
      activeName: 1,
      value4: [],
      options: [
        { id: 1, name: '输入电流', unit: 'A', objVal: 'inputIObj' },
        { id: 2, name: '输入电压', unit: 'V', objVal: 'inputVObj' },
        { id: 3, name: '有功功率', unit: 'W', objVal: 'realPowerObj' },
        { id: 4, name: '功率因数', unit: '--', objVal: 'powerFactorObj' },
        { id: 5, name: '温度', unit: '°C', objVal: 'temperatureObj' },
        { id: 6, name: '电源频率', unit: 'Hz', objVal: 'powerHzObj' },
        { id: 7, name: '电能计量', unit: 'kWh', objVal: 'energyObj' }
      ],
      typeOptions: [
        { id: 1, name: '实时数据' },
        { id: 2, name: '历史数据' }
      ],
      time: '2019-03-27 ',
      inputIObj: { x: '00:00:00', y: '0' }, // 输入电流
      inputVObj: { x: '00:00:00', y: '0' }, // 输入电压
      realPowerObj: { x: '00:00:00', y: '0' }, // 有功功率
      powerFactorObj: { x: '00:00:00', y: '0' }, // 功率因数
      temperatureObj: { x: '00:00:00', y: '0' }, // 温度
      powerHzObj: { x: '00:00:00', y: '0' }, // 电源频率
      energyObj: { x: '00:00:00', y: '0' }, // 电能计量

      intervalTime: null,
      info: {},
      echartsInfo: {
        title: '输入电流',
        data: '',
        unit: 'A'
      },
      tableData: [],
      ranage: {
        A: {
          max: 0,
          min: 0
        },
        V: {
          max: 0,
          min: 0
        },
        W: {
          max: 0,
          min: 0
        }
      },
      infoQueryObj: {
        guaranteeType: '1',
        networkStatus: '在线',
        assetType: 1 // 1激活 2关机 3待机 4报警 5故障
      },
      assetTypeTable: [],
      assetId: null,
      timeInfo: {
        yearTime: 0,
        allTime: 0,
        monthTime: 0,
        dayTime: 0,
        frequency: 0,
        averageTime: 0
      },
      dateValue: [],
      assetTimeChart: null
    }
  },
  methods: {
    getAverageTime (val) {
      console.log(val)
      this.timeInfo.averageTime = val
    },
    go () {
      this.$router.go(-1)
    },
    query () {
      this.$refs.child1.query()
    },
    initHistoryData () {

    },
    getAssetTime (id) {
      let yearParams = {
        beginDate: new Date().getFullYear() + '-01-01 00:00:00',
        endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        assetId: id,
        timeDivide: false,
        pageNum: 0,
        pageSize: 100
      }
      api.powerTimeStatistics(yearParams).then(rs => {
        if (rs.data[0]['powerTimes'] && rs.data[0]['powerTimes'].length > 0) {
          this.timeInfo.yearTime = this.timeInfo.allTime = rs.data[0]['powerTimes'][0]['powerOffTime']
        }
      })
      let monthParams = {
        beginDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01 00:00:00',
        endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        assetId: id,
        timeDivide: false,
        pageNum: 0,
        pageSize: 100
      }
      api.powerTimeStatistics(monthParams).then(rs => {
        if (rs.data[0]['powerTimes'] && rs.data[0]['powerTimes'].length > 0) {
          this.timeInfo.monthTime = rs.data[0]['powerTimes'][0]['powerOffTime']
        }
      })
      let dayParams = {
        beginDate: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        assetId: id,
        timeDivide: false,
        pageNum: 0,
        pageSize: 100
      }
      api.powerTimeStatistics(dayParams).then(rs => {
        if (rs.data[0]['powerTimes'] && rs.data[0]['powerTimes'].length > 0) {
          this.timeInfo.dayTime = rs.data[0]['powerTimes'][0]['powerOffTime']
        }
      })
      let frequencyParams = {
        beginDate: moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
        endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        macAddress: this.id
      }
      api.findByParam(frequencyParams).then(rs => {
        console.log(rs)
        this.timeInfo.frequency = rs.data.length > 0 ? rs.data[0]['count'] : 0
      })
    },
    getHistoryData () {
      let params = {
        endDate: this.queryObj.date[1],
        beginDate: this.queryObj.date[0],
        macAddress: this.$route.query.id,
        pageNum: 1,
        pageSize: 14400
      }
      api.assetMetricsList(params).then(rs => {

      })
    },
    typeChange (val) {
      let lab = this.options[val - 1]
      this.echartsInfo.title = lab.name
      this.echartsInfo.unit = lab.unit
      this.echartsInfo.data = this[lab.objVal]
    },
    getTime () {
      let date = new Date()
      let time = ''
      let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
      let seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
      time = date.getHours() + ':' + minutes + ':' + seconds
      let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
      let dateval = (date.getDate() < 10 ? '0' : '') + date.getDate()
      let curTime = date.getFullYear() + '-' + month + '-' + dateval
      if (curTime !== this.time) {
        this.time = curTime
      }
      return this.time + ' ' + time
    },
    objs () {
      // beginDate endDate
      // let endDate = this.getTime()
      api.tempList({ macAddress: this.id }).then(rs => {
        this.assetId = rs.data[rs.data.length - 1]['assetId']
        Object.assign(rs.data[rs.data.length - 1], { seat: this.info.seat, deptName: this.info.deptName })
        this.info = rs.data[rs.data.length - 1]
        this.initData(rs.data[rs.data.length - 1])
        this.initAssetType(rs.data[rs.data.length - 1])
      })
    },
    initData (data) {
      let time = data.mtime.split(' ')[1]
      if (this.inputIObj.x !== time) {
        this.inputIObj.x = time
        this.inputIObj.y = data.inputI

        this.inputVObj.x = time
        this.inputVObj.y = data.inputV

        this.realPowerObj.x = time
        this.realPowerObj.y = data.realPower

        this.powerFactorObj.x = time
        this.powerFactorObj.y = data.powerFactor

        this.temperatureObj.x = time
        this.temperatureObj.y = data.temperature

        this.powerHzObj.x = time
        this.powerHzObj.y = data.powerHz

        this.energyObj.x = time
        this.energyObj.y = data.energy
      }
    },
    clear () {
      clearInterval(this.intervalTime)
      this.intervalTime = null
    },
    initAssetData () {
      let params = {
        pageNum: 1,
        pageSize: 200,
        macAddress: this.$route.query.id
      }
      api.assetMetricsList(params).then(rs => {
        if (rs.code === 200) {
          this.assetData = rs.data.list[0]
        }
      })
    },
    getRange () {
      api.findByMacAddr({ macAddr: this.$route.query.id }).then(rs => {
        if (rs.code === 200) {
          console.log(rs)
          let table = JSON.parse(rs.data.extra)
          this.ranage.V.max = table[3]['value1']
          this.ranage.V.min = table[3]['value2']
          this.assetTypeTable = table
          this.info.deptName = rs.data.deptName
          this.info.seat = `${rs.data.areaName || '未知'} / ${rs.data.buildingName || '未知'} / ${rs.data.roomNo || '未知'}`
        }
      })
    },
    getContractInfo (assetId) {
      api.findByAssetContract({ assetId: assetId, pageNum: 1, pageSize: 20 }).then(rs => {
        if (rs.data && rs.data.length > 0) {
          this.infoQueryObj.guaranteeType = '1'
        } else {
          this.infoQueryObj.guaranteeType = '2'
        }
      })
    },
    initAssetType (data) {
      this.infoQueryObj.assetType = data.assetStatus
      let time = new Date().getTime()
      let curTime = new Date(data.ctime).getTime()
      if (curTime + 2 * 60 * 1000 < time) {
        this.infoQueryObj.networkStatus = '离线'
      } else {
        this.infoQueryObj.networkStatus = '在线'
      }
    },
    getAnomalous () {
      let params = {
        macAddr: this.$route.query.id,
        pageNum: 1,
        pageSize: 100,
        endDate: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
        beginDate: '2019-01-01 00:00:00'
      }
      api.findAnomalous(params).then(rs => {
        this.tableData = rs.data.list
      })
    },
    checkAsset () {

    }
  },
  mounted () {

  },
  filters: {
    initTime (value) {
      if (value > 86400000) {
        return (value / (86400000)).toFixed(2) + ' T'
      } else {
        return (value / (60 * 60 * 1000)).toFixed(2) + ' H'
      }
    }
  },
  beforeDestroy () {
    this.clear()
  },
  created () {
    this.queryObj.type = 1
    this.echartsInfo.data = this.inputIObj
    this.objs()
    this.getAnomalous()
    this.getRange()
    this.intervalTime = setInterval(_ => {
      this.objs()
    }, 5000)
  },
  watch: {
    'queryObj.dataType': {
      handler: function (val, oldval) {
        if (val === 1) {
          this.objs()
          this.intervalTime = setInterval(_ => {
            this.objs()
          }, 5000)
          this.typeChange(this.queryObj.type)
        } else {
          this.clear()
        }
      },
      deep: true
    },
    'assetId': {
      handler: function (val, oldval) {
        if (val) {
          this.getAssetTime(val)
          this.getContractInfo(val)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
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
  .asset-info-ul {
    margin-top: 20px;
    overflow: hidden;
    span {
      padding: 0 15px;
      border-right: 1px solid #606266;
      color: #606266;
    }
  }
  .asset-info-ul span:last-child {
    border: none;
  }
  .type-container {
    text-align: center;
    .el-button {
      width: 100px;
      margin-top: 10px;
    }
  }
  .asset-run-info {
    border-top:1px solid #eee;
    padding-top:20px;
    .el-col {
      border-right:1px solid #eee;
      div {
        text-align: center;
      }
      .max-size {
        font-size: 20px;
      }
      .min-size {
        font-size: 14px;
      }
      .red {
        color: red;
      }
      .green {
        color: #67C23A;
      }
    }
  }
  .asset-run-info .el-col:last-child {
    border: none !important;
  }
  .data-module {
    margin-bottom: 15px;
    height: 181px;
    .title {
      color: #606266;
    }
    .data {
      color: #67C23A;
      text-align: center;
      font-size: 40px;
      padding: 15px 0;
    }
    .ranage {
      padding-top: 10px;
      color: #606266;
      border-top: 1px solid #606266;
    }
  }
  .tab-module {
    .el-button {
      padding: 8px 10px;
    }
  }
  .btn-group-style {
    .el-button {
      padding: 5px 10px;
    }
  }
  .diy-date {
    position: relative;
    // top: -5px;
    height: 32px;
    /deep/ .el-input__icon {
      line-height: 24px;
    }
    /deep/ .el-range-separator {
      line-height: 24px;
    }
  }
  // 待机
  .green {
    color:#00FF00 !important;
  }
  // 关机
  .red {
    color: red !important;
  }
  // 激活
  .yellow {
    color: yellow !important;
  }
  // 开机
  .blur {
    color: blue !important;
  }
  .ever-bread-crumb {
    margin-bottom: 10px;
    color:#606266;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin-right: 5px;
    margin-left: 5px;
  }
</style>
