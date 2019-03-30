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
      <el-table-column prop="name" label="资产名称" width="150" fixed>
      </el-table-column>
      <el-table-column prop="no" label="资产编号">
      </el-table-column>
      <el-table-column prop="acceptStatus" label="验收状态">
      </el-table-column>
      <el-table-column prop="alternativeAppendant" label="耗材替代品" width="100">
      </el-table-column>
      <el-table-column prop="appendant" label="配套耗材">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="dept" label="临床科室">
      </el-table-column>
      <el-table-column prop="contractUrlList" label="采购合同照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.contractUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="receiptUrlList" label="票据照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.receiptUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="manualUrlList" label="用户手册照片" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.manualUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="isDedicatedAppendant" label="配套耗材是否专机专用" width="160">
        <template slot-scope="scope">
          {{scope.row.isDedicatedAppendant | getAppendant}}
        </template>
      </el-table-column>
      <el-table-column prop="kind" label="设备类别">
      </el-table-column>
      <el-table-column prop="model" label="设备型号">
      </el-table-column>
      <el-table-column prop="prodDate" label="生产日期" width="180">
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
      <el-table-column prop="mtime" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="extra" label="其他拓展信息" width="150">
      </el-table-column>
      <el-table-column prop="orgName" label="机构" width="180">
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
        <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right" :rules="rules">
          <template slot="acceptStatus">
            <el-autocomplete class="inline-input" v-model="infoQueryObj.acceptStatus" :fetch-suggestions="queryComp" placeholder="请输入内容" style="width: 100%"></el-autocomplete>
          </template>
          <template slot="manualUrlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.manualList:[]" :on-remove="handleManualRemove" :on-success="handleManualSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
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
          <template slot="iotDeviceIds">
            <el-select v-model="infoQueryObj.iotDeviceIds" multiple placeholder="请选择">
              <el-option v-for="item in iotDeviceIdsOptions" :key="item.id" :label="item.macAddr" :value="item.id">
              </el-option>
            </el-select>
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
import api from "@/api/api";
import list from "@/plugins/list";
import token from "@/plugins/getUploadToken";
let schema = [
  {
    label: "资产编号",
    name: "no"
  },
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
    name: "name",
    label: "资产名称"
  },
  {
    name: "iotDeviceIds",
    label: "物联设备",
    comp: "custom"
  },
  {
    name: "no",
    label: "资产编号"
  },
  {
    name: "acceptStatus",
    label: "验收状态",
    comp: "custom"
  },
  {
    name: "kind",
    label: "设备类别"
  },
  {
    name: "model",
    label: "设备型号"
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
    name: "dept",
    label: "临床科室"
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
    name: "prodDate",
    label: "生产日期",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
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
    name: "manualUrlList",
    label: "用户手册照片",
    comp: "custom"
  },
  {
    name: "receiptUrlList",
    label: "票据照片",
    comp: "custom"
  },
  {
    name: "contractUrlList",
    label: "采购合同照片",
    comp: "custom"
  },
  {
    name: "sn",
    label: "SN序列号"
  },
  {
    name: "vender",
    label: "厂家"
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
    infoObj.iotDeviceIds = [];
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
      detailId: "",
      // 保存图片地址
      imgObj: {
        manualImg: [],
        receiptImg: [],
        contractImg: []
      },
      // 回显图片地址
      filelistObj: {
        manualList: [],
        receiptList: [],
        contractList: []
      },
      iotDeviceIdsOptions: [],
      rules: {
        name: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  watch: {
    popShow: {
      handler: function(val, oldval) {
        if (val) {
          this.getDeviceIdsOptions();
        }
      },
      immediate: true
    }
  },
  methods: {
    async getDeviceIdsOptions() {
      try {
        let data = await api.unPageiotDeviceList();

        this.iotDeviceIdsOptions = data.data;
      } catch (err) {}
    },
    //删除数组里面删除的图片地址
    handleManualRemove(file, fileList) {
      this.imgObj.manualImg = this.sliceArr(this.imgObj.manualImg, file, "key");
    },
    // 保存上传的图片地址
    handleManualSuccess(response, file, fileList) {
      this.imgObj.manualImg.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        key: file.response.key,
        type: this.getFileType(file.raw.name)
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
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
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
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      });
    },
    beforeUploadGetKey(file) {
      //每个文件上传之前 给它一个 名字
      this.uploadData.key = this.generateUUID();
      this.uploadData.token = this.uploadToken;
    },
    async queryComp(query, cb) {
      this.remarkoptions = [
        {
          name: "未验收",
          value: "未验收"
        },
        {
          name: "已验收",
          value: "已验收"
        }
      ];
      cb(this.remarkoptions);
    },
    addAsset() {
      Object.keys(this.infoQueryObj).map(key => {
        if (key === "iotDeviceIds") {
          this.infoQueryObj[key] = [];
        } else {
          this.infoQueryObj[key] = "";
        }
      });
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = [];
      });
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = [];
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
      params.manualUrlList =
        this.imgObj.manualImg.length > 0
          ? JSON.stringify(this.imgObj.manualImg)
          : "";
      params.receiptUrlList =
        this.imgObj.receiptImg.length > 0
          ? JSON.stringify(this.imgObj.receiptImg)
          : "";
      params.contractUrlList =
        this.imgObj.contractImg.length > 0
          ? JSON.stringify(this.imgObj.contractImg)
          : "";
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.query();
              this.$messageTips(this, "success", tips + "成功");
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
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
      this.popTitle = "编辑资产";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      if (
        this.infoQueryObj.iotDeviceIds &&
        this.infoQueryObj.iotDeviceIds.length > 0
      ) {
      } else {
        this.infoQueryObj.iotDeviceIds = [];
      }
      this.filelistObj.manualList =
        (this.infoQueryObj.manualUrlList &&
          JSON.parse(this.infoQueryObj.manualUrlList)) ||
        [];
      this.imgObj.manualImg =
        (this.infoQueryObj.manualUrlList &&
          JSON.parse(this.infoQueryObj.manualUrlList)) ||
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
    async delInfo(row) {
      this.$confirm("确定要删除该资产信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.deleteAsset({ id: row.id });
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
  height: 600px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>


