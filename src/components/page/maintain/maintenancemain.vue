<template>
  <div class="layout_inner" :key="'main'">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="actionUserId">
          <el-select v-model="queryObj.actionUserId" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" label="序号" fixed>
      </el-table-column>
      <el-table-column prop="assetName" label="设备名称" fixed>
      </el-table-column>
      <el-table-column prop="actionUserId" label="实际保养人">
      </el-table-column>
      <el-table-column prop="contact" label="联系方式">
      </el-table-column>
      <el-table-column prop="vender" label="服务提供方" width="150">
      </el-table-column>
      <el-table-column prop="progress" label="保养进度">
        <template slot-scope="scope">
          {{scope.row.progress | mainStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="planDate" label="保养计划时间" width="180">
      </el-table-column>
      <el-table-column prop="reportUrlList" label="保养报告" width="150">
        <template slot-scope="scope">
          <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.reportUrlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-search" @click="seeDetail(scope.row)">详情</el-button>
          <el-button type="text" icon="el-icon-edit" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button type="text" class="delete-btn-color"  icon="el-icon-delete" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="20" :layout="layout" :total="totalCount">
      </el-pagination>
    </div>
    <div style="height: 50px;visibility: hidden;overflow: hidden;">
      <el-table id="excelTable" :data="tableData" style="width: 100%" border stripe max-height="650">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="assetName" label="设备名称">
        </el-table-column>
        <el-table-column prop="actionUserId" label="实际保养人">
        </el-table-column>
        <el-table-column prop="contact" label="联系方式">
        </el-table-column>
        <el-table-column prop="vender" label="服务提供方">
        </el-table-column>
        <el-table-column prop="actionDate" label="保养实际发生时间">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间">
        </el-table-column>
        <el-table-column prop="mtime" label="更新时间">
        </el-table-column>
        <el-table-column prop="planDate" label="保养计划时间">
        </el-table-column>
        <el-table-column prop="reportUrlList" label="保养报告">
          <template slot-scope="scope">
            <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.reportUrlList"></fileshow>
          </template>
        </el-table-column>
        <el-table-column prop="extra" label="其他扩展信息">
        </el-table-column>
        <el-table-column prop="orgName" label="机构">
        </el-table-column>
        <el-table-column prop="userId" label="创建者ID">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="'保养详情'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'reportUrlList'?24:6">
            <div v-if="item.id == 'reportUrlList'">
               <label>{{item.label}}</label>: <span><fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow></span>
            </div>
            <div v-else-if="item.id == 'isDedicatedAppendant'">
              <label>{{item.label}}</label>: <span>{{item.value | getAppendant}}</span>
            </div>
            <div v-else>
              <label>{{item.label}}</label>: <span>{{item.value}}</span>
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
let schema = [
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
    label: "服务提供方",
    name: "vender"
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
    id: "assetName",
    label: "设备名称",
    value: ''
  },
  {
    id: "actionUserId",
    label: "实际保养人",
    value: ''
  },
  {
    id: "vender",
    label: "服务提供方",
    value: ''
  },
  {
    id: "actionDate",
    label: "保养实际发生时间",
    value: ''
  },
  {
    id: "planDate",
    label: "保养计划时间",
    value: ''
  },
  {
    id: "mtime",
    label: "更新时间",
    value: ''
  },
  {
    id: "ctime",
    label: "创建时间",
    value: ''
  },
  {
    id: "contact",
    label: "联系方式",
    value: ''
  },
  {
    id: "extra",
    label: "其他扩展信息",
    value: ''
  },
  {
    id: "reportUrlList",
    label: "保养报告",
    value: ''
  }
]
export default {
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    obj.kind = 'maintain'
    return {
      api,
      arr,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      options: [],
      popShow: false,
      listApiName: "mainList"
    };
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '设备保养.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    seeDetail (row) {
      arr.forEach(item => {
        item.value = row[item.id] || ''
      })
      this.popShow = true
    },
    addAsset() {
      this.$router.push('/page/maintenanceMainadd')
    },
    emitInfo(row) {
      this.$router.push('/page/maintenanceMainadd?id=' + row.id)
    },
    delInfo(row) {
      this.$confirm("确定要删除该保养记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.deleteMain({ id: row.id });
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
  },
  created () {
    api.userList({id:'', name: ''}).then(rs => {
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