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
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="assetId" label="资产名称">
            </el-table-column>
            <el-table-column prop="descr" label="事件描述">
            </el-table-column>
            <el-table-column prop="levelName" label="严重类别" width="150">
            </el-table-column>
            <el-table-column prop="urlList" label="投诉资料的地址列表" width="180">
            </el-table-column>
            <el-table-column prop="extra" label="其他扩展信息" width="150">
            </el-table-column>
            <el-table-column prop="mtime" label="更新时间">
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间">
            </el-table-column>
            <el-table-column prop="userId" label="创建者ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="操作"  width="150">
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
    name: "assetId",
    label: "资产名称",
    comp:'assets-select'
  },
  {
    label: "严重类别",
    name: "level",
    comp: "el-select",
    props: {
      options: [
        {
          id: "10",
          name: "非常严重"
        },
        {
          id: "20",
          name: "严重"
        },
        {
          id: "30",
          name: "一般"
        },
        {
          id: "40",
          name: "较轻"
        },
        {
          id: "50",
          name: "很轻"
        }
      ]
    }
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
    name: "assetId",
    label: "资产名称",
    comp:'assets-select'
  },
  {
    name: "dept",
    label: "事件发生的科室"
  },
  {
    name: "descr",
    label: "事件描述"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  },
  {
    name: "level",
    label: "严重类别",
     comp: "el-select",
    props: {
      options: [
        {
          id: "10",
          name: "非常严重"
        },
        {
          id: "20",
          name: "严重"
        },
        {
          id: "30",
          name: "一般"
        },
        {
          id: "40",
          name: "较轻"
        },
        {
          id: "50",
          name: "很轻"
        }
      ]
    }
  },
  {
    name: "urlList",
    label: "投诉资料的地址列表"
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
      listApiName: "complaintList",
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
      this.popTitle = "新建投诉";
    },
    prev(id) {
      let url = "createComplaint";
      if (this.detailId) {
        url = "updateComplaint";
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
      this.popTitle = "编辑投诉";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.popShow = true;
    },
    delInfo(row) {
      this.$confirm("确定要删除该投诉记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return api.deleteComplaint({ id: row.id });
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


