/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:46:59
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-04-25 17:50:29
 */
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
    proxy: 'http://47.105.162.41'

  },
  runtimeCompiler: true
}
