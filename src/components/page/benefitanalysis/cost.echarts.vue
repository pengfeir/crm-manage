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
      let option = {
        title: {
          text: '设备支出'
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
          data: ['设备维修费', '设备保养费用', '设备质控费用', '设备折旧费用', '设备保修费', '合计'],
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
            data: this.eData.assetName
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
            name: '设备维修费',
            type: 'bar',
            data: this.eData.faultPrice
          },
          {
            name: '设备保养费用',
            type: 'bar',
            data: this.eData.maintainPrice
          },
          {
            name: '设备质控费用',
            type: 'bar',
            data: this.eData.qaPrice
          },
          {
            name: '设备折旧费用',
            type: 'bar',
            data: this.eData.assetPrice
          },
          {
            name: '设备保修费',
            type: 'bar',
            data: this.eData.assetContractPrice
          },
          {
            name: '合计',
            type: 'bar',
            data: this.eData.allPrice
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
