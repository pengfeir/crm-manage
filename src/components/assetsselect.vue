<template>
    <div>
        <el-select v-model="select" placeholder="请选择" clearable>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sn }}</span>
            </el-option>
        </el-select>
    </div>

</template>
<script>
import api from '@/api/api'
export default {
  props: {
    value: {
      default: ''
    }
  },
  data () {
    return {
      options: [
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let params = {
          pageNum: 1,
          pageSize: 20000
        }
        let data = await api.assetList(params)
        this.options = data.data.list
      } catch (err) {}
    }
  },
  computed: {
    select: {
      set (newVal) {
        this.$emit('input', newVal)
      },
      get () {
        return this.value
      }
    }
  }
}
</script>
