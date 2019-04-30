<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'设备故障'"></ever-bread-crumb>
    <fieldset>
      <legend>故障信息</legend>
      <ever-form2 :schema="infoQuerySchema2" v-model="infoQueryObj2" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
        <template slot="faultUrlList">
          <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.faultList:[]" :on-remove="handleFaultRemove" :on-success="handleFaultSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>  
    </fieldset>
    <fieldset style="margin-top:50px;">
      <legend>维修信息</legend>
      <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
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
        <template slot="bbbb">
          <el-button v-if="infoQueryObj.bbbb === '1'" type="primary" size='small' plain>在保</el-button>
          <el-button v-else-if="infoQueryObj.bbbb === '2'" type="danger" size='small' plain>出保</el-button>
          <el-button v-else size='small'>未知</el-button>
        </template>
        <template slot="cccc">
          <div v-show="infoQueryObj.aaaa === '厂家'">
            <fieldset style="margin:0;">
              <legend>走保</legend>
              <div>
                <el-radio v-model="contractInfo.type" label="1" disabled>全保</el-radio>
                <el-radio v-model="contractInfo.type" label="2" disabled>部分保</el-radio>
              </div>
              <div v-if="contractInfo.type === '2'">
                <div>
                  <el-checkbox-group v-model="contractInfo.part">
                    <el-checkbox v-for="(item, index) in contractInfo.partTypeArr" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-if="contractInfo.part.indexOf('2') > -1">
                  <el-checkbox-group v-model="contractInfo.partValArr">
                    <el-checkbox v-for="(item, index) in contractInfo.partArr" :key="index" :label="item.name">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <label>保外金额：</label>
                  <div style="display:inline-block;">
                    <el-input v-model="contractInfo.price"></el-input>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset style="margin:0;">
              <legend>不走保</legend>
              <div>
                <label class="contract-label">厂家名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.factoryName"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">厂家报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.factoryPrice"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">报价单：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList4" :on-remove="(file, fileList) => {handleRemove(file, fileList, 4)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 4)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
          </div>
          <div v-show="infoQueryObj.aaaa === '第三方'">
            <fieldset style="margin:0;">
              <legend>第三方</legend>
              <div>
                <label class="contract-label">第三方名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdName"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">第三方报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdPrice"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">报价单：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList3" :on-remove="(file, fileList) => {handleRemove(file, fileList, 3)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 3)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
          </div>
          <div v-show="infoQueryObj.aaaa === '医工科'">
            <fieldset style="margin:0;">
              <legend>内部成本</legend>
              <div>
                <label class="contract-label">工时：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.time"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">材料费用：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.price"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">单据：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList1" :on-remove="(file, fileList) => {handleRemove(file, fileList, 1)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 1)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
            <fieldset style="margin:0;">
              <legend>服务方报价</legend>
              <div>
                <label class="contract-label">服务方名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.serviceName"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">服务方报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.servicePrice"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">报价单：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList2" :on-remove="(file, fileList) => {handleRemove(file, fileList, 2)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 2)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
          </div>
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
  },
  {
    name: "faultUrlList",
    label: "故障照片",
    comp: "custom"
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
    name: "bbbb",
    label: "保修状态",
    comp: "custom"
  },
  {
    name: "aaaa",
    label: "维修方类别",
    comp: "radio",
    props: {
      options: [
        {id: '厂家', name: '厂家'},
        {id: '第三方', name: '第三方'},
        {id: '医工科', name: '医工科'}
      ]
    }
  },
  {
    name: "cccc",
    label: "",
    comp: "custom",
  },
  {
    name: "offerPrice",
    label: "实际花费"
  },
  {
    name: "contractUrlList",
    label: "维修合同照片",
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
        contractImg: [],
        reportImg1: [], // 内部成本单据
        reportImg2: [], // 医工科 服务方报价单
        reportImg3: [], // 第三方报价单
        reportImg4: []  // 厂家报价单
      },
      // 回显图片地址
      filelistObj: {
        faultList: [],
        receiptList: [],
        contractList: [],
        reportList1: [], // 内部成本单据
        reportList2: [], // 医工科 服务方报价单
        reportList3: [], // 第三方报价单
        reportList4: []  // 厂家报价单
      },
      rules: {
        assetId: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur", "change"]
          }
        ]
      },
      contractInfo: {
        type: '1', // 全保，部分保
        part: [], // 人工保，零件保
        partTypeArr: [],
        partValArr: [],
        partArr: [],
        time:'', // 工时
        price: 0, //材料费用
        serviceName: '', // 医工科 服务方名称
        servicePrice: '', // 医工科 服务方报价
        thirdName: '', // 第三方名称
        thirdPrice: '',// 第三方报价
        factoryName: '', // 厂家名称
        factoryPrice: '' // 厂家报价
      }
    }
  },
  methods: {
    //删除数组里面删除的图片地址
    handleRemove(file, fileList, type) {
      let obj = this.imgObj['reportImg' + type];
      obj = this.sliceArr(obj, file, "key");
    },
    // 保存上传的图片地址
    handleSuccess(response, file, fileList, type) {
      let obj = this.imgObj['reportImg' + type];
      console.log(obj, 1111)
      obj.push({
        name: file.name,
        url: `${this.imgBaseUrl}/${file.response.key}`,
        type: this.getFileType(file.raw.name),
        key: file.response.key
      });
    },
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
          delete params.aaaa
          delete params.bbbb
          delete params.cccc
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
          this.emitInfo(rs.data);
          this.getContractInfo(rs.data.assetId);
        }
      })
    },
    getContractInfo (assetId) {
      api.findByAssetContract({assetId: assetId, pageNum: 1, pageSize: 20}).then(rs => {
        console.log(rs)
        if (rs.data.extra) {
          this.infoQueryObj.bbbb = '1'
        } else {
          this.infoQueryObj.bbbb = '2'
        }
        let extra = JSON.parse(rs.data.extra);
        if (extra.whole) {
          this.contractInfo.type = '1';
        } else if (extra.part) {
          this.contractInfo.type = '2';
          if (extra.artificial) {
            this.contractInfo.partTypeArr.push({name: '人工保', id: '1'});
          }
          if (extra.partVal) {
            this.contractInfo.partTypeArr.push({name: '零件保', id: '2'});
            this.contractInfo.partArr = extra.partNameArr;
          }
        }
      })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id;
      this.getInfo();
    }
  },
  watch: {
    'infoQueryObj2.assetId': {
      handler: function(val, oldval) {
        if (val) {
          this.getContractInfo(val);
        }
      },
      deep: true
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
.package-sale /deep/ .el-row {
  margin-top: 20px;
}
.log-btn-container {
  margin-top: 20px;
}
fieldset {
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 10px;
  margin-left: 30px;
}
legend {
  padding: 0 10px;
}
.package-sale /deep/ .el-radio__label {
  color: #606266;
}
.package-sale /deep/ .el-checkbox__label {
  color: #606266;
}
.contract-label {
  width: 90px;
  display: inline-block;
  text-align: right;
}
.contract-div {
  display:inline-block;
}
.contract-label-only {
  width: 90px;
  display: inline-block;
  text-align: right;
  position: absolute;
}
.contract-div-only {
  display: inline-block;
  margin-left:90px;
  width: calc(100% - 90px);
}
</style>


