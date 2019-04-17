<template>
  <div class="layout_inner">
    <el-button @click="go" class="onily-btn-style"><i class="el-icon-arrow-left"></i></el-button>
    <span>{{'设备数据监测'}}</span>
    <div class="main-head">
      <el-row>
        <!-- <el-col :span="20">
          设备名称：<span class="col-title">{{'X光机'}}</span>
          设备型号：<span class="col-title">{{'LT-480'}}</span>
          设备SN序列号：<span class="col-title">{{'SERT245-WWER-EER$%'}}</span>
          设备状态：<span class="col-title"
            :class="{
              red:info.assetStatus == 10,
              green:info.assetStatus == 30,
              blur:info.assetStatus == 20,
              yellow: info.assetStatus == 40
            }"
            >{{info.assetStatus | filterAssetStatus}}</span>
        </el-col> -->
        <el-col :span="24">
          <div class="el-form" style="border:none;text-align:right;">
            <el-button @click="exportExcel">导出</el-button>
            <el-button type="primary" @click="seeDetails">数据概览</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-contant">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" height="100%" border stripe>
          <el-table-column type="index" width="50" label="序号" fixed>
          </el-table-column>
          <el-table-column prop="temperature" label="设备名称" width="100" fixed>
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
export default {
  mixins: [list],
  data() {
    return {
      api,
      tableData: [],
      listApiName: "assetMetricsList",
      info: {

      }
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
    go () {
      this.$router.go(-1);
    },
    onChange () {
      this.queryObj.value = ''
    },
    seeDetails (row) {
      this.$router.push('/page/assetRunSee?id=' + row.macAddr)
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
  .layout_inner {
    padding: 10px !important;
  }
  // 待机
  .green {
    color:#00FF00;
  }
  // 关机
  .red {
    color: red;
  }
  // 激活
  .yellow {
    color: yellow;
  }
  // 开机
  .blur {
    color: blue;
  }
  .col-title {
    margin-right:20px;
  }
  .onily-btn-style {
    padding:5px;
    margin-bottom: 20px;
    margin-right: 10px;
  }
</style>