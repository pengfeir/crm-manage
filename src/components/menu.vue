<template>
    <div>
        <el-menu  router  style="min-height: 100%;"  background-color="#324157" text-color="#bfcbd9"
      active-text-color="#20a0ff">
            <template v-for="amenu in menuArr">
                <!-- 有多级菜单 -->
                <el-submenu :index="amenu.menuUrl" v-if="amenu.childMenus.length>0" :key="amenu.menuUrl">
                    <template slot="title">
                        <i class="el-icon-location"></i>
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
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{amenu.menuName}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
  data() {
    return {
      menuArr: [
        {
          menuName: "机构设置",
          menuUrl: "1",
          childMenus: [
            {
              menuName: "权限管理",
              menuUrl: "1-1",
              childMenus: [
                {
                  menuName: "账号管理",
                  menuUrl: "/manage/group",
                  childMenus: []
                },
                {
                  menuName: "角色管理",
                  menuUrl: "",
                  childMenus: []
                }
              ]
            },
            {
              menuName: "机构管理",
              menuUrl: "1-2",
              childMenus: [
                {
                  menuName: "机构设置",
                  menuUrl: "/manage/agencystaffs",
                  childMenus: []
                },
              ]
            },
            {
              menuName: "菜单管理",
              menuUrl: "1-3",
              childMenus: []
            }
          ]
        },
        {
          menuName: "导航2",
          menuUrl: "/24234",
          childMenus: []
        },
        {
          menuName: "权限管理",
          menuUrl: "3",
          childMenus: [
            {
              menuName: "人员管理",
              menuUrl: "/manage/group",
              childMenus: [
              ]
            },
            {
              menuName: "角色管理",
              menuUrl: "role",
              childMenus: [
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    // defaultActive: function() {
    //   return this.$route.path.replace("/", "");
    // }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
</style>


