<template>
  <el-dialog title="aaaa"  :visible.sync="visibile" width="90%"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false" :before-close="handleClose">
    <div ref="historyEc" class="historyEc" style="height:280px;width:100%;"></div>
    <div class="log-btn-container">
      <el-button @click="handleClose">取消</el-button>
    </div>
    </el-dialog>
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/line') 
export default {
  props:['dialogVisibile'],
  data () {
    return {
      visibile: false,
      x: [],
      y: [],
      data: [],
      now: +new Date('2018-01-01 12:00:00'),
      oneDay: 30 * 1000,
      value: Math.random() * 1000,
      chart: null
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
    // this.init()
  },
  methods: {
    randomData() {
        this.now = new Date(+this.now + this.oneDay);
        this.value = this.value + Math.random() * 21 - 10;
        let minutes = (this.now.getMinutes() < 10 ? '0' : '') + this.now.getMinutes()
        let seconds = (this.now.getSeconds() < 10 ? '0' : '') + this.now.getSeconds()
        this.x.push(this.now.getFullYear()+'-'+(this.now.getMonth()+1) +'-'+ this.now.getDate()+' '+this.now.getHours() + ':' + minutes + ':' + seconds),
        this.y.push(Math.round(this.value))
    },
    handleClose () {
      this.$emit('cancel')
    },
    init () {
      for (var i = 0; i < 1000; i++) {
        this.data.push(this.randomData());
      }
      this.chart = echarts.init(this.$refs.historyEc)
      var option = {
        title: {
          text: 'Data',
          left: 10
        },
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
          data: this.x,
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
          data: this.y,
          large: true
        }]
      }
      this.chart.setOption(option)
    }
  },
  watch: {
    'dialogVisibile': {
      handler: function (val) {
        if (val) {
          this.$nextTick(_ => {
            this.init()
          }) 
          this.visibile = true
        } else {
          this.visibile = false
        }
        
      },
      immediate: true
    },
  }
}
</script>

