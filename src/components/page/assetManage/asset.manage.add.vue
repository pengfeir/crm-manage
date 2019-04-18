<template>
  <div>
    <ever-bread-crumb :showTitle="'设备'"></ever-bread-crumb>
    <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right" :rules="rules">
          <template slot="acceptStatus">
            <el-autocomplete class="inline-input" v-model="queryObj.acceptStatus" :fetch-suggestions="queryComp" placeholder="请输入内容" style="width: 100%"></el-autocomplete>
          </template>
          <template slot="aaaaa">
            <el-select v-model="queryObj.aaaaa" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.username"
                :value="item.id">
              </el-option>
            </el-select>
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
            <el-select v-model="queryObj.iotDeviceIds" multiple placeholder="请选择">
              <el-option v-for="item in iotDeviceIdsOptions" :key="item.id" :label="item.macAddr" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="default">
            <div></div>
          </template>
        </ever-form2>
      </div>
      <div class="log-btn-container" style="margin-bottom:60px;padding-left:180px;">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
  </div>
</template>
<script>
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
let schema = [
  {
    name: "name",
    label: "设备名称",
    span: 12
  },
  {
    name: "iotDeviceIds",
    label: "物联设备",
    comp: "custom",
    span: 12
  },
  {
    name: "no",
    label: "设备编号",
    span: 12
  },
  {
    name: "acceptStatus",
    label: "验收状态",
    comp: "custom",
    span: 12
  },
  {
    name: "kind",
    label: "设备类别",
    span: 12
  },
  {
    name: "model",
    label: "设备型号",
    span: 12
  },
  {
    name: "setupStep",
    label: "设备装机状态",
    comp: "el-select",
    span: 12,
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
    label: "耗材替代品",
    span: 12
  },
  {
    name: "appendant",
    label: "配套耗材",
    span: 12
  },
  {
    name: "contact",
    label: "联系方式",
    span: 12
  },
  {
    name: "dept",
    label: "临床科室",
    span: 12
  },
  {
    label: "品牌",
    name: "brand",
    span: 12
  },
  {
    label: "规格型号",
    name: "spec",
    span: 12
  },
  {
    label: "采购价格",
    name: "purchasePrice",
    span: 12
  },
  {
    label: "责任工程师",
    name: "aaaaa",
    comp: "custom",
    span: 12
  },
  {
    label: "保修截止日期",
    name: "matainExpiryDate",
    comp: "el-date-picker",
    props: {
      type: "date",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "prodDate",
    label: "生产日期",
    comp: "el-date-picker",
    props: {
      type: "date",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "setupStartAt",
    label: "装机开始时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "setupEndAt",
    label: "装机结束时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "sn",
    label: "SN序列号",
    span: 12
  },
  {
    name: "vender",
    label: "厂家",
    span: 12
  },
  {
    name: "extra",
    label: "其他扩展信息",
    span: 12
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
    },
    span: 12
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
  }
];
export default {
  mixins: [token],
  data () {
    var obj = this.createObjFromSchema(schema);
    return {
      querySchema: schema,
      queryObj: obj,
      detailId: "",
      iotDeviceIdsOptions: [],
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
      options: [],
      rules: {
        name: [
          {required: true, message: "必填项", trigger: ["blur"]}
        ],
        iotDeviceIds: [
          {required: true, message: "必填项", trigger: ["blur"]}
        ]
      }
    }
  },
  methods: {
    async getDeviceIdsOptions() {
      try {
        let data = await api.unPageiotDeviceList();

        this.iotDeviceIdsOptions = data.data;
      } catch (err) {}
    },
    handleClose() {
      Object.keys(this.filelistObj).map(v => {
        this.filelistObj[v] = [];
      });
      this.popShow = false;
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
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createAsset";
          if (this.detailId) {
            url = "updateAsset";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.queryObj);
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
    emitInfo(row) {
      this.detailId = row.id;
      Object.assign(this.queryObj, row);
      if (
        this.queryObj.iotDeviceIds &&
        this.queryObj.iotDeviceIds.length > 0
      ) {
      } else {
        this.queryObj.iotDeviceIds = [];
      }
      this.filelistObj.manualList =
        (this.queryObj.manualUrlList &&
          JSON.parse(this.queryObj.manualUrlList)) ||
        [];
      this.imgObj.manualImg =
        (this.queryObj.manualUrlList &&
          JSON.parse(this.queryObj.manualUrlList)) ||
        [];

      this.filelistObj.receiptList =
        (this.queryObj.receiptUrlList &&
          JSON.parse(this.queryObj.receiptUrlList)) ||
        [];
      this.imgObj.receiptImg =
        (this.queryObj.receiptUrlList &&
          JSON.parse(this.queryObj.receiptUrlList)) ||
        [];

      this.filelistObj.contractList =
        (this.queryObj.contractUrlList &&
          JSON.parse(this.queryObj.contractUrlList)) ||
        [];
      this.imgObj.contractImg =
        (this.queryObj.contractUrlList &&
          JSON.parse(this.queryObj.contractUrlList)) ||
        [];
    },
    clearInfo() {
      Object.keys(this.queryObj).map(key => {
        if (key === "iotDeviceIds") {
          this.queryObj[key] = [];
        } else {
          this.queryObj[key] = "";
        }
      });
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = [];
      });
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = [];
      });
    },
  },
  created (){
    this.getDeviceIdsOptions();
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.assetFindById({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
    api.userList({name: '', id: ''}).then(rs => {
      if (rs.code === 200 && rs.data.length > 0) {
        this.options = rs.data
      }
    })
  },
  watch: {
    $route: {
      handler(value) {
        if (!value) {
          this.clearInfo();
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>


