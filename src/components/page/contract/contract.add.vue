<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'保修合同'"></ever-bread-crumb>
    <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="130px" label-position="right">
      <template slot="provider">
        <el-autocomplete class="inline-input" v-model="infoQueryObj.provider" :fetch-suggestions="queryComp" placeholder="请输入内容" style="width: 100%"></el-autocomplete>
      </template>
      <template slot="enclosure">
        <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList1" :on-remove="(file, fileList) => {handleReportRemove(file, fileList, 1)}" :on-success="(response, file, fileList) => {handleReportContractSuccess(response, file, fileList, 1)}" :data="uploadData" :before-upload="(file) => {beforeUploadGetKey(file, 1)}">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </template>
      <template slot="type">
        <el-checkbox-group v-model="infoQueryObj.type">
          <el-checkbox :label="'1'">维修</el-checkbox>
          <el-checkbox :label="'2'">保养</el-checkbox>
        </el-checkbox-group>
      </template>
      <template slot="extra">
        <el-radio v-model="infoQueryObj.extra" :label="'1'">全保</el-radio>
        <el-radio v-model="infoQueryObj.extra" :label="'2'">部分保</el-radio>
      </template>
      <template slot="extra1">
        <div v-if="infoQueryObj.extra === '2'">
          <el-checkbox-group v-model="infoQueryObj.extra1">
            <el-checkbox :label="'1'">人工保</el-checkbox>
            <el-checkbox :label="'2'">部分零件</el-checkbox>
          </el-checkbox-group>
          <div v-if="infoQueryObj.extra1.indexOf('2') > -1">
            <div v-for="(item, index) in partArr" :key="index">
              <label>零件名称:</label>
              <div style="width: 180px;display: inline-block;margin-left: 10px;">
                <el-input v-model="item.name"></el-input>
              </div>
              <div style="display: inline-block;margin-left: 10px;">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addPart"></el-button>
                <el-button type="text" v-if="index !== 0" icon="el-icon-remove-outline" @click="delPart(index)" style="color:#fa5555;"></el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="tenderInfo">
        <fieldset>
          <legend>投标方一</legend>
          <div class="bidder">
            <div class="module">
              <span class="title">投标方名称</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.name1"></el-input></span>
            </div>
            <div class="module">
              <span class="title">投标方报价</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.price1"></el-input></span>
            </div>
            <div class="module">
              <span class="title">标书附件</span>
              <span class="content">
                <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList2" :on-remove="(file, fileList) => {handleReportRemove(file, fileList, 2)}" :on-success="(response, file, fileList) => {handleReportContractSuccess(response, file, fileList, 2)}" :data="uploadData" :before-upload="(file) => {beforeUploadGetKey(file, 2)}">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </span>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>投标方二</legend>
          <div class="bidder">
            <div class="module">
              <span class="title">投标方名称</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.name2"></el-input></span>
            </div>
            <div class="module">
              <span class="title">投标方报价</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.price2"></el-input></span>
            </div>
            <div class="module">
              <span class="title">标书附件</span>
              <span class="content">
                <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList3" :on-remove="(file, fileList) => {handleReportRemove(file, fileList, 3)}" :on-success="(response, file, fileList) => {handleReportContractSuccess(response, file, fileList, 3)}" :data="uploadData" :before-upload="(file) => {beforeUploadGetKey(file, 3)}">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </span>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>投标方三</legend>
          <div class="bidder">
            <div class="module">
              <span class="title">投标方名称</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.name3"></el-input></span>
            </div>
            <div class="module">
              <span class="title">投标方报价</span>
              <span class="content"><el-input v-model="infoQueryObj.tenderInfo.price3"></el-input></span>
            </div>
            <div class="module">
              <span class="title">标书附件</span>
              <span class="content">
                <el-upload :action="uploadUrl" list-type="picture" :file-list="filelistObj.reportList4" :on-remove="(file, fileList) => {handleReportRemove(file, fileList, 4)}" :on-success="(response, file, fileList) => {handleReportContractSuccess(response, file, fileList, 4)}" :data="uploadData" :before-upload="(file) => {beforeUploadGetKey(file, 4)}">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </span>
            </div>
          </div>
        </fieldset>
        <!-- <el-button type="text" icon="el-icon-circle-plus-outline"></el-button>
        <el-button class="del" type="text" icon="el-icon-remove-outline"></el-button> -->
      </template>
      <template slot="default">
        <div></div>
      </template>
    </ever-form2>
    <div class="log-btn-container">
      <el-button type="primary" @click="prev">保存</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
import moment from 'moment';
let infoSchema = [
  {
    name: "assetId",
    label: "设备名称",
    comp: "assets-select",
    span: 12
  },
  {
    name: "provider",
    label: "保修提供方",
    comp: 'custom',
    span: 12
  },
  {
    name: "no",
    label: "保修合同编号",
    span: 12
  },
  {
    name: "type",
    label: "保修范围",
    comp: 'custom',
    span: 12
  },
  {
    name: "totalFee",
    label: "保修总金额",
    span: 12
  },
  {
    name: "subItemFee",
    label: "设备分项金额",
    span: 12
  },
  {
    name: "beginDate",
    label: "保修开始时间",
    comp: "el-date-picker",
    props: {
      type: "date",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "endDate",
    label: "保修终止时间",
    comp: "el-date-picker",
    props: {
      type: "date",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    span: 12
  },
  {
    name: "guaranteeCycle",
    label: "保修周期",
    span: 12
  },
  {
    name: "iphone",
    label: "联系方式",
    span: 12
  },
  {
    name: "extra",
    label: "保修类别",
    comp: 'custom'
  },
  {
    name: "extra1",
    label: "",
    comp: 'custom'
  },
  {
    name: "enclosure",
    label: "保修合同附件",
    comp: 'custom'
  },
  {
    name: "tenderInfo",
    label: "投标方",
    comp: 'custom'
  }
];
export default {
  mixins: [token],
  data() {
    var infoObj = this.createObjFromSchema(infoSchema);
    infoObj.type = ['1','2'];
    infoObj.extra = '1';
    infoObj.extra1 = [];
    infoObj.tenderInfo = {
      name1: '',
      price1: '',
      name2: '',
      price2: '',
      name3: '',
      price3: '',
    };
    let validatePass = (rule, value, callback) => {
      if (this.infoQueryObj.extra === '2'&& this.infoQueryObj.extra1.length ===0) {
        callback(new Error('请选择部分保保修内容'));
      } else if (this.infoQueryObj.extra === '2' && this.infoQueryObj.extra1.indexOf('2')>1 && this.partArr.length === 0) {
        callback(new Error('请输入零件名称'));
      } else {
        callback();
      }
    }
    return {
      api,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      options: [],
      detailId: "",
      venderOptions: JSON.parse(this.getStore("mainVenderOptions")) || [],
      // 保存图片地址
      imgObj: {
        reportImg1: [],
        reportImg2: [],
        reportImg3: [],
        reportImg4: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: [],
        reportList1: [],
        reportList2: [],
        reportList3: [],
        reportList4: []
      },
      rules: {
        assetId: [
          {required: true, message: "必填项", trigger: 'blur'}
        ],
        extra: [
          {required: true, message: "必填项", trigger: 'blur'}
        ],
        extra1: [
          {validator: validatePass, trigger: 'blur'}
        ]
      },
      partArr: [
        {name: ''}
      ]
    }
  },
  methods: {
    delPart (index) {
      if (this.partArr.length === 1) return;
      this.partArr.splice(index, 1);
    },
    addPart () {
      this.partArr.push({name: ''});
    },
    async queryComp(query, cb) {
      let a = JSON.parse(JSON.stringify(this.venderOptions));
      cb(a);
    },
    handleClose() {
      Object.keys(this.filelistObj).map(v => {
        this.filelistObj[v] = [];
      });
    },
    //删除数组里面删除的图片地址
    handleReportRemove(file, fileList, index) {
      let obj = 'reportImg' + index;
      this.imgObj[obj] = this.sliceArr(this.imgObj[obj], file, "key");
    },
    // 保存上传的图片地址
    handleReportContractSuccess(response, file, fileList, index) {
      let obj = 'reportImg' + index;
      this.imgObj[obj].push({
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
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createContract";
          if (this.detailId) {
            url = "updateContract";
          };
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj);
          params.enclosure = JSON.stringify(this.imgObj.reportImg1);
          params.tenderInfo = this.initTenderInfo();
          params.type = params.type.join(',');
          params.subItemFee = Number(params.subItemFee);
          params.totalFee = Number(params.totalFee);
          params.extra = this.initContractTypeData();
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.setSto();
              this.$router.go(-1)
              this.$messageTips(this, "success", tips + "成功");
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      })
    },
    initContractTypeData () {
      let obj = {};
      if (this.infoQueryObj.extra === '1') { // 是全保
        obj.whole = true;
      } else if (this.infoQueryObj.extra === '2'){ // 部分保
        obj.part = true;
        if (this.infoQueryObj.extra1.indexOf('1') > -1) { // 人工保
          obj.artificial = true;
        } 
        if(this.infoQueryObj.extra1.indexOf('2') > -1) { // 零件保
          obj.partVal = true;
          obj.partNameArr = this.partArr; // 零件集合
        }
      }
      return JSON.stringify(obj);
    },
    initTenderInfo () {
      let obj = Object.assign({}, this.infoQueryObj.tenderInfo)
      obj.img1 = this.imgObj.reportImg2;
      obj.img2 = this.imgObj.reportImg3;
      obj.img3 = this.imgObj.reportImg4;
      return JSON.stringify(obj)
    },
    setSto () {
      let venderOptions = [
        ...this.venderOptions,
        {
          name: this.infoQueryObj.provider,
          value: this.infoQueryObj.provider
        }
      ];
      let obj = {};
      let newarr = venderOptions.reduce((total, cur) => {
        obj[cur.value] ? "" : (obj[cur.value] = true && total.push(cur));
        return total
      }, []);
      this.setStore("mainVenderOptions", JSON.stringify(newarr));
    },
    emitInfo(row) {
      let obj = Object.assign({}, row);
      let tenderInfo = JSON.parse(obj.tenderInfo);
      this.filelistObj.reportList1 = (obj.enclosure && JSON.parse(obj.enclosure)) || [];
      this.imgObj.reportImg1 = (obj.enclosure && JSON.parse(obj.enclosure)) || [];
      this.filelistObj.reportList2 = tenderInfo.img1 || [];
      this.imgObj.reportImg2 = tenderInfo.img1 || [];
      this.filelistObj.reportList3 = tenderInfo.img2 || [];
      this.imgObj.reportImg3 = tenderInfo.img2 || [];
      this.filelistObj.reportList4 = tenderInfo.img3 || [];
      this.imgObj.reportImg4 = tenderInfo.img3 || [];
      obj.tenderInfo = {
        name1: tenderInfo.name1,
        name2: tenderInfo.name3,
        name3: tenderInfo.name1,
        price1: tenderInfo.price1,
        price2: tenderInfo.price2,
        price3: tenderInfo.price3
      }
      this.initContractType(obj);
      obj.type = obj.type.split(',');
      Object.assign(this.infoQueryObj, obj);
    },
    initContractType (obj) {
      let extra = JSON.parse(obj.extra);
      obj.extra1 = []
      if (extra.whole) {
        obj.extra = '1'
      } else if (extra.part) {
        obj.extra = '2';
        console.log(this.infoQueryObj.extra)
        if (extra.artificial) {
          obj.extra1.push('1');
        }
        if (extra.partVal) {
          obj.extra1.push('2');
          this.partArr = extra.partNameArr
        }
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.findByIdContract({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    } else {
      this.infoQueryObj.beginDate = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
    api.userList({name: '', id: ''}).then(rs => {
      if (rs.code === 200 && rs.data.length > 0) {
        this.options = rs.data
      }
    });
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
  border-color: #eee;
  border-width: 1px;
  border-style: double;
  margin-top: 20px;
}
legend {
  padding: 0 10px;
}
.el-button /deep/ i {
  font-size: 20px;
}
.el-button.del /deep/ i {
  color: red;
}
.bidder {
  .module {
    margin-bottom: 20px;
  }
  .title {
    width:90px;
    display: inline-block;
  }
  .content {
    display: inline-block;
    width: calc(100% - 130px);
  }
  
}
.bidder .module:last-child {
  .title {
    position: absolute;
  }
  .content {
    margin-left: 90px;
  }
}
.log-btn-container {
  padding-left:130px;
}
.el-radio /deep/ span {
  color: #606266;
}
.el-checkbox /deep/ span {
  color: #606266;
}
</style>