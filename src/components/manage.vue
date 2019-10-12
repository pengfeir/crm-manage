<template>
  <div class="manage_page fillcontain">
    <left-menu @getinfo="getinfo" :status="status" :collapseVal="collapseVal" ></left-menu>
    <div style="height:100%;">
      <div class="right-content">
        <head-top :currentUser="currentUser" @collapse="collapse"></head-top>
        <div class="view-container">
          <router-view :currentUser="currentUser" @getstatus="getstatus"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import leftMenu from '@/components/menu.vue'
import headTop from '@/components/headtop.vue'
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
  data () {
    return {
      collapseVal: true,
      nickName: '',
      currentUser: {
        icon: '',
        id: 0,
        nickName: '',
        orgId: 0,
        roles: [],
        username: ''
      },
      status: {
        isGetMenu: false,
        data: ''
      }
    }
  },
  methods: {
    getinfo (data) {
      this.nickName = data.nickName
      Object.assign(this.currentUser, data)
    },
    getstatus (data) {
      Object.assign(this.status, data)
    },
    collapse (val) {
      this.collapseVal = !this.collapseVal
      if (this.collapseVal) {
        document.querySelector('.right-content').style.marginLeft = '68px'
        document.querySelector('.menu-container').style.width = '68px'
        document.querySelectorAll('.el-menu span').forEach(e => {
          e.style.display = 'none'
        })
        document.querySelectorAll('.el-menu-item').forEach(e => {
          e.style.display = 'none'
        })
      } else {
        document.querySelector('.right-content').style.marginLeft = '200px'
        document.querySelector('.menu-container').style.width = '200px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
.left-catalog {
  box-shadow: 2px 0 4px rgba(0,0,0,.1);
  background-color: #f8fafe;
  min-height: 100%;
}
.right-content {
  background-color: #f8fafe;
  height: 100%;
  margin-left:68px;
}
.view-container {
  background-color: #f8fafe;
  min-width: 980px;
}
</style>
