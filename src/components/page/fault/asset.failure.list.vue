<template>
  <div class="layout_inner">
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
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      border
      stripe>
      <el-table-column
        type="index"
        width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="assetName"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="发生科室">
      </el-table-column>
      <el-table-column
        prop="kind"
        label="故障类别">
      </el-table-column>
      <el-table-column
        prop="offerPrice"
        label="维修报价">
        <template slot-scope="scope">
          {{scope.row.offerPrice | formatToFinacial}}
        </template>
      </el-table-column>
      <el-table-column
        prop="faultUrlList"
        label="故障照片"
        width="150">
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.faultUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractUrlList"
        label="维修合同照片"
        width="150"
      >
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.contractUrlList"
          ></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="receiptUrlList"
        label="票据照片"
        width="150"
      >
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.receiptUrlList"
          ></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="fixStep"
        width="100"
        align="center"
        label="维修进度">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fixStep" class="table-select" @change="val => {fixStepChange(val, scope.row)}" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-search"
            @click="seeDetail(scope.row)"
          >详情</el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="emitInfo(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            class="delete-btn-color"
            icon="el-icon-delete"
            @click="delInfo(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="20"
        :layout="layout"
        :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table
      id="excelTable"
      :data="tableData"
      style="width: 100%"
      border
      stripe>
      <el-table-column
        type="index"
        width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="assetName"
        label="设备名称"
      >
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系方式"
      >
      </el-table-column>
      <el-table-column
        prop="dept"
        label="发生科室">
      </el-table-column>
      <el-table-column
        prop="faultAt"
        label="故障发生时间">
      </el-table-column>
      <el-table-column
        prop="fixStep"
        label="维修进度">
        <template slot-scope="scope">
          {{scope.row.fixStep | stepStatus}}
        </template>
      </el-table-column>
      <el-table-column
        prop="kind"
        label="故障类别">
      </el-table-column>
      <el-table-column
        prop="offerPrice"
        label="维修报价">
        <template slot-scope="scope">
          {{scope.row.offerPrice | formatToFinacial}}
        </template>
      </el-table-column>
      <el-table-column
        prop="faultUrlList"
        label="故障照片"
        width="150">
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.faultUrlList"
          ></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractUrlList"
        label="维修合同照片"
        width="150">
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.contractUrlList"
          ></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="receiptUrlList"
        label="票据照片"
        width="150">
        <template slot-scope="scope">
          <fileshow
            :type="'img'"
            :tailor="true"
            :isNoShowBtn="true"
            :fileurlList="scope.row.receiptUrlList"
          ></fileshow>
        </template>
      </el-table-column>
      <el-table-column
        prop="reporter"
        label="上报人信息"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="vender"
        label="服务提供方"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="ctime"
        label="创建时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mtime"
        label="更新时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="extra"
        label="其他扩展信息"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="机构"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="userId"
        label="创建者ID"
        width="180"
      >
      </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="'详情'"
      :visible.sync="popShow"
      class="ui_dialog_02 detail-log carditem"
      width="80%"
      :close-on-click-modal="false"
      :append-to-body="true"
      >
      <div>
        <el-row>
          <el-col
            v-for="item in arr"
            :key="item.id"
            :span="item.id == 'contractUrlList' || item.id == 'receiptUrlList' || item.id == 'manualUrlList'?24:6">
            <div v-if="item.id == 'contractUrlList' || item.id == 'receiptUrlList' || item.id == 'manualUrlList'">
              <label>{{item.label}}</label>: <span>
                <fileshow
                  class="maxsize"
                  :type="'img'"
                  :fileurlList="item.value"
                  :isNoShowBtn="false"
                  :tailor="false"
                ></fileshow>
              </span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>: <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else-if="item.id === 'offerPrice'">
              <label>{{item.label}}</label>: <span>{{item.value | formatToFinacial}}</span>
            </div>
            <div v-else>
              <label>{{item.label}}</label>: <span>{{item.value}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="log-btn-container">
        <el-button @click="popShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from "@/plugins/list";
import token from "@/plugins/getUploadToken";
import api from "@/api/api";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
let options = [
  {
    id: "unknown",
    name: "未知"
  },
  {
    id: "reported",
    name: "已上报"
  },
  {
    id: "todo",
    name: "待维修"
  },
  {
    id: "doing",
    name: "正在维修"
  },
  {
    id: "done",
    name: "完成"
  },
  {
    id: "abort",
    name: "取消"
  }
];
let schema = [
  {
    name: "assetId",
    label: "设备名称",
    comp: "assets-select"
  },
  {
    name: "dept",
    label: "故障科室"
  },
  {
    name: "kind",
    label: "故障类别"
  },
  {
    name: "fixStep",
    label: "维修进度",
    comp: "el-select",
    props: {
      options: options
    }
  },
  {
    label: "上报人信息",
    name: "reporter"
  },
  {
    label: "服务提供方",
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
let arr = [
  {
    id: "assetName",
    label: "设备名称",
    value: ""
  },
  {
    id: "contact",
    label: "联系方式",
    value: ""
  },
  {
    id: "dept",
    label: "故障发生的科室",
    value: ""
  },
  {
    id: "faultAt",
    label: "故障发生时间",
    value: ""
  },
  {
    id: "fixStep",
    label: "维修进度",
    value: ""
  },
  {
    id: "kind",
    label: "故障类别",
    value: ""
  },
  {
    id: "offerPrice",
    label: "维修报价",
    value: ""
  },
  {
    id: "reporter",
    label: "故障上报人信息(姓名电话)",
    value: ""
  },
  {
    id: "vender",
    label: "服务提供方",
    value: ""
  },
  {
    id: "extra",
    label: "其他扩展信息",
    value: ""
  },
  {
    id: "descr",
    label: "故障描述",
    value: ""
  },
  {
    id: "contractUrlList",
    label: "维修合同照片",
    value: ""
  },
  {
    id: "faultUrlList",
    label: "故障照片",
    value: ""
  },
  {
    id: "receiptUrlList",
    label: "票据照片",
    value: ""
  }
];
export default {
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "faultList",
      popShow: false,
      arr,
      options
    };
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备维修.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    fixStepChange (val, row) {
      console.log(val, row)
    },
    seeDetail(row) {
      arr.forEach(item => {
        item.value = row[item.id] || "";
      });
      this.popShow = true;
    },
    addAsset() {
      this.$router.push("/page/assetfailuradd");
    },
    emitInfo(row) {
      this.$router.push("/page/assetfailuradd?id=" + row.id);
    },
    delInfo(row) {
      this.$confirm("确定要删除该设备故障记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.deleteFault({ id: row.id });
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
.package-sale /deep/ .el-form-item__label {
  width: 100px;
}
.package-sale /deep/ .el-form-item:nth-child(5) .el-form-item__content {
  width: 195px;
}
.table-select /deep/ .el-input__icon {
  line-height: 32px;
  display: none !important;
}
.table-select /deep/ input {
  height: 26px;
  line-height: 26px;
  padding:0 !important;
  text-align: center;
}

</style>


