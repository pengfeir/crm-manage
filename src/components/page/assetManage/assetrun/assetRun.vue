<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="assetStatus" label="设备状态">
            <template slot-scope="scope">
                {{scope.row.assetStatus | filterAssetStatus}}
            </template>
        </el-table-column>
        <el-table-column prop="temperature" label="温度">
        </el-table-column>
        <el-table-column prop="energy" label="电能计量">
        </el-table-column>
        <el-table-column prop="inputI" label="输入电流">
        </el-table-column>
        <el-table-column prop="inputV" label="输入电压">
        </el-table-column>
        <el-table-column prop="macAddr" width="130" label="设备的MAC地址">
        </el-table-column>
        <!-- <el-table-column prop="pos1" label="位置信息1">
        </el-table-column>
        <el-table-column prop="pos2" label="位置信息2">
        </el-table-column>
        <el-table-column prop="pos3" label="位置信息3">
        </el-table-column> -->
        <el-table-column prop="powerFactor" label="功率因数">
        </el-table-column>
        <el-table-column prop="powerHz" label="电源频率">
        </el-table-column>
        <el-table-column prop="realPower" label="有功功率">
        </el-table-column>
        <!-- <el-table-column prop="mtime" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间"  width="180">
        </el-table-column>
        <el-table-column prop="extra" label="其他扩展信息" width="150">
        </el-table-column>
        <el-table-column prop="userId" label="创建者ID" width="180">
        </el-table-column> -->
        <el-table-column prop="name" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-search" @click="seeDetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import list from "@/plugins/list";
import api from "@/api/api";
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
    name: "macAddress",
    label: "设备的MAC地址"
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
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "assetList"// "assetMetricsList"
    };
  },
  methods: {
    seeDetails (row) {
      this.$router.push('/page/assetRunSee?id=' + row.macAddr)
    }
  }
};
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>


