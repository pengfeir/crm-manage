<template>
  <div>
    <ever-bread-crumb :showTitle="'设备'"></ever-bread-crumb>
    <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right" :rules="rules">
          <template slot="urlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
    name: "area",
    label: "院区"
  },
  {
    name: "building",
    label: "楼名"
  },
  {
    name: "floorNo",
    label: "楼层"
  },
  {
    name: "roomNo",
    label: "房间号"
  },
  {
    name: "dept",
    label: "所属科室"
  },
  {
    name: "descr",
    label: "房间描述"
  },
  {
    name: "urlList",
    label: "房间资料",
    comp: "custom"
  },
  {
    name: "extra",
    label: "其他扩展信息"
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
      // 保存图片地址
      imgObj: {
        reportImg: []
      },
      // 回显图片地址
      filelistObj: {
        reportList: []
      },
      rules: {
        macAddr: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur"]
          }
        ]
      }
    }
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
      console.log(response, file);
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
          let url = "createRoom";
          if (this.detailId) {
            url = "updateRoom";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.queryObj);
           params.urlList =
        this.imgObj.reportImg.length > 0
          ? JSON.stringify(this.imgObj.reportImg)
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
      this.filelistObj.reportList =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) ||
        [];
      this.imgObj.reportImg =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) ||
        [];
    },
    clearInfo() {
      Object.keys(this.imgObj).map(key => {
        this.imgObj[key] = [];
      });
      Object.keys(this.filelistObj).map(key => {
        this.filelistObj[key] = [];
      });
    },
  },
  created (){
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id
      api.roomFindById({id: this.detailId}).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data)
        }
      })
    }
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

