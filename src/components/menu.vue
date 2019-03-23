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
import list from '@/plugins/list'
import roleTree from '@/plugins/roletree'
export default {
  data() {
    return {
      menuArr: roleTree
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


