<template>
  <div class="layout_inner">
    <div class="main-head">
      <ever-form2
        :schema="querySchema" 
        v-model="queryObj"
        @query="query"
        class="package-sale"
        :info="true"
        :labelWidth="140"
        label-position="right"
        :nosubmit="true"
        :inline="true">
        <template slot="btn">
          <el-button type="primary" @click="query">查询</el-button>
        </template>
        <template slot="rightbtn">
          <el-button type="primary" @click="addUsers">新建</el-button>
        </template>
      </ever-form2>
    </div>
    <el-table v-loading.body="loading" :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="nickName" align="center" label="用户名">
      </el-table-column>
      <el-table-column prop="username" align="center" label="账号">
      </el-table-column>
      <el-table-column prop="email" align="center" label="邮箱">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="更新时间">
      </el-table-column>
      <el-table-column prop="name" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="emitInfo(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="overflow:hidden;margin-bottom:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="20"
        :layout="layout"
        :total="totalCount">
      </el-pagination>
    </div> -->
    <el-dialog :title="dialogInfo.popTitle" :visible.sync="dialogInfo.popShow"  class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
      <ever-form2
        :schema="queryInfoSchema" 
        v-model="queryInfoObj"
        ref="form"
        :rules="rules"
        class="package-sale"
        :info="true"
        labelWidth="80px"
        label-position="right">
        <template slot="password">
          <el-input v-model="queryInfoObj.password" type="password" autocomplete="new-password"></el-input>
        </template>
        <template slot="checkpassword">
          <el-input v-model="queryInfoObj.checkpassword" type="password" autocomplete="new-password"></el-input>
        </template>
        <template slot="orgId">
          <el-select v-model="queryInfoObj.orgId" :disabled="!dialogInfo.superAdmin" placeholder="请选择">
            <el-option v-for="item in dialogInfo.orgs" :key="item.id" :label="item.orgName" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="roleIds">
          <el-select v-model="queryInfoObj.roleIds" multiple placeholder="请选择">
            <el-option v-for="item in dialogInfo.options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="default">
          <div></div>
        </template>
      </ever-form2>
      <div class="log-btn-container">
        <el-button type="primary" @click="prev">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import list from "@/plugins/list";
import roleTree from "@/plugins/roletree";
import api from "@/api/api";
let schema = [
  {
    name: "name",
    label: "用户名"
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
    name: "username",
    label: "账号"
  },
  {
    name: 'password',
    label: '密码',
    comp: 'custom'
  },
  {
    name: 'checkpassword',
    label: '确认密码',
    comp: 'custom'
  },
  {
    name: "orgId",
    label: "机构",
    comp: "custom"
  },
  {
    name: 'roleIds',
    label:'角色',
    comp: 'custom'
  },
  {
    name: 'nickName',
    label: '用户名'
  },
  {
    name: "email",
    label: "邮箱"
  },
  {
    name: 'note',
    label: '备注'
  }
];
export default {
  mixins: [list],
  data () {
    let obj = this.createObjFromSchema(schema)
    let infoObj = this.createObjFromSchema(infoSchema)
    infoObj.roleIds = []
    let validatePass = (rule, value, callback) => {
      if (this.dialogInfo.id) {
        if (this.queryInfoObj.password && this.queryInfoObj.password !== this.queryInfoObj.checkpassword) {
          callback(new Error('密码不一致'))
        } else {
          callback()
        }
      } else {
        if (this.queryInfoObj.password !== this.queryInfoObj.checkpassword) {
          callback(new Error('密码不一致'))
        } else {
          callback()
        }
      }
    }
    let validatePasss = (rule, value, callback) => {
      if (this.dialogInfo.id) {
        callback()
      } else {
        if (!this.queryInfoObj.password) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
    }
    let rules = {
      'username': [
        { required: true, message: '必填项', trigger: 'blur' }
      ],
      'password': [
        { validator: validatePasss, trigger: 'blur' }
      ],
      'checkpassword': [
        { validator: validatePass, trigger: 'blur' }
      ],
      'orgId': [
        { required: true, message: '必填项', trigger: 'blur' }
      ],
      'roleIds': [
        { required: true, message: '必填项', trigger: 'blur' }
      ],
      'nickName': [
        { required: true, message: '必填项', trigger: 'blur' }
      ]
    }
    return {
      api,
      rules,
      querySchema: schema,
      queryObj: obj,
      queryInfoSchema: infoSchema,
      queryInfoObj: infoObj,
      listApiName: 'userList',
      currentUser: JSON.parse(this.getStore('currentUser')),
      tableData: [],
      popShow: false,
      dialogInfo: {
        id: "",
        popTitle: "",
        popShow: false,
        superAdmin: false,
        orgs: [],
        options: []
      }
    };
  },
  created() {
    this.getRoles();
    this.getOrgs();
  },
  methods: {
    addUsers() {
      this.dialogInfo.popTitle = "新建账号";
      this.init();
      this.dialogInfo.popShow = true;
    },
    list() {
      api[this.listApiName]({ name: this.queryObj.name || "", id: "" }).then(
        rs => {
          if (rs.code === 200) {
            this.tableData = rs.data;
          }
        }
      );
    },
    emitInfo (row) {
      this.dialogInfo.popTitle = '编辑账号'
      this.dialogInfo.id = row.id
      this.queryInfoObj = Object.assign(this.queryInfoObj, row)
      this.init()
      this.dialogInfo.popShow = true
    },
    delInfo(row) {
      this.$confirm("确定要删除该账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            let data = await api.userDel({ id: row.id });
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
    },
    init () {
      if (this.currentUser.orgId === 0) {
        this.dialogInfo.superAdmin = true;
      } else {
        this.queryInfoObj.orgId = this.currentUser.orgId;
        this.dialogInfo.superAdmin = false;
      }
    },
    getInfo() {
      api.userList({ id: this.id }).then(rs => {
        this.queryInfoObj = rs.data[0];
      });
    },
    getRoles() {
      api.roleList({ name: "", id: "" }).then(rs => {
        this.dialogInfo.options = rs.data || [];
      });
    },
    getOrgs() {
      api.agencyList({ pageNum: 0, pageSize: 100 }).then(rs => {
        this.dialogInfo.orgs = rs.data.list || [];
      });
    },
    handleCheckChange(val) {
    },
    setCheck() {
      api.roleList({ name: "", id: this.id }).then(rs => {
        if (rs.code === 200 && rs.data.length > 0)
          this.queryObj.name = rs.data[0]["name"];
        this.$refs.tree.setCheckedKeys(rs.data[0]["description"].split(","));
      });
    },
    prev () {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = 'userCreate'
          let title = '保存成功'
          let params = Object.assign({}, this.queryInfoObj)
          delete params.checkpassword
          if (this.dialogInfo.id) {
            url = 'userUpdate'
            params.id = this.dialogInfo.id
            title = '修改成功'
            if (!params.password) {
              delete params.password
            }
          }
          api[url](params).then(rs => {
            if (rs.code === 200) {
              this.$messageTips(this, 'success', title)
              this.dialogInfo.popShow = false
              this.list()
            }
          })
        }
      });
    },
    cancel() {
      this.dialogInfo.popShow = false;
    },
    clearInfo () {
      this.queryInfoObj.username = ''
      this.queryInfoObj.password = ''
      this.queryInfoObj.checkpassword = ''
      this.queryInfoObj.orgId = ''
      this.queryInfoObj.nickName = ''
      this.queryInfoObj.email = ''
      this.queryInfoObj.note = ''
      this.queryInfoObj.roleIds = []
    }
  },
  watch: {
    $route: {
      handler(value) {
        if (value.path === "/page/rolelist") {
          this.query();
        }
      },
      immediate: true
    },
    "dialogInfo.popShow": {
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


