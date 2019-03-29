<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="">
            资产状态：正常
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
          <echarts-module key="gonglv" :title="'有功功率'" :eData='realPowerObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="gonglv" :title="'功率因数'" :eData='powerFactorObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="gonglvyinshu" :title="'温度'" :eData='temperatureObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="wendu" :title="'电源频率'" :eData='powerHzObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
          <el-button type="primary">历史数据</el-button>
          <echarts-module key="energy" :title="'电能计量'" :eData='energyObj' :unit="'V'"></echarts-module>
        </el-card>
      </el-col>
    </el-row>
    <echarts-history :dialogVisibile="logInfo.visibile" :type="logInfo.type" @cancel="logInfo.visibile=false"></echarts-history>
  </div>
</template>
<script>
import echartsModule from './echartsmodule'
import echartsHistory from './echartshistory'
import { setInterval } from 'timers';
export default {
  components: {
    echartsModule,
    echartsHistory
  },
  data () {
    return {
      time: '2019-03-27 ',
      inputIObj: {x:'12:00:00',y:'0'}, // 输入电流
      inputVObj: {x:'12:00:00',y:'0'}, // 输入电压
      realPowerObj: {x:'12:00:00',y:'0'}, // 有功功率
      powerFactorObj: {x:'12:00:00',y:'0'}, // 功率因数
      temperatureObj: {x:'12:00:00',y:'0'}, // 温度
      powerHzObj: {x:'12:00:00',y:'0'}, // 电源频率
      energyObj: {x:'12:00:00',y:'0'}, // 电能计量
      logInfo: {
        visibile: false,
        type: ''
      }
    }
  },
  methods: {
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
    objs () {
      this.initData(this.inputIObj)
      this.initData(this.inputVObj)
      this.initData(this.realPowerObj)
      this.initData(this.powerFactorObj)
      this.initData(this.temperatureObj)
      this.initData(this.powerHzObj)
      this.initData(this.energyObj)
    }
  },
  mounted () {
    this.objs()
    setInterval(_ => {
      this.objs()
    }, 5000)
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
</style>

