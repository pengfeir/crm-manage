<template>
  <div>
    <div ref="incomeEcharts" style="height:350px;width:100%;">
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
      let self = this;
      this.incomeEcharts = echarts.init(this.$refs.incomeEcharts);
      var ydata = this.eData.objInfo;
      var xdata = this.eData.titleInfo;
      var title = this.eData.title;
      let option = {
        title : {
          text: title,
          subtext: '',
          x:'left',
          left: '20'
        },
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          formatter: function (val) {
            return val.name + ':' + self.formatToFinacial(val.value)
          },
        },
        legend: {           
          orient: 'vertical',
          x: 'right',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left', 
          top:'50',  
          left:'70%',
          data:xdata,
          formatter: function (name) {
              return name + ' ' + self.formatToFinacial(ydata.find(item => item.name === name).value);
          },
          textStyle: {
            color: 'rgb(0, 0, 0)'
          }
        },
        series: [
          {
            name:'营收',
            type:'pie',
            radius: ['42%', '55%'],
            center: ['30%','60%'],
            color: ['#0092ff', '#eba954', '#21b6b9','#60a900','#01949b',' #f17677', '#191970', '#3CB371', '#483D8B', '#696969'],
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              },         
            },
            data:ydata
          }
        ]
      };
      this.incomeEcharts.setOption(option);
    }
  },
  watch: {
    'eData': {
      handler(val) {
        if (JSON.stringify(val) !== '{}') {
          this.initIncomeEcharts();
        }
      },
      immediate: true
    }
  }
}
</script>

