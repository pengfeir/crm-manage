<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'建筑'"></ever-bread-crumb>
    <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="130px" label-position="right">
      <template slot="reportUrlList">
        <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </template>
      <template slot="floorsOnGround">
        <el-input v-model="infoQueryObj.floorsOnGround" @blur="inputChange"></el-input>
      </template>
      <template slot="floorsUnderground">
        <el-input v-model="infoQueryObj.floorsUnderground" @blur="inputChange"></el-input>
      </template>
      <template slot="hospitalArea">
        <el-select v-model="infoQueryObj.hospitalArea" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
let infoSchema = [
  {
    name: "name",
    label: "建筑名称"
  },
  {
    name: "hospitalArea",
    label: "院区",
    comp: "custom"
  },
  {
    name: "floorsOnGround",
    label: "地上层高",
    comp: "custom"
  },
  {
    name: "floorsUnderground",
    label: "地下层高",
    comp: "custom"
  },
  {
    name: "area",
    label: "使用面积(平米)"
  },
  {
    name: "reportUrlList",
    label: "建筑图",
    comp: "custom"
  },
  {
    name: "extra",
    label: "备注"
  }
];
export default {
  mixins: [token],
  data() {
    var infoObj = this.createObjFromSchema(infoSchema);
    return {
      api,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      detailId: "",
      options: [],
      // 保存图片地址
      imgObj: {
        reportImg: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: []
      },
      rules: {
        name: [{required: true, message: "必填项", trigger: ["blur", "change"]}],
        hospitalArea: [{required: true, message: "必填项", trigger: ["blur", "change"]}],
        floorsOnGround: [{required: true, message: "必填项", trigger: ["blur", "change"]}],
        floorsUnderground: [{required: true, message: "必填项", trigger: ["blur", "change"]}]
      },
      options: []
    };
  },
  methods: {
    inputChange (e) {
      let res = /^\d+$/
      if(!(e.target.value && res.test(e.target.value))) {
        e.target.value = ''
        this.$messageTips(this, "error", '层高应为大于0的正整数');
      }
    },
    handleClose() {
      this.$router.go(-1)
    },
    //删除数组里面删除的图片地址
    handleReportRemove(file, fileList) {
      this.imgObj.reportImg = this.sliceArr(this.imgObj.reportImg, file, "key");
    },
    // 保存上传的图片地址
    handleReportContractSuccess(response, file, fileList) {
      this.imgObj.reportImg.push({
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
      this.popTitle = "新建质控";
    },
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createBuilding";
          if (this.detailId) {
            url = "updateBuilding";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj);
          params.buildingPicture =
            this.imgObj.reportImg.length > 0
              ? JSON.stringify(this.imgObj.reportImg)
              : "";
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.$router.go(-1)
              this.$messageTips(this, "success", tips + "成功");
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    emitInfo(row) {
      row.actionUserId = String(row.actionUserId);
      Object.assign(this.infoQueryObj, row);
      this.filelistObj.reportList =
        (this.infoQueryObj.reportUrlList &&
          JSON.parse(this.infoQueryObj.reportUrlList)) ||
        [];
      this.imgObj.reportImg =
        (this.infoQueryObj.reportUrlList &&
          JSON.parse(this.infoQueryObj.reportUrlList)) ||
        [];
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.findByIdBuilding({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
    api.areaList({pageNum: 1, pageSize: 100}).then(rs => {
      if (rs.code === 200 && rs.data.totalCount > 0) {
        this.options = rs.data.list
      }
    })
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