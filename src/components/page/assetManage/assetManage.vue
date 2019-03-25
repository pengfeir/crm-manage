<template>
  <div>
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="popShow = true">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading.body="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" fixed>
      </el-table-column>
      <el-table-column prop="step" label="设备采购状态" width="150" fixed>
      </el-table-column>
      <el-table-column prop="no" label="资产编号">
      </el-table-column>
      <el-table-column prop="dept" label="临床科室">
      </el-table-column>
      <el-table-column prop="kind" label="设备类别">
      </el-table-column>
      <el-table-column prop="model" label="设备型号">
      </el-table-column>
      <el-table-column prop="sn" label="SN序列号" width="150">
      </el-table-column>
      <el-table-column prop="prodDate" label="生产日期" width="180">
      </el-table-column>
      <el-table-column prop="vender" label="厂家">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="setupStartAt" label="装机开始时间" width="180">
      </el-table-column>
      <el-table-column prop="setupEndAt" label="装机结束时间" width="180">
      </el-table-column>
      <el-table-column prop="acceptStatus" label="验收状态">
      </el-table-column>
      <el-table-column prop="appendant" label="配套耗材">
      </el-table-column>
      <el-table-column prop="isDedicatedAppendant" label="配套耗材是否专机专用"  width="160">
      </el-table-column>
      <el-table-column prop="alternativeAppendant" label="耗材替代品" width="100">
      </el-table-column>
      <el-table-column prop="contractUrlList" label="采购合同照片的地址列表" width="180">
      </el-table-column>
      <el-table-column prop="receiptUrlList" label="票据照片的地址列表" width="150">
      </el-table-column>
      <el-table-column prop="manualUrlList" label="用户手册照片地址列表" width="160">
      </el-table-column>
      <el-table-column prop="extra" label="其他拓展信息" width="150">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
    <el-dialog :title="popTitle" :visible.sync="popShow"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
      <ever-form2
        :schema="infoQuerySchema" 
        v-model="infoQueryObj"
        ref="form"
        class="package-sale"
        :info="true"
        labelWidth="80px"
        label-position="right">
      </ever-form2>
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
    label: "临床科室",
    comp: "el-input"
  },
  {
    name: "kind",
    label: "设备类型"
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
    name: 'orgName',
    label: '机构名称'
  },
  {
    name: 'contacts',
    label: '联系人'
  },
  {
    name: 'contactNumber',
    label: '联系电话'
  },
  {
    name: 'address',
    label: '地址'
  }
]
export default {
  mixins: [list],
  data() {
    var obj = this.createObjFromSchema(schema);
    var infoObj = this.createObjFromSchema(infoSchema)
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "assetList",
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      popShow:false,
      popTitle:'新建'
    };
  },
  methods: {
    addAsset() {},
    prev(){

    }
  },
  mounted() {},
  watch: {}
};
</script>

