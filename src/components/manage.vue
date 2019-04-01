<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <left-menu @getinfo="getinfo" :status="status"></left-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;background-color:#ebedef;">
        <head-top :currentUser="currentUser"></head-top>
        <div class="view-container">
          <router-view :currentUser="currentUser" @getstatus="getstatus"></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import leftMenu from "@/components/menu.vue";
import headTop from "@/components/headtop.vue";
export default {
  components: {
    leftMenu,
    headTop
  },
  computed: {
    // defaultActive: function() {
    //   return this.$route.path.replace("/", "");
    // }
  },
  data() {
    return {
      nickName: "",
      currentUser: {
        icon: "",
        id: 0,
        nickName: "",
        orgId: 0,
        roles: [],
        username: ""
      },
      status: {
        isGetMenu: false,
        data: ""
      }
    };
  },
  methods: {
    getinfo(data) {
      this.nickName = data.nickName;
      Object.assign(this.currentUser, data);
    },
    getstatus(data) {
      Object.assign(this.status, data);
    }
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
</style>
