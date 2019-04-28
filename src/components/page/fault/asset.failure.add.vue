<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'设备故障'"></ever-bread-crumb>
    <fieldset>
      <legend>上报信息</legend>
      <ever-form2 :schema="infoQuerySchema2" v-model="infoQueryObj2" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>  
    </fieldset>
    <fieldset style="margin-top:50px;">
      <legend>维修信息</legend>
      <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
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
    </fieldset> 
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">保存</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>
<script>
import token from "@/plugins/getUploadToken";
import api from "@/api/api";
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
]
let infoSchema2 = [
  {
    name: "assetId",
    label: "设备名称",
    comp: "assets-select"
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
    name: "reporter",
    label: "上报人"
  },
  {
    name: "contact",
    label: "联系方式"
  }
]
let infoSchema = [
  {
    name: "fixStep",
    label: "维修进度",
    comp: "el-select",
    props: {
      options: options
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
    name: "vender",
    label: "服务提供方"
  },
  {
    name: "extra",
    label: "其他扩展信息"
  }
];
export default {
  mixins: [token],
  data() {
    var infoObj = this.createObjFromSchema(infoSchema);
    var infoObj2 = this.createObjFromSchema(infoSchema2);
    return {
      api,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      infoQueryObj2: infoObj2,
      infoQuerySchema2: infoSchema2,
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
      },
      rules: {
        assetId: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    }
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
      this.popTitle = "新建设备故障";
    },
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj, this.infoQueryObj2);
          let url = "createFault";
          if (this.detailId) {
            url = "updateFault";
          } else {
            if (!params.fixStep) {
              params.fixStep = 'reported';
            }
          }
          params.faultUrlList =
            this.imgObj.faultImg.length > 0
              ? JSON.stringify(this.imgObj.faultImg)
              : "";
          params.receiptUrlList =
            this.imgObj.receiptImg.length > 0
              ? JSON.stringify(this.imgObj.receiptImg)
              : "";
          params.contractUrlList =
            this.imgObj.contractImg.length > 0
              ? JSON.stringify(this.imgObj.contractImg)
              : "";
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.$messageTips(this, "success", tips + "成功");
              this.$router.go(-1)
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    handleClose() {
      this.$router.go(-1)
    },
    emitInfo(row) {
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      for (let key in this.infoQueryObj) {
        this.infoQueryObj[key] = row[key];
      }
      for (let key in this.infoQueryObj2) {
        this.infoQueryObj2[key] = row[key];
      }
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
    },
    getInfo () {
      api.faultFindById({id: this.$route.query.id}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      this.getInfo()
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
fieldset {
  border-color: #DCDFE6;
  border-width: 1px;
  margin-left: 30px;
}
.package-sale /deep/ .el-row {
  margin-top: 20px;
}
.log-btn-container {
  margin-top: 20px;
}
</style>


