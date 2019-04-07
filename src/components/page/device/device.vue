<template>
  <div class="layout_inner">
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
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
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
      <el-table-column prop="extra" label="其他扩展信息" width="180">
      </el-table-column>
      <el-table-column prop="orgName" label="机构" width="180">
      </el-table-column>
      <el-table-column prop="userId" label="创建者ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
          <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button type="text" class="delete-btn-color" icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="'详情'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :close-on-click-modal="false" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'urlList'?24:6">
            <div v-if="item.id == 'urlList'">
              <label>{{item.label}}</label>:
              <span>
                <fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow>
              </span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>:
              <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else>
              <label>{{item.label}}</label>:
              <span>{{item.value}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="log-btn-container">
        <el-button @click="popShow = false">取消</el-button>
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
let arr = [
  {
    id: "macAddr",
    label: "MAC地址",
    value: ""
  },
  {
    id: "model",
    label: "设备型号",
    value: ""
  },
  {
    id: "kind",
    label: "物联设备类别",
    value: ""
  },

  {
    id: "ctime",
    label: "创建时间",
    value: ""
  },
  {
    id: "mtime",
    label: "更新时间",
    value: ""
  },
  {
    id: "extra",
    label: "其他扩展信息",
    value: ""
  },
  {
    id: "urlList",
    label: "设备资料",
    value: ""
  }
];
export default {
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    return {
      api,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "iotDeviceList",
      arr,
      popShow: false,
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
    seeDetail(row) {
      arr.forEach(item => {
        item.value = row[item.id] || "";
      });
      this.popShow = true;
    },
    addAsset() {
      this.$router.push("/page/deviceAdd");
    },
    emitInfo(row) {
      this.$router.push("/page/deviceAdd?id=" + row.id);
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


