<template>
  <div v-loading.body="loading">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" fixed>
      </el-table-column>
      <el-table-column prop="acceptStatus" label="验收状态" fixed>
      </el-table-column>
      <el-table-column prop="alternativeAppendant" label="耗材替代品" width="100">
      </el-table-column>
      <el-table-column prop="appendant" label="配套耗材">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="contractUrlList" label="采购合同照片的地址列表" width="180">
      </el-table-column>
      <el-table-column prop="dept" label="临床科室">
      </el-table-column>
      <el-table-column prop="extra" label="其他拓展信息" width="150">
      </el-table-column>
      <el-table-column prop="isDedicatedAppendant" label="配套耗材是否专机专用" width="160">
        <template slot-scope="scope">
          {{scope.row.isDedicatedAppendant | getAppendant}}
        </template>
      </el-table-column>
      <el-table-column prop="kind" label="设备类别">
      </el-table-column>
      <el-table-column prop="manualUrlList" label="用户手册照片地址列表" width="160">
      </el-table-column>
      <el-table-column prop="model" label="设备型号">
      </el-table-column>
      <el-table-column prop="no" label="资产编号">
      </el-table-column>
      <el-table-column prop="prodDate" label="生产日期" width="180">
      </el-table-column>
      <el-table-column prop="receiptUrlList" label="票据照片的地址列表" width="150">
      </el-table-column>
      <el-table-column prop="setupStartAt" label="装机开始时间" width="180">
      </el-table-column>
      <el-table-column prop="setupEndAt" label="装机结束时间" width="180">
      </el-table-column>
      <el-table-column prop="setupStepName" label="设备装机状态" width="180">
      </el-table-column>
      <el-table-column prop="sn" label="SN序列号" width="150">
      </el-table-column>
      <el-table-column prop="vender" label="厂家">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="mtime" label="更新时间" width="150">
      </el-table-column>
      <el-table-column prop="name" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
    </el-pagination>
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
    name: "dept",
    label: "临床科室"
  },
  {
    name: "kind",
    label: "设备类别"
  },
  {
    label: "设备型号",
    name: "model"
  },
  {
    label: "资产编号",
    name: "no"
  },
  {
    label: "SN序列号",
    name: "sn"
  },
  {
    label: "厂家",
    name: "vender"
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
    name: "acceptStatus",
    label: "验收状态"
  },
  {
    name: "alternativeAppendant",
    label: "耗材替代品"
  },
  {
    name: "appendant",
    label: "配套耗材"
  },
  {
    name: "contact",
    label: "联系方式"
  },
  {
    name: "contractUrlList",
    label: "采购合同照片的地址列表"
  },
  {
    name: "dept",
    label: "临床科室"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  },
  {
    name: "isDedicatedAppendant",
    label: "配套耗材是否专机专用",
    comp: "el-select",
    props: {
      options: [
        {
          id: "0",
          name: "否"
        },
        {
          id: "1",
          name: "是"
        }
      ]
    }
  },
  {
    name: "kind",
    label: "设备类别"
  },
  {
    name: "manualUrlList",
    label: "用户手册照片地址列表"
  },
  {
    name: "model",
    label: "设备型号"
  },
  {
    name: "no",
    label: "资产编号"
  },
  {
    name: "prodDate",
    label: "生产日期",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "receiptUrlList",
    label: "票据照片的地址列表"
  },
  {
    name: "setupStartAt",
    label: "装机开始时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "setupEndAt",
    label: "装机结束时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "setupStep",
    label: "设备装机状态",
    comp: "el-select",
    props: {
      options: [
        {
          id: "unknown",
          name: "未知"
        },
        {
          id: "delivered",
          name: "已出库"
        },
        {
          id: "to_setup",
          name: "待安装"
        },
        {
          id: "setup",
          name: "已安装"
        },
        {
          id: "training",
          name: "已培训"
        },
        {
          id: "accepted",
          name: "已验收"
        }
      ]
    }
  },
  {
    name: "sn",
    label: "SN序列号"
  },
  {
    name: "vender",
    label: "厂家"
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
      listApiName: "assetList",
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
      this.popTitle = "新建资产";
    },
    prev(id) {
      let url = "createAsset";
      if (this.detailId) {
        url = "updateAsset";
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
      this.popTitle = "编辑资产";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.popShow = true;
    },
    delInfo(row) {
      this.$confirm("确定要删除该设备信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return api.deleteAsset({ id: row.id });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.query();
        });
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


