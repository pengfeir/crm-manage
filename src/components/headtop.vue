<template>
	<div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<div style="cursor: pointer;">欢迎您, {{nickName}}</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">修改密码</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	props: {
    nickName: {
      default: ""
    }
  },
  data() {
		
    return {
      baseImgPath: "",
    };
  },
  methods: {
    async handleCommand(command) {
      if (command == "home") {
      } else if (command == "signout") {
        window.localStorage.clear();
        this.$router.push("/page/login");
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
