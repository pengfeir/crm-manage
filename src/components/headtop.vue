<template>
	<div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<el-button type="text" @click="emitCollapse">
					<i class="el-icon-menu" style="font-size:18px;">123</i>
				</el-button>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="目录搜索" @select="handleSelect"></el-autocomplete>
			<el-dropdown @command="handleCommand" menu-align='start'>
				<div style="cursor: pointer;">欢迎您, {{currentUser.nickName || '--'}}</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="emitPassword">修改密码</el-dropdown-item>
					<el-dropdown-item command="signout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-dialog title="修改密码" :visible.sync="popShow" class="ui_dialog_02 spe carditem" :close-on-click-modal="false">
			<ever-form2 :schema="querySchema" v-model="queryObj" ref="form" :rules="rules" class="package-sale" :info="true" labelWidth="80px" label-position="right">
				<template slot="username">
					<el-input v-model="queryObj.username" type="text" :disabled="true"></el-input>
				</template>
				<template slot="oldPassword">
					<el-input v-model="queryObj.oldPassword" type="password" autocomplete="new-password"></el-input>
				</template>
				<template slot="newPassword">
					<el-input v-model="queryObj.newPassword" type="password" autocomplete="new-password"></el-input>
				</template>
				<template slot="checkPassword">
					<el-input v-model="queryObj.checkPassword" type="password" autocomplete="new-password"></el-input>
				</template>
				<template slot="default">
					<div></div>
				</template>
			</ever-form2>
			<div class="log-btn-container">
				<el-button type="primary" @click="prev">确认</el-button>
				<el-button @click="popShow=false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import api from "@/api/api.js";
let schema = [
  {
    name: "username",
    label: "用户名",
    comp: "custom"
  },
  {
    name: "oldPassword",
    label: "旧密码",
    comp: "custom"
  },
  {
    name: "newPassword",
    label: "新密码",
    comp: "custom"
  },
  {
    name: "checkPassword",
    label: "确认密码",
    comp: "custom"
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
export default {
  props: {
    currentUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let obj = this.createObjFromSchema(schema);
    let validatePass = (rule, value, callback) => {
      if (this.queryObj.newPassword !== this.queryObj.checkPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    let rules = {
      username: [{ required: true, message: "必填项", trigger: "blur" }],
      oldPassword: [{ required: true, message: "必填项", trigger: "blur" }],
      newPassword: [{ required: true, message: "必填项", trigger: "blur" }],
      checkPassword: [{ validator: validatePass, trigger: "blur" }]
    };
    return {
      querySchema: schema,
      queryObj: obj,
      baseImgPath: "",
      popShow: false,
      rules,
      restaurants: [],
      menuArr: [],
      state1: ""
    };
  },
  watch: {
    currentUser: {
      handler: function(val, oldval) {
        console.log(val, 1);
        if (val.menuArr.length > 0) {
          this.restaurants = this.loadAll();
        }
      },
      deep: true
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    flat(arr) {
      let flatarr = arr.reduce((total, cur) => {
        return total.concat(
          Array.isArray(cur.childMenus) && cur.childMenus.length > 0
            ? this.flat(cur.childMenus)
            : cur
        );
      }, []);
      flatarr.map(v => {
        v.value = v.menuName;
      });
      return flatarr;
    },
    loadAll() {
      return this.flat(this.currentUser.menuArr);
    },
    handleSelect(item) {
      this.$router.push(item.menuUrl);
      this.state1 = "";
    },
    emitCollapse() {
      this.$emit("collapse");
    },
    async handleCommand(command) {
      if (command == "emitPassword") {
        this.queryObj.username = this.currentUser.username;
        this.popShow = true;
      } else if (command == "signout") {
        window.localStorage.clear();
        this.$router.push("/page/login");
      }
    },
    prev() {
      this.$refs.form.$refs.form.validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.queryObj);
          delete params.checkPassword;
          api.updatePassword(params).then(rs => {
            if (rs.code === 200) {
              this.$messageTips(this, "success", "修改成功");
              window.localStorage.clear();
              this.$router.push("/page/login");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.el-autocomplete {
  margin-right: 10px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
.ui_dialog_02 /deep/ .el-col:nth-child(4) label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.header_container .el-input__inner {
  height: 32px;
  border-color: #bbbbbb;
}
</style>
