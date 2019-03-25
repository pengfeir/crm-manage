<template>
  <div class="ever-bread-crumb">
    <el-button @click="go" class="diy-btn-style"><i class="el-icon-arrow-left"></i></el-button>
    <span>{{showTitle}}</span>
  </div>
</template>
<script>
export default {
  props:['showTitle', 'isAddEdit'],
  data () {
    return {
      title :'',
      isShow: false,
      id :this.$route.query.id || this.$route.params.id
    }
  },
  watch: {
    $route: {
      handler (value) {
        this.id = this.$route.query.id || this.$route.params.id
        console.log(this.id, 'head')
        this.init()
      },
      immediate: true
    }
  },
  created() {
    
  },
  methods: {
    init () {
      this.isShow = !this.isAddEdit
      if (this.id) {
        this.showTitle = '编辑'
      } else {
        this.showTitle = '新建'
      }
      if (this.showTitle) {
        this.title = this.showTitle
      }
    },
    go () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .ever-bread-crumb {
    margin-bottom: 10px;
  }
  .diy-btn-style {
    padding: 3px 4px;
    margin-right: 5px;
  }
</style>

