<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="">
            设备状态：正常
        </el-card>
      </el-col>
    </el-row>
    <el-row class="ec-container">
      <el-col :span="12">
        <el-card class="demo_css">
          <echarts-module key="dianliu" :title="'电流'" :eData='inputIObj'></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
            <echarts-module key="dianya"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
            <echarts-module key="gonglv"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
            <echarts-module key="gonglvyinshu"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
            <echarts-module key="wendu"></echarts-module>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="demo_css">
            <echarts-module key="dianneng"></echarts-module>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echartsModule from './echartsmodule'
import { setInterval } from 'timers';
export default {
  components: {
    echartsModule
  },
  data () {
    return {
      time: '2019-03-27 ',
      inputIObj:{x:'12:00:00',y:'0',time:''},
      obj:{
        assetStatus: "30",
        ctime: "2019-03-27 11:02:45", // 创建时间
        energy: 324888, // 电能计量 kW
        extra: "333", // 其他扩展信息
        id: 201903271135781,
        inputI: 234888, // 输入电流 A
        inputV: 234888, // 输入电压 V
        macAddr: "234888", //设备的mac地址
        mtime: "2019-03-27 11:02:45", //更新时间
        orgId: 0, //机构id
        orgName: "测试机构1", // 机构名称
        pos1: 234888, //位置信息1
        pos2: 234888, //位置信息2
        pos3: 234888, //位置信息3
        powerFactor: 234888, //功率因数
        powerHz: 234888, //电源频率 Hz
        realPower: 234888, // 有功功率 KW/H
        status: 0, 
        temperature: 234888 // 温度 `C
      }
    }
  },
  methods: {
    initData () {
      let x = this.inputIObj.x
      let time = new Date(new Date(this.time + x).getTime() + 5000)
      let minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      let seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
      this.inputIObj.x = time.getHours() + ':' + minutes + ':' +time.getSeconds()
      this.inputIObj.y = parseInt(Math.random()*100 + 100)
      console.log(this.inputIObj.x , '111111')
    }
  },
  mounted () {
    this.initData()
    setInterval(_ => {
      this.initData()
    }, 5000)
  }
}
</script>

<style lange="less" scoped>
  .el-col {
    padding: 5px;
  }
  .demo_css{
    height:300px;
  }
</style>

