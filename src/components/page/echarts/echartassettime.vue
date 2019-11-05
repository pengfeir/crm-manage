<template>
  <div>
    <el-row>
      <el-col :span="4">
        <h3>开机时间间隔</h3>
      </el-col>
      <el-col :span="20" style="text-align:right;padding-right:10px;">
        <div class="consultTime">
          <el-input v-model="consultTime" placeholder="参考水平"></el-input>
        </div>
        <div style="display:inline-block;width:300px;">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div style="display:inline-block;">
          <el-button icon="el-icon-search" @click="query"></el-button>
        </div>
      </el-col>
    </el-row>
    <div v-show="visibile" ref="assetTime" class="asset" style="height:400px;width:100%;"></div>
    <div v-show="!visibile" class="noData" v-loading="loading">暂无数据</div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import moment from 'moment'
import api from '@/api/api'
require('echarts/lib/chart/line')
let schema = [
  {
    label: '',
    name: 'type',
    comp: 'custom'
  },
  {
    name: 'dataType',
    label: '',
    comp: 'custom'
  },
  {
    name: 'date',
    label: '',
    comp: 'custom'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  }
]
export default {
  props: {},
  data () {
    let obj = this.createObjFromSchema(schema)
    return {
      querySchema: schema,
      queryObj: obj,
      visibile: true,
      dateValue: [
        moment(new Date().getTime() - 7 * 86400000).format('YYYY-MM-DD HH:mm:ss'),
        moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      ],
      assetTimeChart: null,
      assetId: '',
      loading: false,
      consultTime: '', // 参考水平
      averageValue: 0 // 平均值
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
  created () {
    this.query()
  },
  methods: {
    checkAsset () {
      this.seeAsssetTime()
    },
    async query () {
      this.loading = true
      this.getAssetTimeData()
    },
    getAssetTimeData () {
      let params = {
        beginDate: this.dateValue[0],
        endDate: this.dateValue[1],
        macAddr: this.$route.query.id
      }
      api.findAll(params).then(rs => {
        if (rs.code === 200 && rs.data.length > 0) {
          this.visibile = true
          this.loading = false
          let data = rs.data.sort((a, b) => {
            a.ctimeDate = new Date(a.ctime).getTime()
            b.ctimeDate = new Date(b.ctime).getTime()
            return a.ctimeDate - b.ctimeDate
          })
          this.initData(data)
        } else {
          this.visibile = false
          this.loading = false
        }
      }, rj => {
        this.loading = false
      })
    },
    initData (data) {
      let data1 = []
      let data2 = []
      let sumTime = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i + 1]) {
          // let beginTitle = data[i]['ctime'].replace(/(^\d{4}(-))|((:)\d{2}$)/g, '')
          let endTitle = data[i + 1]['ctime'].replace(/(^\d{4}(-))|((:)\d{2}$)/g, '')
          let title = endTitle
          let time = ((data[i + 1]['ctimeDate'] - data[i]['ctimeDate']) / 3600000).toFixed(2)
          if (time) {
            sumTime += (data[i + 1]['ctimeDate'] - data[i]['ctimeDate'])
            data1.push(title)
            data2.push(time)
          }
        }
      }
      let averageValue = (sumTime / (3600000 * data1.length)).toFixed(2)
      let averageValue1 = (sumTime / (3600000 * data1.length)).toFixed(4)
      if (averageValue !== '0.00') {
        this.averageValue = averageValue
      } else if (averageValue1 !== '0.0000') {
        this.averageValue = averageValue1
      } else {
        this.averageValue = 0
      }
      this.$emit('getAverageTime', this.averageValue)
      this.seeAsssetTime(data1, data2)
    },
    seeAsssetTime (data1, data2) {
      this.loading = false
      this.assetTimeChart = echarts.init(this.$refs.assetTime)
      this.assetTimeChart.hideLoading()
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} <br> 开机时间间隔: {c}小时'
        },
        grid: {
          left: '30',
          top: '30',
          right: '70',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        visualMap: {
          show: false,
          pieces: [
            {
              gt: 0,
              lte: 1, // 这儿设置基线上下颜色区分 基线下面为绿色
              color: '#03d6d6'
            }, {
              gt: 1, // 这儿设置基线上下颜色区分 基线上面为红色
              color: '#03d6d6'
            }]
        },
        xAxis: {
          data: data1,
          name: '开机时间',
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          name: '时间(小时)',
          splitArea: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          data: data2,
          barMaxWidth: 30,
          large: true,
          markLine: {
            default: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: 'solid'
                },
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}：{c} H'
                }
              }
            },
            data: [
              {
                name: '平均值',
                yAxis: this.averageValue,
                lineStyle: {
                  color: 'green'
                }
              },
              {
                name: '参考水平',
                yAxis: this.consultTime,
                lineStyle: {
                  color: 'red'
                }
              }
            ]
          }
        }]
      }
      this.assetTimeChart.setOption(option, true)
    }
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
  .el-date-editor{
    height: 30px;
    line-height: 30px;
    & /deep/ .el-input__icon {
      line-height: 20px;
    }
    & /deep/ .el-range-separator {
      line-height: 22px !important;
    }
  }
  .el-button {
    margin-left: 10px;
    padding: 7px 8px;
  }
  .consultTime {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    /deep/ input {
      height: 30px !important;
      position: relative;
      top: 1px;
    }
  }
  .noData {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 22px;
  }
</style>
