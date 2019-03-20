/*
 * @Author: renpengfei
 * @Date: 2019-03-18 15:55:28
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-18 18:51:10
 */

let MyPlugin = {}
MyPlugin.install = (Vue) => {
  /**
 * 获取localStorage
 */
  Vue.prototype.getStore = name => {
    return window
      .localStorage
      .getItem(name)
  }
  /**
 * 删除localStorage
 */
  Vue.prototype.removeStore = name => {
    return window
      .localStorage
      .removeItem(name)
  }
}
export { MyPlugin }
