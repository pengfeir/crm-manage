<template>
  <div>
    <div ref="incomeEcharts" style="height:500px;width:100%;">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/pie')
export default {
  props: {
    eData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      incomeEcharts: null
    }
  },
  methods: {
    initIncomeEcharts () { // 收入图表
      this.incomeEcharts = echarts.init(this.$refs.incomeEcharts)
      var xData = this.eData.assetNames
      var assetPrice = this.eData.assetPrice
      var consumablesPrice = this.eData.consumablesPrice
      var otherPrice = this.eData.otherPrice
      var allPrice = this.eData.allPrice
      let option = {
        title: {
          text: '设备收入'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        legend: {
          data: ['总费用', '设备费用', '耗材费用', '其他费用'],
          itemGap: 6
        },
        grid: {
          top: '12%',
          left: '5%',
          right: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLabel: {
              formatter: function (name) {
                return name.split('（')[0]
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位（元）'
          }
        ],
        series: [
          {
            name: '总费用',
            type: 'bar',
            data: allPrice
          },
          {
            name: '设备费用',
            type: 'bar',
            data: assetPrice
          },
          {
            name: '耗材费用',
            type: 'bar',
            data: consumablesPrice
          },
          {
            name: '其他费用',
            type: 'bar',
            data: otherPrice
          }
        ]
      }
      this.incomeEcharts.setOption(option)
    }
  },
  watch: {
    'eData': {
      handler (val) {
        if (JSON.stringify(val) !== '{}') {
          this.initIncomeEcharts()
        }
      },
      immediate: true
    }
  }
}
</script>
