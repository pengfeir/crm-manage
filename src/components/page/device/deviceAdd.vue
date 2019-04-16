<template>
    <div>
      <ever-bread-crumb :showTitle="'设备管理'"></ever-bread-crumb>
      <div class="scroll">
        <ever-form2 :schema="querySchema" v-model="queryObj" ref="form" class="package-sale" labelWidth="180px" label-position="right" :rules="rules">
          <template slot="urlList">
            <el-upload :action="uploadUrl" list-type="picture" :file-list="detailId?filelistObj.reportList:[]" :on-remove="handleReportRemove" :on-success="handleReportContractSuccess" :data="uploadData" :before-upload="beforeUploadGetKey">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
          <template slot="thresholdArr">
            <el-button size="small" type="primary" @click="popShow=true">设置</el-button>
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
      <el-dialog :title="'阀值设置'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="60%" :close-on-click-modal="false" :append-to-body="true">
        <div>
          <el-table :data="tableData" style="width: 100%" border stripe>
            <el-table-column prop="name" align="center" label="阀值类型">
            </el-table-column>
            <el-table-column prop="value1" align="center" label="设定值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value1" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value2" align="center" label="设定值2(预留)">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value2" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="deviation" align="center" label="允许误差">
              <template slot-scope="scope">
                <div style="display:flex">
                  <div><el-input v-model="scope.row.deviation" type="number"></el-input></div>
                  <div style="line-height: 1;position: relative;top: 12px;margin-left: 10px;">%</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="单位">
            </el-table-column>
          </el-table>
        </div>
        <div class="pop-btn" style="margin-top:20px;">
          <el-button @click="popShow=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
let schema = [
  {
    name: "macAddr",
    label: "MAC地址"
  },
  {
    name: "model",
    label: "设备型号"
  },
  {
    name: "kind",
    label: "物联设备类别",
    comp: "el-select",
    props: {
      options: [
        {
          id: "co",
          name: "协调器"
        },
        {
          id: "gw",
          name: "网关"
        },
        {
          id: "sensor",
          name: "监测终端"
        },
        {
          id: "qr",
          name: "二维码"
        },
        {
          id: "4g",
          name: "4G模块"
        }
      ]
    }
  },
  {
    name: "thresholdArr",
    label: "阀值",
    comp: "custom"
  },
  {
    name: "urlList",
    label: "设备资料",
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
    var obj = this.createObjFromSchema(schema);
    return {
      querySchema: schema,
      queryObj: obj,
      detailId: "",
      iotDeviceIdsOptions: [],
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
      },
      popShow: false,
      tableData: [
        {name: '关机电流阀值', value1: '',value2: '', deviation: '', company: 'A'},
        {name: '待机电流阀值', value1: '',value2: '', deviation: '', company: 'A'},
        {name: '激活电流阀值', value1: '',value2: '', deviation: '', company: 'A'},
        {name: '报警电流阀值', value1: '',value2: '', deviation: '', company: 'A'},
        {name: '故障电流阀值', value1: '',value2: '', deviation: '', company: 'A'},
        {name: '电压下限报警', value1: '',value2: '', deviation: '', company: 'V'},
        {name: '电压上限报警', value1: '',value2: '', deviation: '', company: 'V'}
      ]
    };
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
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
          let url = "createIotDevice";
          if (this.detailId) {
            url = "updateIotDevice";
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
              this.$router.go(-1);
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
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || [];
      this.imgObj.reportImg =
        (this.queryObj.urlList && JSON.parse(this.queryObj.urlList)) || [];
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
    }
  },
  created() {
    if (this.$route.query.id) {
      this.detailId = this.$route.query.id;
      api.findById({ id: this.detailId }).then(rs => {
        if (rs.code === 200) {
          this.emitInfo(rs.data);
        }
      });
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
};
</script>
<style lang="less" scoped>
  .pop-btn {
    .el-button--primary {
      color: #fff;
      background-color: #1c7bef;
      border-color: #1c7bef;
    }
    .el-button {
      margin-right: 20px;
      height: 36px;
      line-height: 36px;
      padding: 0 12px;
    }
  }
</style>

