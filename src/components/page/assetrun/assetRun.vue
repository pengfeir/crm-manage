<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="keys">
            <el-row style="margin-left:20px;">
              <el-col :span="12">
                <el-select v-model="queryObj.keys" @change="onChange" style="width:150px;">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="queryObj.value"></el-input>  
              </el-col>
            </el-row>
        </template>
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="seeEcharts">数据概览</el-button>
        </template>
      </ever-form2>
    </div>
    <div class="table-contant">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" border stripe>
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="temperature" label="设备名称" width="100">
          </el-table-column>
          <el-table-column prop="temperature" label="设备型号" width="100">
          </el-table-column>
          <el-table-column prop="temperature" label="设备SN序列号" width="120">
          </el-table-column>
          <el-table-column prop="assetStatus" label="设备状态" width="100">
              <template slot-scope="scope">
                  {{scope.row.assetStatus | filterAssetStatus}}
              </template>
          </el-table-column>
          <el-table-column prop="temperature" label="温度" width="50">
          </el-table-column>
          <el-table-column prop="energy" label="电能计量" width="80">
          </el-table-column>
          <el-table-column prop="inputI" label="输入电流" width="80">
          </el-table-column>
          <el-table-column prop="inputV" label="输入电压" width="80">
          </el-table-column>
          <el-table-column prop="macAddr" width="130" label="设备的MAC地址">
          </el-table-column>
          <el-table-column prop="pos1" label="位置信息1" width="130">
          </el-table-column>
          <el-table-column prop="pos2" label="位置信息2" width="130">
          </el-table-column>
          <el-table-column prop="pos3" label="位置信息3" width="130">
          </el-table-column>
          <el-table-column prop="powerFactor" label="功率因数" width="80">
          </el-table-column>
          <el-table-column prop="powerHz" label="电源频率" width="80">
          </el-table-column>
          <el-table-column prop="realPower" label="有功功率" width="80">
          </el-table-column>
          <el-table-column prop="mtime" label="更新时间" width="180">
          </el-table-column>
          <el-table-column prop="ctime" label="创建时间"  width="180">
          </el-table-column>
          <el-table-column prop="extra" label="其他扩展信息" width="150">
          </el-table-column>
          <!-- 
          <el-table-column prop="userId" label="创建者ID" width="180">
          </el-table-column> -->
          <el-table-column prop="name" align="center" label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-search" @click="seeDetails(scope.row)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table id="excelTable" :data="tableData" style="width: 100%" height="100%" border stripe>
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="temperature" label="设备名称" width="100">
          </el-table-column>
          <el-table-column prop="temperature" label="设备型号" width="100">
          </el-table-column>
          <el-table-column prop="temperature" label="设备SN序列号" width="120">
          </el-table-column>
          <el-table-column prop="assetStatus" label="设备状态" width="100">
              <template slot-scope="scope">
                  {{scope.row.assetStatus | filterAssetStatus}}
              </template>
          </el-table-column>
          <el-table-column prop="temperature" label="温度" width="50">
          </el-table-column>
          <el-table-column prop="energy" label="电能计量" width="80">
          </el-table-column>
          <el-table-column prop="inputI" label="输入电流" width="80">
          </el-table-column>
          <el-table-column prop="inputV" label="输入电压" width="80">
          </el-table-column>
          <el-table-column prop="macAddr" width="130" label="设备的MAC地址">
          </el-table-column>
          <el-table-column prop="pos1" label="位置信息1" width="130">
          </el-table-column>
          <el-table-column prop="pos2" label="位置信息2" width="130">
          </el-table-column>
          <el-table-column prop="pos3" label="位置信息3" width="130">
          </el-table-column>
          <el-table-column prop="powerFactor" label="功率因数" width="80">
          </el-table-column>
          <el-table-column prop="powerHz" label="电源频率" width="80">
          </el-table-column>
          <el-table-column prop="realPower" label="有功功率" width="80">
          </el-table-column>
          <el-table-column prop="mtime" label="更新时间" width="180">
          </el-table-column>
          <el-table-column prop="ctime" label="创建时间"  width="180">
          </el-table-column>
          <el-table-column prop="extra" label="其他扩展信息" width="150">
          </el-table-column>
          <el-table-column prop="userId" label="创建者ID" width="180">
          </el-table-column>
      </el-table>
    </div>
    <!-- <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import list from "@/plugins/list";
import api from "@/api/api";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
let schema = [
  {
    name: "assetStatus",
    label: "设备状态",
    comp: "el-select",
    props: {
      options: [
        {
          id: "10",
          name: "关机"
        },
        {
          id: "20",
          name: "开机"
        },
        {
          id: "30",
          name: "待机"
        },
        {
          id: "40",
          name: "激活"
        }
      ]
    }
  },
  {
    name: "keys",
    label: "",
    comp: 'custom'
  },
  {
    name: "btn",
    label: "",
    comp: "custom"
  },
  {
    label: "",
    name: "rightbtn",
    comp: "custom"
  }
];
export default {
  mixins: [list],
  data() {
    var obj = this.createObjFromSchema(schema);
    obj.value = '';
    obj.keys = 1;
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      options: [
        {id: 1, name: 'SN序列号'},
        {id: 2, name: 'MAC地址'},
        {id: 3, name: '资产编号'}
      ],
      listApiName: "assetMetricsList"
    };
  },
  methods: {
    exportExcel () {
      /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备监测.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
    },
    onChange () {
      this.queryObj.value = ''
    },
    seeDetails (row) {
      this.$router.push('/page/assetdetail?id=' + row.macAddr)
    },
    seeEcharts () {
      this.$router.push('/page/home')
    }
  },
  created () {
    this.$nextTick(_ => {
      let height = document.documentElement.clientHeight;
      document.querySelector('.table-contant').style.height = height - 250 + 'px';
    })
    window.onresize = () => {
      if (document.querySelector('.table-contant')) {
        let height = document.documentElement.clientHeight;
        document.querySelector('.table-contant').style.height = height - 250 + 'px';
      }
    }
  },
  watch: {
  }
};
</script>
<style lang="less" scoped>
</style>


