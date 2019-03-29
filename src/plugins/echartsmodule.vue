<template>
  <div ref="echarts" style="height:280px;width:100%;"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props:['title', 'eData', 'time'], 
  //data: [{x:'',y:''}]
  data () {
    return {
      x: [],
      y: [],
      chart: null,
      option: []
    }
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.echarts)
      this.option = {
          title: {
              text: this.title
          },
          tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                return params[0]['axisValueLabel'] + '/' + params[0]['data'];
              },
              axisPointer: {
                  animation: false
              }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.x
          },
          yAxis: {
              type: 'value'
          },
          series: [{
            data: this.y,
            type: 'line'
          }]
      };
      this.chart.setOption(this.option)
    },
    handleData (val) {
      if (this.x.length > 5) {
        this.x.shift()
        this.y.shift()
      }
      this.x.push(this.eData.x)
      this.y.push(this.eData.y)
      if (this.chart && this.chart.setOption) {
        this.chart.setOption(this.option);
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'eData.x': {
      handler: function (val) {
        if (val) {
          this.handleData()
        }
      },
      immediate: true
    },
  }

}
</script>
