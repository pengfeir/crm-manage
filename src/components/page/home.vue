
<template>
  <div>
    <el-row style="background-color:#fff;padding-top:10px;">
      <el-col :span="3">
        <div class="echart-content">
          <div class="vice-title">概览</div>
          <div class="vice-content">
            <div class="module">
              <div>在线设备</div>
              <div class="content">12</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
             <div class="module">
              <div>今日新增在线</div>
              <div class="content">{{assetNum.add}}</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
             <div class="module">
              <div>昨日活跃</div>
              <div class="content">12</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div class="module">
              <div>累计在线</div>
              <div class="content">5</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div class="module">
              <div>设备维修</div>
              <div class="content">5</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div class="module">
              <div>设备保养</div>
              <div class="content">5</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div class="module">
              <div>设备质控</div>
              <div class="content">5</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div class="module">
              <div>设备投诉</div>
              <div class="content">5</div>
              <div class="company"><span>台</span></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="background-color:#fff;padding-top:10px;" :span="24">
        <span class="title title-sty">设备趋势</span>
        <div ref="historyEc" class="historyEc" style="height:280px;width:100%;"></div>
      </el-col>
    </el-row>
    <el-row style="background-color:#fff;padding-top:10px;">
      <el-col :span="8">
        <div class="echart-content">
          <div class="vice-title">设备状态</div>
          <div class="vice-content">
            <div ref="failureEc" class="failureEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="placeEc" class="placeEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echart-content">
         <div class="vice-title no-border"></div>
          <div class="vice-content">
            <div ref="complaintEc" class="complaintEc" style="height:500px;width:100%;"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="background-color:#fff;padding-top:10px;" :span="24">
        <span class="title title-sty">位置分布</span>
        <div ref="roomEc" class="roomEc" style="height:800px;width:100%;"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import api from "@/api/api";
import moment from 'moment';
require('echarts/lib/chart/line') 
require('echarts/lib/chart/pie')
require('echarts/lib/chart/tree')
export default {
  data () {
    return {
      assetNum: {
        online: 0,
        add: 0
      },
      assetInfo: {
        x: [],
        y: [],
        data: [],
        now: +new Date(),
        oneDay: 24 * 60 * 60 * 1000,
        value: Math.random() * 20,
        chart: null
      },
      assetfailureInfo: { // 报修设备
        chart: null,
        text: '报修设备',
        titleData: ['未知','已经上报','待维修','正在维修','完成','取消'],
        name: '维修状态',
        data: [
          {value:1, name:'未知'},
          {value:3, name:'已经上报'},
          {value:2, name:'待维修'},
          {value:4, name:'正在维修'},
          {value:5, name:'完成'},
          {value:1, name:'取消'}
        ]
      },
      assetPlaceInfo: { // 设备分布
        chart: null,
        text: '设备分布',
        titleData: ['内科(5台)','外科(8台)','妇产科(6台)','心理科(4台)','中医科(12台)','急诊科(6台)'],
        name: '设备分布',
        data: [
          {value: 5, name: '内科(5台)'},
          {value: 8, name: '外科(8台)'},
          {value: 6, name: '妇产科(6台)'},
          {value: 4, name: '心理科(4台)'},
          {value: 12, name: '中医科(12台)'},
          {value: 6, name: '急诊科(6台)'}
        ]
      },
      complaintInfo: {
        chart: null,
        text: '设备投诉',
        titleData: ['非常严重(5台)','严重(8台)','一般(6台)','较轻(4台)','很轻(12台)'],
        name: '设备投诉',
        data: [
          {value: 5, name: '非常严重(5台)'},
          {value: 8, name: '严重(8台)'},
          {value: 6, name: '一般(6台)'},
          {value: 4, name: '较轻(4台)'},
          {value: 12, name: '很轻(12台)'}
        ]
      },
      roomInfo: { // 房间分布
        chart: null
      }
    }
  },
  created () {
    this.$nextTick(_ => {
      this.initEchart()
      this.failureInit()
      this.assetPlaceInit()
      this.complaintInit()
      this.roomInit()
      this.initAssetNum()
    }) 
  },
  methods: {
    initAssetNum () {
      // 获取今日新增设备数
      let curDate = moment(new Date().getTime()).format('YYYY-MM-DD')
      api.countByDate({beginDate: curDate, endDate: curDate}).then(rs => {
        if (rs.code === 200) {
          this.assetNum.add = rs.data;
        } else {
          this.assetNum.add = '--';
        }
      })
    },
    randomData() {
      this.assetInfo.now = new Date(+this.assetInfo.now - this.assetInfo.oneDay);
      this.assetInfo.value = this.assetInfo.value + Math.random() * 2;
      let minutes = (this.assetInfo.now.getMinutes() < 10 ? '0' : '') + this.assetInfo.now.getMinutes()
      let seconds = (this.assetInfo.now.getSeconds() < 10 ? '0' : '') + this.assetInfo.now.getSeconds()
      this.assetInfo.x.unshift(this.assetInfo.now.getFullYear()+'-'+(this.assetInfo.now.getMonth()+1) +'-'+ this.assetInfo.now.getDate()),
      this.assetInfo.y.push(Math.round(this.assetInfo.value))
    },
    initEchart () {
      for (var i = 0; i < 20; i++) {
        this.assetInfo.data.push(this.randomData());
      }
      this.assetInfo.chart = echarts.init(this.$refs.historyEc);
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
          data: this.assetInfo.x,
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
          data: this.assetInfo.y,
          large: true
        }]
      }
      this.assetInfo.chart.setOption(option, true)
    },
    initOptions (obj) {
      var option = {
        title : {
          text: obj.text,
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} :  ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: obj.titleData
        },
        series : [
          {
            name: obj.name,
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: obj.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      return option
    },
    failureInit () {
      this.assetfailureInfo.chart = echarts.init(this.$refs.failureEc);
      var option = this.initOptions(this.assetfailureInfo);
      this.assetfailureInfo.chart.setOption(option, true);
    },
    assetPlaceInit () {
      this.assetPlaceInfo.chart = echarts.init(this.$refs.placeEc);
      var option = this.initOptions(this.assetPlaceInfo);
      this.assetPlaceInfo.chart.setOption(option, true);
    },
    complaintInit () {
      this.complaintInfo.chart = echarts.init(this.$refs.complaintEc);
      var option = this.initOptions(this.complaintInfo);
      this.complaintInfo.chart.setOption(option, true);
    },
    roomInit () {
      this.roomInfo.chart = echarts.init(this.$refs.roomEc);
      let data = {
        name: '机构1',
        children: [
          {name: '东区',children:[
            {name: '1号楼',children: [
              {name: '1层', children: [
                {name: '101室（内科）'},
                {name: '102室（内科）'},
                {name: '103室（内科）'}
              ]},
              {name: '2层', children: [
                {name: '201室（内科）'},
                {name: '202室（内科）'},
                {name: '203室（妇产科）'}
              ]},
              {name: '3层', children: [
                {name: '301室（妇产科）'},
                {name: '302室（妇产科）'},
                {name: '303室（妇产科）'}
              ]}
            ]},
            {name: '2号楼',children: [
              {name: '1层', children: [
                {name: '101室（内科）'},
                {name: '102室（内科）'},
                {name: '103室（内科）'}
              ]},
              {name: '2层', children: [
                {name: '201室（内科）'},
                {name: '202室（内科）'},
                {name: '203室（妇产科）'}
              ]},
              {name: '3层', children: [
                {name: '301室（妇产科）'},
                {name: '302室（妇产科）'},
                {name: '303室（妇产科）'}
              ]}
            ]}
          ]},
          {name: '南区',children:[]},
          {name: '西区',children:[]},
          {name: '北区',children:[]}
        ]
      }
      console.log(data)
      let options = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 14,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 14
              }
            },
            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      this.roomInfo.chart.setOption(options)
    }
  },
  watch: {

  }
}
</script>
<style lang="less" scoped>
  .el-row {
    margin: 15px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  }
  .module-head {
    background-color: #fff;
    height:50px;
    line-height:50px;
  }
  .title {
    border-left:3px solid blue;
    padding-left:10px;
    font-size:18px;
  }
  .title-sty {
    margin: 10px 0;
  }
  .module {
    background-color: #fff;
    border-right: 1px solid #eee;
    height:150px; 
    padding:20px;
    .content {
      padding-top: 10px;
      font-size: 60px;
      text-align: center;
    }
    .company {
      padding-right: 10%;
      text-align: right;
    }
  }
  .echart-content {
    .vice-title {
      height:25px;
      line-height: 25px;
      border-left: 3px solid blue;
      padding-left: 10px;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .no-border {
      border: none;
    }
    .vice-content {
      border-right: 1px solid #eee;
    }
  }
</style>

