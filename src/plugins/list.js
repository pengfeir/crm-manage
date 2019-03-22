var component = {
  mounted () {
    // if (!(this.queryObj && this.queryObj.requestSwitch)) {
    //   this.list()
    // }
  },
  data () {
    return {
      tableData: [],
      offset: 0,
      pagesize: Number(this.$route.query.pagesize) || 20,
      totalCount: 0,
      currentPage: this.current || 1,
      loading: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [10, 20, 30, 50, 100],
      current: Number(this.$route.query.page) || 1
    }
  },
  methods: {
    // 延迟400毫秒查询
    query () {
      setTimeout(queryObject => {
        this.queryObj = queryObject
        this.handleCurrentChange(1)
      } ,400)
    },
    list: function (refresh) {
      this.loading = true
      if (refresh) {
        this.current = 1
        this.offset = 0
      }
      var params = Object.assign({}, this.queryObj, this.listParams)
      for (let key in params) {
        if (params[key] === '' || key === 'requestSwitch') {
          delete params[key]
        }
      }
      params.offset = this.offset
      params.pagesize = this.pagesize
      params.sourceType = this.sourceType ? this.sourceType : ''
      try {
        this.tableData = []
        // this.listApiName 自定义api名称
        this.api[this.listApiName || 'list'](params).then(result => {
          this.loading = false
          if (result) {
            if (result.warningType) this.warningType = result.warningType
            if ('list' in result) {
              this.tableData = result.list
            } else if ('data' in result) {
              this.tableData = result.data
            } else {
              this.tableData = result
            }
            this.totalCount = result.totalCount ? result.totalCount : 0
            if (this.tableData && 'resultList' in this.tableData) {
              this.totalCount = this.tableData.totalCount
              this.tableData = this.tableData.resultList
            }
            if (this.tableData && !this.tableData[0]) {
              this.tableData = []
              this.emptyData = true
            }
            this.afterList && this.afterList(result)
          } else {
            this.emptyData = true
            this.totalCount = 0
          }
        })
      } catch (err) {
        this.loading = false
        this.emptyData = false
        // console.log(err)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.offset = (this.current - 1) * this.pagesize
      this.list()
    },
    handleCurrentChange (val) {
      this.current = val
      this.offset = (val - 1) * this.pagesize || 0
      this.list()
      return this.pageAfter && this.pageAfter(this.pagesize)
    },
  },
  watch: {
    'queryObj.requestSwitch': {
      handler (cur, old) {
        this.list('queryObj.requestSwitch', cur)
      }
    }
  }
}

export default component