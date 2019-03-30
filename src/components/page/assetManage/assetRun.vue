<template>
    <div class="layout_inner">
        <div class="main-head">
            <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
                <template slot="btn">
                    <el-button type="primary" @click="query">查询</el-button>
                </template>
                <template slot="rightbtn">
                </template>
            </ever-form2>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
            <el-table-column type="index" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column prop="assetStatus" label="资产状态" fixed>
                <template slot-scope="scope">
                    {{scope.row.assetStatus | filterAssetStatus}}
                </template>
            </el-table-column>
            <el-table-column prop="temperature" label="温度" width="180">
            </el-table-column>
            <el-table-column prop="energy" label="电能计量">
            </el-table-column>
            <el-table-column prop="inputI" label="输入电流" width="180">
            </el-table-column>
            <el-table-column prop="inputV" label="输入电压" width="150">
            </el-table-column>
            <el-table-column prop="macAddr" label="设备的MAC地址" width="180">
            </el-table-column>
            <el-table-column prop="pos1" label="位置信息1">
            </el-table-column>
            <el-table-column prop="pos2" label="位置信息2">
            </el-table-column>
            <el-table-column prop="pos3" label="位置信息3">
            </el-table-column>
            <el-table-column prop="powerFactor" label="功率因数">
            </el-table-column>
            <el-table-column prop="powerHz" label="电源频率">
            </el-table-column>
            <el-table-column prop="realPower" label="有功功率">
            </el-table-column>
            <el-table-column prop="mtime" label="更新时间" width="180">
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间"  width="180">
            </el-table-column>
            <el-table-column prop="extra" label="其他扩展信息" width="150">
            </el-table-column>
            <el-table-column prop="userId" label="创建者ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="seeDetails(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
          </el-pagination>
        </div>
        <el-dialog :title="popTitle" :visible.sync="popShow" class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
            <div class="scroll">
                <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right">
                    <template slot="default">
                        <div></div>
                    </template>
                </ever-form2>
            </div>
            <div class="log-btn-container">
                <el-button type="primary" @click="prev">保存</el-button>
                <el-button @click="popShow = false">取消</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import list from "@/plugins/list";
import api from "@/api/api";
let schema = [
  {
    name: "assetStatus",
    label: "资产状态",
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
let infoSchema = [
  {
    name: "assetStatus",
    label: "资产状态",
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
    name: "energy",
    label: "电能计量"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  },
  {
    name: "inputI",
    label: "输入电流"
  },
  {
    name: "inputV",
    label: "输入电压"
  },
  {
    name: "macAddr",
    label: "设备的MAC地址"
  },
  {
    name: "pos1",
    label: "位置信息1"
  },
  {
    name: "pos2",
    label: "位置信息2"
  },
  {
    name: "pos3",
    label: "位置信息3"
  },
  {
    name: "powerFactor",
    label: "功率因数"
  },
  {
    name: "powerHz",
    label: "电源频率"
  },
  {
    name: "realPower",
    label: "有功功率"
  },
  {
    name: "temperature",
    label: "温度"
  }
];
export default {
  mixins: [list],
  data() {
    var obj = this.createObjFromSchema(schema);
    var infoObj = this.createObjFromSchema(infoSchema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "assetMetricsList",
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      popShow: false,
      popTitle: "新建",
      detailId: ""
    };
  },
  methods: {
    addAsset() {
      Object.keys(this.infoQueryObj).map(key => {
        this.infoQueryObj[key] = "";
      });
      this.popShow = true;
      this.detailId = "";
      this.popTitle = "新建资产运行";
    },
    prev(id) {
      let url = "createAssetMetrics";
      if (this.detailId) {
        url = "updateAssetMetrics";
      }
      let tips = this.detailId ? "更新" : "创建";
      let params = Object.assign({}, this.infoQueryObj);
      api[url](params).then(rs => {
        this.popShow = false;
        if (rs.code === 200) {
          this.query();
          this.$messageTips(this, "success", tips + "成功");
        } else {
          this.$messageTips(this, "error", tips + "失败");
        }
      });
    },
    emitInfo(row) {
      this.popTitle = "编辑资产运行";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.popShow = true;
    },
    delInfo(row) {
      this.$confirm("确定要删除该资产运行?记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.deleteAssetMetrics({ id: row.id });
            if (data && data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.query();
            }
          } catch (err) {
            console.log(err);
          }
        })
        .then(() => {});
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


