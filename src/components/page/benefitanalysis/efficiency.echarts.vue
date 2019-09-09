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
        let self = this;
        this.incomeEcharts = echarts.init(this.$refs.incomeEcharts);
        let option = {
          title: {
            text: '效率分析'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['设备1','设备2','设备3','设备4','设备5','设备6','设备7','设备8','设备9','设备10','设备11','设备12','设备13','设备14','设备15','设备16','设备17','设备18','设备19','设备20']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['0501','0502','0503','0504','0505','0506','0507']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'设备1',
              type:'line',
              data:[6, 5, 17, 1, 12, 5, 19]
            },
            {
              name:'设备2',
              type:'line',
              data:[4, 8, 5, 2, 0, 5, 1]
            },
            {
              name:'设备3',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备4',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备5',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备6',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备7',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备8',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备9',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备10',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备11',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备12',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备13',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备14',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },{
              name:'设备15',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备16',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备17',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备18',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备19',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
            },
            {
              name:'设备20',
              type:'line',
              data:[14, 11, 2, 21, 12, 14, 4]
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

