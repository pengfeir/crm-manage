<template>
  <el-dialog :title="title"  :visible.sync="visibile" width="90%"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false" :before-close="handleClose">
    <div class="main-head">
      <ever-form2
        :schema="querySchema" 
        v-model="queryObj"
        @query="query"
        ref="form"
        class="package-sale"
        :info="true"
        :labelWidth="140"
        label-position="right"
        :nosubmit="true"
        :inline="true">
        <template slot="type">
          <el-select v-model="queryObj.type">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="date">
          <el-date-picker
            v-model="queryObj.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
      </ever-form2>
    </div>
    <div ref="historyEc" class="historyEc" style="height:280px;width:100%;"></div>
    </el-dialog>
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/line') 
export default {
  props:['dialogVisibile', 'type'],
  data () {
    let schema = [
      {
        name: 'type',
        label: '分类',
        comp: 'custom'
      },
      {
        name: 'date',
        label: '时间范围',
        comp: 'custom'
      },
      {
        name: 'btn',
        label: '',
        comp: 'custom'
      },
      {
        label: '',
        name: 'rightbtn',
        comp: 'custom'
      }
    ]
    let obj = this.createObjFromSchema(schema)
    obj.date = ['', '']
    return {
      visibile: false,
      title: '',
      querySchema: schema,
      queryObj: obj,
      x: [],
      y: [],
      data: [],
      now: +new Date('2018-01-01 12:00:00'),
      oneDay: 30 * 1000,
      value: Math.random() * 1000,
      chart: null,
      options: [
        {id: '1', name: '输入电流'},
        {id: '2', name: '输入电压'},
        {id: '3', name: '有功功率'},
        {id: '4', name: '功率因数'},
        {id: '5', name: '温度'},
        {id: '6', name: '电源频率'},
        {id: '7', name: '电能计量'}
      ]
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
    query () {
      console.log(this.queryObj.date)
    },
    clearInfo () {
      this.queryObj.type = ''
      this.queryObj.date =['', '']
      this.x = []
      this.y = []
    },
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
      console.log(typeof this.type, this.options.find(item => item.id === this.type))
      this.title = (this.options.find(item => item.id === this.type)||{name:''}).name+ '历史数据'
      for (var i = 0; i < 1000; i++) {
        this.data.push(this.randomData());
      }
      this.chart = echarts.init(this.$refs.historyEc)
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
      this.chart.setOption(option, true)
    }
  },
  watch: {
    'dialogVisibile': {
      handler: function (val) {
        if (val) {
          this.$nextTick(_ => {
            this.init();
            this.queryObj.type = this.type;
          }) 
          this.visibile = true
        } else {
          this.visibile = false
          this.clearInfo()
        }
        
      },
      immediate: true
    },
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


