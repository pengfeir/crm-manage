<template>
    <div class="menu-container">
        <el-menu router style="min-height: 100%;" active-text-color="#20a0ff" :default-active="defaultActive" :collapse="collapseVal">
            <template v-for="amenu in menuArr">
                <!-- 有多级菜单 -->
                <el-submenu :index="amenu.menuUrl" v-if="amenu.childMenus.length>0" :key="amenu.menuUrl">
                    <template slot="title">
                        <i :class="amenu.icon"></i>
                        <span>{{amenu.menuName}}</span>
                    </template>
                    <template v-for="secmenu in amenu.childMenus">
                        <el-menu-item :index="secmenu.menuUrl" v-if="secmenu.childMenus.length===0" :key="secmenu.menuUrl">{{secmenu.menuName}}</el-menu-item>
                        <el-submenu :index="secmenu.menuUrl" v-if="secmenu.childMenus.length>0" :key="secmenu.menuUrl">
                            <template slot="title">{{secmenu.menuName}}</template>
                            <el-menu-item :index="thimenu.menuUrl" v-for="thimenu in secmenu.childMenus" :key="thimenu.menuUrl">{{thimenu.menuName}}</el-menu-item>
                        </el-submenu>
                    </template>
                </el-submenu>
                <!-- 无多级菜单 -->
                <el-menu-item :index="amenu.menuUrl" v-if="amenu.childMenus.length===0" :key="amenu.menuUrl">
                    <span slot="title">{{amenu.menuName}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import list from "@/plugins/list";
import roleTree from "@/plugins/roletree";
import api from "@/api/api.js";
export default {
  props: {
    status: {
      type: Object,
      default: () => {}
    },
    collapseVal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuArr: [],
      roles: [],
      icon: ""
    };
  },
  watch: {
    status: {
      handler: function(val, oldval) {
        console.log(val);
        if (val.isGetMenu) {
          this.getMenuTree();
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path;
    }
  },
  created() {
    this.getMenuTree();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取设置的菜单
    getSetTree(arr, id) {
      let newArr = arr.reduce((total, cur) => {
        if (this.getFilterRoles().includes(cur.auth)) {
          let childMenus = [];
          cur.childMenus.map(v => {
            //非超级管理员屏蔽机构
            if (
              this.getFilterRoles().includes(v.auth) &&
              v.auth !== "agencylist" &&
              ((v.auth !== "rolelist" && this.icon == 2) || this.icon == 1)
            ) {
              childMenus.push(v);
            }
          });
          total.push({
            menuName: cur.menuName,
            menuUrl: cur.menuUrl,
            auth: cur.auth,
            icon: cur.icon,
            level: cur.level,
            childMenus: childMenus
          });
        }
        return total;
      }, []);
      return newArr;
    },
    // 处理设置的菜单
    getFilterRoles() {
      if (this.roles <= 0) {
        return [];
      }
      let filterArr = this.roles.reduce((total, cur) => {
        total = total.concat(cur.description.split(","));
        return total;
      }, []);
      //   找出只勾选子节点的父节点
      let fatherArr = [];
      roleTree.map(v => {
        v.childMenus.map(z => {
          filterArr.map(k => {
            if (z.auth === k) {
              fatherArr.push(v.auth);
            }
          });
        });
      });
      return [...new Set(filterArr.concat(fatherArr))];
    },
    async getMenuTree() {
      try {
        let rolesRs = await api.userInfo();
        localStorage.setItem("currentUser", JSON.stringify(rolesRs.data));
        localStorage.setItem("icon", rolesRs.data.icon);
        // 超级管理员加载全部菜单
        if (!Number(rolesRs.data.orgId)) {
          this.menuArr = roleTree;
        } else {
          this.roles = rolesRs.data.roles;
          this.icon = rolesRs.data.icon;
          this.menuArr = this.getSetTree(roleTree, rolesRs.data.orgId);
        }
        rolesRs.data.menuArr = this.menuArr
        this.$emit("getinfo", rolesRs.data);
      } catch (err) {}
    }
  }
};
</script>
<style lang="less" scoped>
.menu-container {
  width: 200px;
  float: left;
  height: 100%;
  box-shadow: 2px 0 4px rgba(0,0,0,.1);
}
.iconfont{
  font-size: 14px;
  margin: 0 5px;
}
</style>


