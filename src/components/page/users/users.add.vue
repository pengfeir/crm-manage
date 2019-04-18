<template>
  <div>
    <ever-bread-crumb :showTitle="'账号'"></ever-bread-crumb>
    <div class="layout_inner">
      <ever-form2
        :schema="querySchema" 
        v-model="queryObj"
        ref="form"
        class="package-sale"
        :info="true"
        :rules="rules"
        labelWidth="80px"
        label-position="right">
        <template slot="password">
          <el-input v-model="queryObj.password" type="password" autocomplete="new-password"></el-input>
        </template>
        <template slot="checkpassword">
          <el-input v-model="queryObj.checkpassword" type="password" autocomplete="new-password"></el-input>
        </template>
        <template slot="orgId">
          <el-select v-model="queryObj.orgId" :disabled="!superAdmin" placeholder="请选择">
            <el-option v-for="item in orgs" :key="item.id" :label="item.orgName" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="roleIds">
          <el-select v-model="queryObj.roleIds" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="icon">
          <el-select v-model="queryObj.icon" placeholder="请选择">
            <el-option v-for="item in iconoptions" :key="item.id" :label="item.name" :value="item.id">
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
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import roleTree from '@/plugins/roletree'
console.log(roleTree)

export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    let schema = [
      {
        name: "username",
        label: "账号"
      },
      {
        name: "password",
        label: "密码",
        comp: "custom"
      },
      {
        name: "checkpassword",
        label: "确认密码",
        comp: "custom"
      },
      {
        name: "orgId",
        label: "机构",
        comp: "custom"
      },
      {
        name: "roleIds",
        label: "菜单",
        comp: "custom"
      },
      {
        name: "icon",
        label: "角色",
        comp: "custom"
      },
      {
        name: "nickName",
        label: "用户名"
      },
      {
        name: "email",
        label: "邮箱"
      },
      {
        name: "note",
        label: "备注"
      }
    ];
    let validatePass = (rule, value, callback) => {
      if (this.detailId) {
        if (
          this.queryObj.password &&
          this.queryObj.password !== this.queryObj.checkpassword
        ) {
          callback(new Error("密码不一致"));
        } else {
          callback();
        }
      } else {
        if (this.queryObj.password !== this.queryObj.checkpassword) {
          callback(new Error("密码不一致"));
        } else {
          callback();
        }
      }
    };
    let validatePasss = (rule, value, callback) => {
      if (this.detailId) {
        callback();
      } else {
        if (!this.queryObj.password) {
          callback(new Error("密码不能为空"));
        } else {
          callback();
        }
      }
    };
    let rules = {
      username: [{ required: true, message: "必填项", trigger: "blur" }],
      password: [{ validator: validatePasss, trigger: "blur" }],
      checkpassword: [{ validator: validatePass, trigger: "blur" }],
      orgId: [{ required: true, message: "必填项", trigger: "blur" }],
      roleIds: [{ required: true, message: "必填项", trigger: "blur" }],
      nickName: [{ required: true, message: "必填项", trigger: "blur" }],
      icon: [{ required: true, message: "必填项", trigger: ["blur,change"] }]
    };
    var obj = this.createObjFromSchema(schema)
    obj.roleIds = []
    obj.orgId = this.getStore('orgId')
    return {
      api,
      rules,
      querySchema: schema,
      queryObj: obj,
      detailId: this.$route.query.id,
      superAdmin: true,
      options: [],
      iconoptions: [],
      orgs: []
    }
  },
  created () {
    this.detailId = this.$route.query.id || ''
    this.init()
  },
  methods: {
    init () {
      this.getRoles()
      this.getOrgs()
      if (Number(this.currentUser.orgId) === 0) {
        this.superAdmin = true;
      } else {
        this.obj.orgId = this.currentUser.orgId;
        this.superAdmin = false;
      }
      if (this.detailId) {
        this.getInfo()
      }
    },
    getInfo () {
      api.userList({id: this.detailId}).then(rs => {
        this.queryObj = rs.data[0]
      })
    },
    getRoles () {
      api.roleList({name:'', id: ''}).then(rs => {
        this.options = rs.data || []
      })
    },
    getOrgs () {
      api.agencyList({pageNum: 0, pageSize: 100}).then(rs => {
        this.orgs = rs.data.list || []
      })
    },
    handleCheckChange (val) {
      console.log(val)
    },
    prev() {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let url = "userCreate";
          let title = "保存成功";
          let params = Object.assign({}, this.queryObj);
          delete params.checkpassword;
          if (this.detailId) {
            url = "userUpdate";
            params.id = this.detailId;
            title = "修改成功";
            if (!params.password) {
              delete params.password;
            }
          }
          api[url](params).then(rs => {
            if (rs.code === 200) {
              this.$messageTips(this, "success", title);
              this.$emit("getstatus", {
                data: new Date().getTime(),
                isGetMenu: true
              });
              this.$router.go(-1);
            }
          });
        }
      });
    },
    cancel () {
      this.$router.go(-1)
    }
  },
  watch: {
    currentUser: {
      handler(value) {
        if (value.icon == 0) {
          this.iconoptions = [
            {
              id: "1",
              name: "管理员"
            },
            {
              id: "2",
              name: "用户"
            }
          ];
        } else {
          this.iconoptions = [
            {
              id: "2",
              name: "用户"
            }
          ];
        }
      },
      immediate: true
    }
  }
}
</script>

