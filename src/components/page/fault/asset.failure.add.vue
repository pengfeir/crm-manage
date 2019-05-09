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
        <template slot="vender">
          <el-autocomplete class="inline-input" v-model="infoQueryObj.vender" :fetch-suggestions="queryComp" placeholder="请输入内容" style="width: 100%"></el-autocomplete>
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
        <template slot="guaranteeType">
          <el-button v-if="infoQueryObj.guaranteeType === '1'" type="primary" size='small' plain>在保</el-button>
          <el-button v-else-if="infoQueryObj.guaranteeType === '2'" type="danger" size='small' plain>出保</el-button>
          <el-button v-else size='small'>未知</el-button>
        </template>
        <template slot="repairType2">
          <div v-show="infoQueryObj.repairType === '厂家'">
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
                    <el-input v-model="contractInfo.price">
                      <template slot="append">元</template>
                    </el-input>
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
                  <el-input v-model="contractInfo.factoryPrice">
                    <template slot="append">元</template>
                  </el-input>
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
          <div v-show="infoQueryObj.repairType === '第三方服务'">
            <fieldset style="margin:0;">
              <legend>服务方(一)</legend>
              <div>
                <label class="contract-label">服务方名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdName"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">服务方报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdPrice">
                    <template slot="append">元</template>
                  </el-input>
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
            <fieldset style="margin:0;">
              <legend>服务方(二)</legend>
              <div>
                <label class="contract-label">服务方名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdName2"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">服务方报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdPrice2">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">报价单：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList5" :on-remove="(file, fileList) => {handleRemove(file, fileList, 5)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 5)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
            <fieldset style="margin:0;">
              <legend>服务方(三)</legend>
              <div>
                <label class="contract-label">服务方名称：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdName3"></el-input>
                </div>
              </div>
              <div>
                <label class="contract-label">服务方报价：</label>
                <div class="contract-div">
                  <el-input v-model="contractInfo.thirdPrice3">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div>
                <label class="contract-label-only">报价单：</label>
                <div class="contract-div-only">
                  <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList6" :on-remove="(file, fileList) => {handleRemove(file, fileList, 6)}" :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, 6)}" :data="uploadData" :before-upload="beforeUploadGetKey">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </fieldset>
          </div>
          <div v-show="infoQueryObj.repairType === '医工科'">
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
                  <el-input v-model="contractInfo.price">
                    <template slot="append">元</template>
                  </el-input>
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
                  <el-input v-model="contractInfo.servicePrice">
                    <template slot="append">元</template>
                  </el-input>
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
        <template slot="offerPrice">
          <el-input v-model="infoQueryObj.offerPrice">
            <template slot="append">元</template>
          </el-input>
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
    name: "guaranteeType",
    label: "保修状态",
    comp: "custom"
  },
  {
    name: "repairType",
    label: "维修方类别",
    comp: "radio",
    props: {
      options: [
        {id: '厂家', name: '厂家'},
        {id: '第三方服务', name: '第三方服务'},
        {id: '医工科', name: '医工科'}
      ]
    }
  },
  {
    name: "repairType2",
    label: "",
    comp: "custom",
  },
  {
    name: "vender",
    label: "服务提供方",
    comp: "custom"
  },
  {
    name: "offerPrice",
    label: "实际花费",
    comp: "custom"
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
      venderOptions: JSON.parse(this.getStore("mainVenderOptions")) || [],
      // 保存图片地址
      imgObj: {
        faultImg: [],
        receiptImg: [],
        contractImg: [],
        reportImg1: [], // 内部成本单据
        reportImg2: [], // 医工科 服务方报价单
        reportImg3: [], // 厂家报价单
        reportImg4: [], // 第三方1报价单
        reportImg5: [], // 第三方2报价单
        reportImg6: [] // 第三方3报价单
      },
      // 回显图片地址
      filelistObj: {
        faultList: [],
        receiptList: [],
        contractList: [],
        reportList1: [], // 内部成本单据
        reportList2: [], // 医工科 服务方报价单
        reportList3: [], // 厂家报价单
        reportList4: [], // 第三方1报价单
        reportList5: [], // 第三方2报价单
        reportList6: [] // 第三方3报价单
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
        price: '', //材料费用
        serviceName: '', // 医工科 服务方名称
        servicePrice: '', // 医工科 服务方报价
        thirdName: '', // 第三方1名称
        thirdPrice: '',// 第三方1报价
        thirdName2: '', // 第三方2名称
        thirdPrice2: '',// 第三方2报价
        thirdName3: '', // 第三方3名称
        thirdPrice3: '',// 第三方3报价
        factoryName: '', // 厂家名称
        factoryPrice: '' // 厂家报价
      }
    }
  },
  methods: {
    async queryComp(query, cb) {
      let a = JSON.parse(JSON.stringify(this.venderOptions));
      cb(a);
    },
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
    initTypeInfo () {
      let obj = {name: this.infoQueryObj.repairType};
      if (this.infoQueryObj.repairType === '厂家') {
        obj.type = this.contractInfo.type;
        obj.part = this.contractInfo.part;
        obj.partValArr = this.contractInfo.partValArr;
        obj.price = this.contractInfo.price;
        obj.factoryName = this.contractInfo.factoryName;
        obj.factoryPrice = this.contractInfo.factoryPrice;
        obj.imgArr = this.imgObj.reportImg3
      } else if(this.infoQueryObj.repairType === '第三方服务') {
        obj.thirdName = this.contractInfo.thirdName;
        obj.thirdPrice = this.contractInfo.thirdPrice;
        obj.imgArr = this.imgObj.reportImg4;
        obj.thirdName2 = this.contractInfo.thirdName2;
        obj.thirdPrice2 = this.contractInfo.thirdPrice2;
        obj.imgArr2 = this.imgObj.reportImg5;
        obj.thirdName3 = this.contractInfo.thirdName3;
        obj.thirdPrice3 = this.contractInfo.thirdPrice3;
        obj.imgArr3 = this.imgObj.reportImg6;
      } else if(this.infoQueryObj.repairType === '医工科') {
        obj.time = this.contractInfo.time;
        obj.price = this.contractInfo.price;
        obj.imgArr = this.imgObj.reportImg1;
        obj.serviceName = this.contractInfo.serviceName;
        obj.servicePrice = this.contractInfo.servicePrice;
        obj.serviceImgArr = this.imgObj.reportImg2;
      }
      return JSON.stringify(obj)
    },
    echoTypeInfo (data) {
      if (!data) return
      let json = JSON.parse(data);
      this.infoQueryObj.repairType = json.name;
      console.log(typeof this.infoQueryObj.repairType)
      delete json.name;
      if (this.infoQueryObj.repairType === '厂家') {
        if (json.imgArr.length.length > 0) {
          this.imgObj.reportImg3 = JSON.parse(JSON.stringify(json.imgArr));
          this.filelistObj.reportList3 = JSON.parse(JSON.stringify(json.imgArr));
          delete json.imgArr
        }
      } else if(this.infoQueryObj.repairType === '第三方服务') {
        this.imgObj.reportImg4 = JSON.parse(JSON.stringify(obj.imgArr));
        this.filelistObj.reportList4 = JSON.parse(JSON.stringify(obj.imgArr));
        this.imgObj.reportImg5 = JSON.parse(JSON.stringify(obj.imgArr2));
        this.filelistObj.reportList5 = JSON.parse(JSON.stringify(obj.imgArr2));
        this.imgObj.reportImg6 = JSON.parse(JSON.stringify(obj.imgArr3));
        this.filelistObj.reportList6 = JSON.parse(JSON.stringify(obj.imgArr3));
        delete obj.imgArr
        delete obj.imgArr2
        delete obj.imgArr3
      } else if(this.infoQueryObj.repairType === '医工科') {
        this.imgObj.reportImg1 = JSON.parse(JSON.stringify(obj.imgArr));
        this.filelistObj.reportList1 = JSON.parse(JSON.stringify(obj.imgArr));
        this.imgObj.reportImg2 = JSON.parse(JSON.stringify(obj.serviceImgArr));
        this.filelistObj.reportList2 = JSON.parse(JSON.stringify(obj.serviceImgArr));
        delete obj.serviceImgArr
        delete obj.serviceImgArr
      }
      Object.assign(this.contractInfo, json);
    },
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj, this.infoQueryObj2);
          params.extra = this.initTypeInfo();
          delete params.repairType
          delete params.guaranteeType
          delete params.repairType2
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
              this.setStoreInfo();
              this.$router.go(-1);
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    setStoreInfo () {
      let venderOptions = [
        ...this.venderOptions,
        {
          name: this.infoQueryObj.vender,
          value: this.infoQueryObj.vender
        }
      ];
      let obj = {};
      let newarr = venderOptions.reduce((total, cur) => {
        obj[cur.value] ? "" : (obj[cur.value] = true && total.push(cur));
        return total
      }, []);
      this.setStore("mainVenderOptions", JSON.stringify(newarr));
    },
    handleClose() {
      this.$router.go(-1)
    },
    emitInfo(row) {
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.echoTypeInfo(row.extra);
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
        this.contractInfo.partTypeArr = [];
        if (rs.data) {
          this.infoQueryObj.guaranteeType = '1';
          let extra = (rs.data[0]['assetServiceContracts']).find(item => item.assetId === assetId);
          extra = JSON.parse(extra.kind);
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
        } else {
          this.infoQueryObj.guaranteeType = '2';
        }
      })
    }
  },
  created () {
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
  width:180px;
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


