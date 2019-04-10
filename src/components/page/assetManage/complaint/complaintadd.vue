<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'投诉'"></ever-bread-crumb>
    <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="120px" label-position="right">
      <template slot="urlList">
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
import token from "@/plugins/getUploadToken";
import api from "@/api/api";
let infoSchema = [
  {
    name: "assetId",
    label: "资产名称",
    comp: "assets-select"
  },
  {
    name: "dept",
    label: "事件发生的科室"
  },
  {
    name: "descr",
    label: "事件描述"
  },
  {
    name: "level",
    label: "严重类别",
    comp: "el-select",
    props: {
      options: [
        {
          id: "10",
          name: "非常严重"
        },
        {
          id: "20",
          name: "严重"
        },
        {
          id: "30",
          name: "一般"
        },
        {
          id: "40",
          name: "较轻"
        },
        {
          id: "50",
          name: "很轻"
        }
      ]
    }
  },
  {
    name: "urlList",
    label: "投诉资料",
    comp: "custom"
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
    return {
      api,
      infoQueryObj: infoObj,
      infoQuerySchema: infoSchema,
      popShow: false,
      popTitle: "新建",
      detailId: "",
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
          let url = "createComplaint";
          if (this.detailId) {
            url = "updateComplaint";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj);
          params.urlList =
            this.imgObj.reportImg.length > 0
              ? JSON.stringify(this.imgObj.reportImg)
              : "";
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.$router.go(-1);
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
        (this.infoQueryObj.urlList && JSON.parse(this.infoQueryObj.urlList)) ||
        [];
      this.imgObj.reportImg =
        (this.infoQueryObj.urlList && JSON.parse(this.infoQueryObj.urlList)) ||
        [];
      this.popShow = true;
    }
  },
  created () {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id;
      api.complaintFindById({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data);
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
