const CompressionWebpackPlugin = require('compression-webpack-plugin')
// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vuex': 'Vuex',
  'axios': 'axios',
  'js-cookie': 'Cookies',
  'nprogress': 'NProgress',
  'echarts': 'echarts'
}
// // 是否使用gzip
// const productionGzip = true
// // 需要gzip压缩的文件后缀
// const productionGzipExtensions = ['js', 'css']
module.exports = {
  devServer: {
    // proxy: {
    //   '/manage': {
    //     target: 'http://47.104.232.127:8080/', // 对应自己的接口
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/manage': '/'
    //     }
    //   }
    // }
    proxy: 'http://47.104.232.127'

  },
  runtimeCompiler: true,
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      myConfig.externals = externals
      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      myConfig.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|html|css)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      myConfig.externals = externals
    }
    return myConfig
  }
}
