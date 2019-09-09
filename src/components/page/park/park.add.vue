<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'院区'"></ever-bread-crumb>
    <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="130px" label-position="right">
      <template slot="designPicture">
        <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
    label: "院区名称"
  },
  {
    name: "area",
    label: "使用面积(平米)"
  },
  {
    name: "designPicture",
    label: "设计图",
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
        assetId: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      Object.keys(this.filelistObj).map(v => {
        this.filelistObj[v] = [];
      });
      this.popShow = false;
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
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createArea";
          if (this.detailId) {
            url = "updateArea";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj);
          console.log(this.imgObj.reportImg, 1112233)
          params.designPicture =
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
      Object.assign(this.infoQueryObj, row);
      this.filelistObj.reportList =
        (this.infoQueryObj.designPicture &&
          JSON.parse(this.infoQueryObj.designPicture)) ||
        [];
      this.imgObj.reportImg =
        (this.infoQueryObj.designPicture &&
          JSON.parse(this.infoQueryObj.designPicture)) ||
        [];
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.findByIdArea({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
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
</style>