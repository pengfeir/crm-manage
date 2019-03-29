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
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="assetId" label="资产名称" fixed width="100" >
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="dept" label="故障发生科室" width="150">
      </el-table-column>
      <el-table-column prop="faultAt" label="故障发生时间" width="180">
      </el-table-column>
      <el-table-column prop="fixStep" label="维修进度">
        <template slot-scope="scope">
          {{scope.row.fixStep | stepStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="kind" label="故障类别">
      </el-table-column>
      <el-table-column prop="offerPrice" label="维修报价">
      </el-table-column>
      <el-table-column prop="faultUrlList" label="故障照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.faultUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="contractUrlList" label="维修合同照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.contractUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="receiptUrlList" label="票据照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.receiptUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="reporter" label="故障上报人信息" width="180">
      </el-table-column>
      <el-table-column prop="vender" label="服务提供方" width="150">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="mtime" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="extra" label="其他扩展信息" width="150">
      </el-table-column>
      <el-table-column prop="userId" label="创建者ID" width="180">
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
    <el-dialog :title="popTitle" :visible.sync="popShow" class="ui_dialog_02 spe carditem" :close-on-click-modal="false" :before-close="handleClose">
      <div class="scroll">
        <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right">
          <template slot="faultUrlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.faultList:[]" :on-remove="handleFaultRemove" :on-success="handleFaultSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="receiptUrlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.receiptList:[]" :on-remove="handleReceiptRemove" :on-success="handleReceiptSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="contractUrlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.contractList:[]" :on-remove="handleContractRemove" :on-success="handleContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="default">
            <div></div>
          </template>
        </ever-form2>
      </div>
      <div class="log-btn-container">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from "@/plugins/list";
import token from "@/plugins/getUploadToken";
import api from "@/api/api";
let schema = [
  {
    name: "assetId",
    label: "资产名称",
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
    label: "故障上报信息",
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
let infoSchema = [
  {
    name: "assetId",
    label: "资产名称",
    comp: "assets-select"
  },
  {
    name: "contact",
    label: "联系方式"
  },
  {
    name: "dept",
    label: "故障发生的科室"
  },
  {
    name: "descr",
    label: "故障描述"
  },
  {
    name: "faultAt",
    label: "故障发生时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "fixStep",
    label: "维修进度",
    comp: "el-select",
    props: {
      options: [
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
      ]
    }
  },
  {
    name: "kind",
    label: "故障类别"
  },
  {
    name: "offerPrice",
    label: "维修报价"
  },
  {
    name: "contractUrlList",
    label: "维修合同照片",
    comp: "custom"
  },
  {
    name: "faultUrlList",
    label: "故障照片",
    comp: "custom"
  },
  {
    name: "receiptUrlList",
    label: "票据照片",
    comp: "custom"
  },
  {
    name: "reporter",
    label: "故障上报人信息(姓名电话)"
  },
  {
    name: "vender",
    label: "服务提供方"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  }
];
export default {
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    var infoObj = this.createObjFromSchema(infoSchema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "faultList",
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      popShow: false,
      popTitle: "新建",
      detailId: "",
      // 保存图片地址
      imgObj: {
        faultImg: [],
        receiptImg: [],
        contractImg: []
      },
      // 回显图片地址
      filelistObj: {
        faultList: [],
        receiptList: [],
        contractList: []
      }
    };
  },
  methods: {
    //删除数组里面删除的图片地址
    handleFaultRemove(file, fileList) {
      this.imgObj.faultImg = this.sliceArr(this.imgObj.faultImg, file, "key");
    },
    // 保存上传的图片地址
    handleFaultSuccess(response, file, fileList) {
      this.imgObj.faultImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      });
    },

    //删除数组里面删除的图片地址
    handleReceiptRemove(file, fileList) {
      this.imgObj.receiptImg = this.sliceArr(
        this.imgObj.receiptImg,
        file,
        "key"
      );
    },
    // 保存上传的图片地址
    handleReceiptSuccess(response, file, fileList) {
      this.imgObj.receiptImg.push({
        name: file.name,
        type: this.getFileType(file.raw.name),
        url: `${this.imgBaseUrl}/${file.response.key}`,
        key: file.response.key
      });
    },
    //删除数组里面删除的图片地址
    handleContractRemove(file, fileList) {
      this.imgObj.contractImg = this.sliceArr(
        this.imgObj.contractImg,
        file,
        "key"
      );
    },
    // 保存上传的图片地址
    handleContractSuccess(response, file, fileList) {
      this.imgObj.contractImg.push({
        name: file.name,
        type: this.getFileType(file.raw.name),
        url: `${this.imgBaseUrl}/${file.response.key}`,
        key: file.response.key
      });
    },
    beforeUploadGetKey() {
      //每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID();
      this.uploadData.token = this.uploadToken;
    },
    addAsset() {
      Object.keys(this.infoQueryObj).map(key => {
        this.infoQueryObj[key] = "";
      });
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = [];
      });
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = [];
      });
      this.popShow = true;
      this.detailId = "";
      this.popTitle = "新建资产故障";
    },
    prev(id) {
      let url = "createFault";
      if (this.detailId) {
        url = "updateFault";
      }
      let tips = this.detailId ? "更新" : "创建";
      let params = Object.assign({}, this.infoQueryObj);
      params.faultUrlList = JSON.stringify(this.imgObj.faultImg);
      params.receiptUrlList = JSON.stringify(this.imgObj.receiptImg);
      params.contractUrlList = JSON.stringify(this.imgObj.contractImg);
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
    handleClose() {
      Object.keys(this.filelistObj).map(v => {
        this.filelistObj[v] = [];
      });
      this.popShow = false;
    },
    emitInfo(row) {
      this.popTitle = "编辑资产故障";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.filelistObj.faultList =
        (this.infoQueryObj.faultUrlList &&
          JSON.parse(this.infoQueryObj.faultUrlList)) ||
        [];
      this.imgObj.faultImg =
        (this.infoQueryObj.faultUrlList &&
          JSON.parse(this.infoQueryObj.faultUrlList)) ||
        [];

      this.filelistObj.receiptList =
        (this.infoQueryObj.receiptUrlList &&
          JSON.parse(this.infoQueryObj.receiptUrlList)) ||
        [];
      this.imgObj.receiptImg =
        (this.infoQueryObj.receiptUrlList &&
          JSON.parse(this.infoQueryObj.receiptUrlList)) ||
        [];

      this.filelistObj.contractList =
        (this.infoQueryObj.contractUrlList &&
          JSON.parse(this.infoQueryObj.contractUrlList)) ||
        [];
      this.imgObj.contractImg =
        (this.infoQueryObj.contractUrlList &&
          JSON.parse(this.infoQueryObj.contractUrlList)) ||
        [];

      this.popShow = true;
    },
    delInfo(row) {
      this.$confirm("确定要删除该设备故障记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return api.deleteFault({ id: row.id });
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
  max-height: 600px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>


