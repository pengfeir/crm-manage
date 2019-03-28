<template>
  <div class="fileshow">
    <ul class="clear">
      <li v-for="item in JSON.parse(fileurlList)" :key="item.key"><img :src="item.url" alt=""></li>
    </ul>
  </div>

</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    fileurlList: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.fileshow img {
  width: 50px;
  height: 50px;
}
.fileshow ul li {
  width: 50px;
  height: 50px;
  float: left;
  border: 1px solid #eaeaea;
  margin-left: 4px;
}
</style>

