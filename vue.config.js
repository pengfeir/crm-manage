/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:46:59
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-18 15:20:52
 */
module.exports = {
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://47.104.232.127:8080/', // 对应自己的接口
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
    proxy: 'http://47.104.232.127:8080/'
  }
}
