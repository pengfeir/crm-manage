<template>
  <div>
    <div class="ever-bread-crumb">
      <el-button @click="go" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
      <span>监测数据</span>
    </div>
    <el-row>
      <el-col :span="24">
        <el-card class="">
            设备状态：{{info.assetStatus | filterAssetStatus}}
            时间：{{time}}
        </el-card>
      </el-col>
    </el-row>
    <el-row class="ec-container">
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary" @click="seeHistory('1')">历史数据</el-button>
          <echarts-module key="dianliu" :title="'输入电流'" :eData='inputIObj' :unit="'A'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="dianya" :title="'输入电压'" :eData='inputVObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="gonglv" :title="'有功功率'" :eData='realPowerObj' :unit="'kW/H'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="gonglv" :title="'功率因数'" :eData='powerFactorObj' :unit="'--'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="gonglvyinshu" :title="'温度'" :eData='temperatureObj' :unit="'°C'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="wendu" :title="'电源频率'" :eData='powerHzObj' :unit="'Hz'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="energy" :title="'电能计量'" :eData='energyObj' :unit="'kW'"></echarts-module>
        </el-card>
      </el-col>
    </el-row>
    <echarts-history :dialogVisibile="logInfo.visibile" :type="logInfo.type" @cancel="logInfo.visibile=false"></echarts-history>
  </div>
</template>
<script>
import api from "@/api/api"
import echartsModule from './echartsmodule'
import echartsHistory from './echartshistory'
import { setInterval, clearInterval } from 'timers';
export default {
  props:['id', 'types'],
  components: {
    echartsModule,
    echartsHistory
  },
  data () {
    return {
      time: '2019-03-27 ',
      inputIObj: {x:'00:00:00',y:'0'}, // 输入电流
      inputVObj: {x:'00:00:00',y:'0'}, // 输入电压
      realPowerObj: {x:'00:00:00',y:'0'}, // 有功功率
      powerFactorObj: {x:'00:00:00',y:'0'}, // 功率因数
      temperatureObj: {x:'00:00:00',y:'0'}, // 温度
      powerHzObj: {x:'00:00:00',y:'0'}, // 电源频率
      energyObj: {x:'00:00:00',y:'0'}, // 电能计量
      logInfo: {
        visibile: false,
        type: ''
      },
      interval: null,
      info: {
        time: '',
        assetStatus: ''
      }
    }
  },
  methods: {
    go () {
      this.$router.go(-1)
    },
    seeHistory (key) {
      this.logInfo.visibile = true
      this.logInfo.type = key
    },
    initData (obj) {
      let x = obj.x
      let time = new Date(new Date(this.time + x).getTime() + 5000)
      let minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      let seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
      obj.x = time.getHours() + ':' + minutes + ':' + seconds
      obj.y = parseInt(Math.random()*100 + 100)
    },
    getTime () {
      let date = new Date ()
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
      console.log(this.time)
      return this.time + ' ' + time
    },
    objs () {
      // beginDate endDate
      let endDate = this.getTime()
      api.assetMetricsList({macAddress: this.id, endDate: endDate, pageNum: 1, pageSize: 20}).then(rs => {
        this.info = rs.data.list[rs.data.list.length-1]
        this.initData(rs.data.list[rs.data.list.length-1])
      })
      // this.initData(this.inputIObj)
      // this.initData(this.inputVObj)
      // this.initData(this.realPowerObj)
      // this.initData(this.powerFactorObj)
      // this.initData(this.temperatureObj)
      // this.initData(this.powerHzObj)
      // this.initData(this.energyObj)
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
    }
  },
  mounted () {
    this.objs()
    this.interval = setInterval(_ => {
      this.objs()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
  }
}
</script>
// obj:{
//         assetStatus: "30",
//         ctime: "2019-03-27 11:02:45", // 创建时间
//         energy: 324888, // 电能计量 kW
//         extra: "333", // 其他扩展信息
//         id: 201903271135781,
//         inputI: 234888, // 输入电流 A
//         inputV: 234888, // 输入电压 V
//         macAddr: "234888", //设备的mac地址
//         mtime: "2019-03-27 11:02:45", //更新时间
//         orgId: 0, //机构id
//         orgName: "测试机构1", // 机构名称
//         pos1: 234888, //位置信息1
//         pos2: 234888, //位置信息2
//         pos3: 234888, //位置信息3
//         powerFactor: 234888, //功率因数
//         powerHz: 234888, //电源频率 Hz
//         realPower: 234888, // 有功功率 KW/H
//         status: 0, 
//         temperature: 234888 // 温度 `C
//       }

<style lang="less" scoped>
  .el-col {
    padding: 5px;
  }
  .demo_css{
    height:300px;
    position:relative;
    .el-button{
      padding:3px 5px;
      position:absolute;
      right:10px;
      font-size: 12px;
      z-index: 100;
      cursor: pointer;
    }
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin: 8px;
  }
</style>

