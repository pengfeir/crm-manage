<template>
    <div>
      <div class="main-head">
        <ever-form2
          :schema="querySchema" 
          v-model="queryObj"
          @query="query"
          ref="form"
          class="package-sale"
          :info="true"
          :labelWidth="140"
          label-position="right"
          :nosubmit="true"
          :inline="true">
          <template slot="btn">
            <el-button @click="query">查询</el-button>
          </template>
          <template slot="rightbtn">
            <router-link :to="'/card/selftariffsadd'"><el-button type="primary">新建</el-button></router-link>
          </template>
        </ever-form2>
      </div>
    </div>
</template>
<script>
let schema = [
  {
    name: 'name',
    label: '名称'
  },
  {
    name: 'btn',
    label: '',
    comp: 'custom'
  },
  {
    label: '',
    name: 'rightbtn',
    comp: 'custom'
  }
]
export default {
  data () {
    var obj = {name: ''};
    return {
      querySchema: schema,
      queryObj: obj,
    }
  },
  methods: {
    query () {
      this.$messageTips(this, 'success', '禁用成功')
    }
  }
}
</script>

