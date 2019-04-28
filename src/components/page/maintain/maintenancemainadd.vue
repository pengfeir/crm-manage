<template>
  <div class="layout_inner">
    <ever-bread-crumb :showTitle="'设备保养'"></ever-bread-crumb>
    <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="130px" label-position="right">
      <template slot="reportUrlList">
        <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </template>
      <template slot="actionUserId">
        <el-select v-model="infoQueryObj.actionUserId" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.username"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template slot="vender">
        <el-autocomplete class="inline-input" v-model="infoQueryObj.vender" :fetch-suggestions="queryComp" placeholder="请输入内容" style="width: 100%"></el-autocomplete>
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
    name: "assetId",
    label: "设备名称",
    comp: "assets-select"
  },
  {
    name: "actionUserId",
    label: "实际保养人",
    comp: "custom"
  },
  {
    name: "actionDate",
    label: "保养实际发生时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "contact",
    label: "联系方式"
  },
  {
    name: "planDate",
    label: "保养计划时间",
    comp: "el-date-picker",
    props: {
      type: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  },
  {
    name: "reportUrlList",
    label: "保养报告",
    comp: "custom"
  },
  {
    name: "vender",
    label: "服务提供方",
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
      detailId: "",
      options: [],
      venderOptions: JSON.parse(this.getStore("mainVenderOptions")) || [],
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
        ],
        actionUserId: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur", "change"]
          }
        ],

      }
    };
  },
  methods: {
    async queryComp(query, cb) {
      let a = JSON.parse(JSON.stringify(this.venderOptions));
      cb(a);
    },
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
      this.popTitle = "新建保养";
    },
    prev(id) {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "createMain";
          if (this.detailId) {
            url = "updateMain";
          }
          let tips = this.detailId ? "更新" : "创建";
          let params = Object.assign({}, this.infoQueryObj);
          params.kind = 'maintain'
          params.reportUrlList =
            this.imgObj.reportImg.length > 0
              ? JSON.stringify(this.imgObj.reportImg)
              : "";
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.setStore();
              this.$router.go(-1);
              this.$messageTips(this, "success", tips + "成功");
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    setStore () {
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
      api.mainFindById({id: this.detailId}).then(rs => {
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