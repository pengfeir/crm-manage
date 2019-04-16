<template>
  <div class="layout_inner" v-loading.body="loading">
    <div class="main-head">
      <ever-form2 :schema="querySchema" v-model="queryObj" @query="query" ref="form" class="package-sale" :info="true" :labelWidth="140" label-position="right" :nosubmit="true" :inline="true">
        <template slot="btn">
          <el-button @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button style="margin-right:20px;" @click="exportExcel">导出</el-button>
          <el-button type="primary" @click="addAsset">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table :data="tableData" style="width: 100%" border stripe max-height="650">
      <el-table-column type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="assetName" align="center" label="设备名称">
      </el-table-column>
      <el-table-column prop="descr" align="center" label="事件描述">
      </el-table-column>
      <el-table-column prop="levelName" align="center" label="严重类别">
      </el-table-column>
      <el-table-column prop="urlList" label="投诉资料地址" width="150">
        <template slot-scope="scope">
          <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.urlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="extra" width="120" label="其他扩展信息">
      </el-table-column>
      <el-table-column prop="mtime" align="center" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="ctime" align="center" label="创建时间" width="180">
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
      <el-table-column prop="assetName" align="center" label="设备名称">
      </el-table-column>
      <el-table-column prop="descr" align="center" label="事件描述">
      </el-table-column>
      <el-table-column prop="levelName" align="center" label="严重类别">
      </el-table-column>
      <el-table-column prop="urlList" label="投诉资料地址" width="150">
        <template slot-scope="scope">
          <fileshow :type="'img'" :tailor="true" :isNoShowBtn="true" :fileurlList="scope.row.urlList"></fileshow>
        </template>
      </el-table-column>
      <el-table-column prop="extra" width="120" label="其他扩展信息">
      </el-table-column>
      <el-table-column prop="mtime" align="center" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="ctime" align="center" label="创建时间" width="180">
      </el-table-column>
    </el-table>
    </div>
    <el-dialog :title="'保养详情'" :visible.sync="popShow" class="ui_dialog_02 detail-log carditem" width="80%" :append-to-body="true">
      <div>
        <el-row>
          <el-col v-for="item in arr" :key="item.id" :span="item.id == 'urlList'?24:6">
            <div v-if="item.id == 'urlList'">
               <label>{{item.label}}</label>: <span><fileshow class="maxsize" :type="'img'" :fileurlList="item.value" :isNoShowBtn="false" :tailor="false"></fileshow></span>
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
import token from "@/plugins/getUploadToken";
import api from "@/api/api";
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
let schema = [
  {
    name: "assetId",
    label: "设备名称",
    comp: "assets-select"
  },
  {
    label: "严重类别",
    name: "level",
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
    id: "dept",
    label: "事件发生的科室",
    value: ''
  },
  {
    id: "descr",
    label: "事件描述",
    value: ''
  },
  {
    id: "levelName",
    label: "严重类别",
    value: ''
  },
  {
    id: "extra",
    label: "其他扩展信息",
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
    id: "urlList",
    label: "投诉资料",
    value: ''
  }
]
export default {
  mixins: [list, token],
  data() {
    var obj = this.createObjFromSchema(schema);
    return {
      api,
      arr,
      popShow: false,
      querySchema: schema,
      queryObj: obj,
      tableData: [],
      listApiName: "complaintList"
    };
  },
  methods: {
    exportExcel () {
      /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#excelTable'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '不良事件/投诉.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
    },
    seeDetail(row) {
      arr.forEach(item => {
        item.value = row[item.id] || ''
      })
      this.popShow = true
    },
    addAsset() {
      this.$router.push('/page/complaintadd')
    },
    emitInfo(row) {
      this.$router.push('/page/complaintadd?id=' + row.id)
    },
    delInfo(row) {
      this.$confirm("确定要删除该投诉记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          try {
            let data = await api.deleteComplaint({ id: row.id });
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


