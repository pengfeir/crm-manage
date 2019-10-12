<template>
  <div>
    <div ref="historyEc" class="historyEc" style="height:450px;width:100%;"></div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import moment from 'moment'
import api from '@/api/api'
require('echarts/lib/chart/line')
export default {
  props: ['obj'],
  data () {
    return {
      title: '',
      oldDate: ['', ''],
      x: [],
      y: [],
      data: [],
      now: +new Date('2018-01-01 12:00:00'),
      oneDay: 30 * 1000,
      value: Math.random() * 1000,
      chart: null,
      options: [
        { id: 1, name: '输入电流', unit: 'A', objVal: 'inputIObj' },
        { id: 2, name: '输入电压', unit: 'V', objVal: 'inputVObj' },
        { id: 3, name: '有功功率', unit: 'kW/H', objVal: 'realPowerObj' },
        { id: 4, name: '功率因数', unit: '--', objVal: 'powerFactorObj' },
        { id: 5, name: '温度', unit: '°C', objVal: 'temperatureObj' },
        { id: 6, name: '电源频率', unit: 'Hz', objVal: 'powerHzObj' },
        { id: 7, name: '电能计量', unit: 'kW', objVal: 'energyObj' }
      ],
      queryObj: {
        type: 1,
        date: []
      }
    }
  },
  computed: {
    v: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted () {
  },
  methods: {
    query () {
      if (this.obj.dataType === 1) return
      this.chart.showLoading({
        text: '正在加载数据'
      })
      if (this.queryObj.date[0] === this.oldDate[0] && this.queryObj.date[1] === this.oldDate[1] && this.data.length > 0) {
        this.init()
      } else {
        this.getData()
      }
    },
    clearInfo () {
      this.queryObj.type = ''
      this.queryObj.date = [
        moment(new Date().getTime() - 86400000).format('YYYY-MM-DD HH:mm:ss'),
        moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      ]
      this.x = []
      this.y = []
    },
    randomData () {
      this.now = new Date(+this.now + this.oneDay)
      this.value = this.value + Math.random() * 21 - 10
      let minutes = (this.now.getMinutes() < 10 ? '0' : '') + this.now.getMinutes()
      let seconds = (this.now.getSeconds() < 10 ? '0' : '') + this.now.getSeconds()
      this.x.push(this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate() + ' ' + this.now.getHours() + ':' + minutes + ':' + seconds)
      this.y.push(Math.round(this.value))
    },
    handleClose () {
      this.$emit('cancel')
    },
    getData () {
      let params = {
        endDate: moment(this.obj.date[1]).format('YYYY-MM-DD') + ' 23:59:59',
        beginDate: moment(this.obj.date[0]).format('YYYY-MM-DD') + ' 00:00:00',
        macAddress: this.$route.query.id
      }
      api.findHistory(params).then(rs => {
        this.data = rs.data.reverse()
        this.init()
      })
    },
    initData () {
      let xData = []
      let yData = []
      this.data.forEach(item => {
        xData.push(item.ctime)
        if (this.obj.type === 1) {
          yData.push(item.inputI)
        } else if (this.obj.type === 2) {
          yData.push(item.inputV)
        } else if (this.obj.type === 3) {
          yData.push(item.realPower)
        } else if (this.obj.type === 4) {
          yData.push(item.powerFactor)
        } else if (this.obj.type === 5) {
          yData.push(item.temperature)
        } else if (this.obj.type === 6) {
          yData.push(item.powerHz)
        } else if (this.obj.type === 7) {
          yData.push(item.energy)
        }
      })
      return [xData, yData]
    },
    init () {
      let data = this.initData()
      var option = {
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        xAxis: {
          data: data[0],
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
          type: 'line',
          data: data[1],
          large: true
        }]
      }
      this.chart.setOption(option, true)
      this.chart.hideLoading()
    }
  },
  watch: {
    'obj.dataType': {
      handler: function (val) {
        if (val === 2) {
          window.setTimeout(_ => {
            this.chart = echarts.init(this.$refs.historyEc)
            this.queryObj.type = this.obj.type
            this.getData()
          }, 300)
        } else {
          this.clearInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
  .ui_dialog_02 /deep/ .el-dialog__body {
    padding: 10px 20px 30px 20px;
  }
  .package-sale /deep/ .el-date-editor{
    .el-range__icon,.el-range-separator {
      line-height: 25px;
    }
  }
</style>
