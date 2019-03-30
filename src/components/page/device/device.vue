<template>
  <div v-loading.body="loading">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="macAddr" label="MAC地址" width="180" fixed>
      </el-table-column>
      <el-table-column prop="model" label="设备型号">
      </el-table-column>
      <el-table-column prop="kind" label="物联设备类别" width="180">
        <template slot-scope="scope">
          {{scope.row.kind | deviceStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间">
      </el-table-column>
      <el-table-column prop="mtime" label="更新时间" width="150">
      </el-table-column>
      <el-table-column prop="urlList" label="设备资料" width="250">
        <template slot-scope="scope">
          <fileshow :type="'img'" :fileurlList="scope.row.urlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="extra" label="其他扩展信息">
      </el-table-column>
      <el-table-column prop="orgName" label="机构" width="180">
      </el-table-column>
      <el-table-column prop="userId" label="创建者ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
    </el-pagination>
    <el-dialog :title="popTitle" :visible.sync="popShow" class="ui_dialog_02 spe carditem" :close-on-click-modal="false" :before-close="handleClose">
      <div class="scroll">
        <ever-form2 :schema="infoQuerySchema" v-model="infoQueryObj" ref="form" :rules="rules" class="package-sale" labelWidth="180px" label-position="right">
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
      <div class="log-btn-container">
        <el-button type="primary" @click="prev">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from "@/plugins/list";
import api from "@/api/api";
import token from "@/plugins/getUploadToken";
let schema = [
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
    name: "model",
    label: "设备型号"
  },
  {
    name: "btn",
    label: "",
    comp: "custom"
  },
  {
    label: "",
    name: "rightbtn",
    comp: "custom"
  }
];
let infoSchema = [
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
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    var infoObj = this.createObjFromSchema(infoSchema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "iotDeviceList",
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
        macAddr: [
          {
            required: true,
            message: "必填项",
            trigger: ["blur"]
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
      this.popTitle = "新建物联设备";
    },
    prev(id) {
      let url = "createIotDevice";
      if (this.detailId) {
        url = "updateIotDevice";
      }
      let tips = this.detailId ? "更新" : "创建";
      let params = Object.assign({}, this.infoQueryObj);
      params.urlList =
        this.imgObj.reportImg.length > 0
          ? JSON.stringify(this.imgObj.reportImg)
          : "";
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          api[url](params).then(rs => {
            this.popShow = false;
            if (rs.code === 200) {
              this.query();
              this.$messageTips(this, "success", tips + "成功");
            } else {
              this.$messageTips(this, "error", tips + "失败");
            }
          });
        }
      });
    },
    emitInfo(row) {
      this.popTitle = "编辑物联设备";
      this.detailId = row.id;
      Object.assign(this.infoQueryObj, row);
      this.filelistObj.reportList =
        (this.infoQueryObj.urlList && JSON.parse(this.infoQueryObj.urlList)) ||
        [];
      this.imgObj.reportImg =
        (this.infoQueryObj.urlList && JSON.parse(this.infoQueryObj.urlList)) ||
        [];
      this.popShow = true;
    },
    delInfo(row) {
      this.$confirm("确定要删除该物联设备记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.deleteIotDevice({ id: row.id });
            if (data && data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.query();
            }
          } catch (err) {
            console.log(err);
          }
        })
        .then(() => {});
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


