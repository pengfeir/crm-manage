<template>
    <div>
        <el-select v-model="select" placeholder="请选择" clearable>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
    </div>

</template>
<script>
import api from "@/api/api";
export default {
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      options: [
      ]
    };
  },
  created(){
      this.getList()
  },
  methods: {
    async getList() {
      try {
        let data = await api.unPageList();
        this.options = data.data
      } catch (err) {}
    }
  },
  computed: {
    select: {
      set(newVal) {
        this.$emit("input", newVal);
      },
      get() {
        return this.value;
      }
    }
  }
};
</script>
