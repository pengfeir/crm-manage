<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <left-menu></left-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;background-color:#ebedef;">
                <head-top></head-top>
                <div class="view-container">
                  <!-- <keep-alive> -->
                    <router-view></router-view>
                  <!-- </keep-alive> -->
                </div>  
            </el-col>
        </el-row>
    </div>
</template>
<script>
import leftMenu from "@/components/menu.vue";
import headTop from "@/components/headtop.vue"
export default {
  components: {
    leftMenu,
    headTop
  },
  computed: {
    // defaultActive: function() {
    //   return this.$route.path.replace("/", "");
    // }
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
</style>
