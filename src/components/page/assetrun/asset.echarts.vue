<template>
    <div>
      <echarts-container :id="id"></echarts-container>
    </div>
</template>
<script>
import echartsContainer from '@/components/page/echarts/echartscontainer'
export default {
  components: {
    echartsContainer
  },
  data () {
    return {
      id: this.$route.query.id,
      types: ''
    }
  },
  methods: {
  },
  mounted () {
    this.id = this.$route.query.id
  }
}
</script>
