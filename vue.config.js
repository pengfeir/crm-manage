/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:46:59
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-04-17 15:12:34
 */

// vue.config.js 修改
const path = require('path')
 
function resolve(dir) {
 return path.join(__dirname, './', dir)
}
 
// cdn预加载使用
const externals = {
 'echarts': 'echarts'
}
 
const cdn = {
  // 开发环境
  dev: { 
    css: [
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
    ],
    js: [
      'https://cdn.bootcss.com/echarts/3.7.0/echarts.min.js'
    ]
  }
}
 
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
    }
    if (process.env.NODE_ENV === 'development') {
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  }
}