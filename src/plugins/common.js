/*
 * @Author: renpengfei
 * @Date: 2019-03-18 15:55:28
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-22 11:33:57
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
  Vue.prototype.setStore = (key,value) => {
    return window.localStorage.setItem(key, value)
  }
  /**
 * 删除localStorage
 */
  Vue.prototype.removeStore = name => {
    return window
      .localStorage
      .removeItem(name)
  }
  Vue.prototype.$messageTips = (_this, type, msg, title) => {
    msg = msg || '网络开小差了！请稍后重试'
    title = title || '提示'
    _this.$notify({
      title: title,
      message: msg,
      type: type
    })
  }
  Vue.prototype.createObjFromSchema = (schema) => {
    let arr = {}
    schema.forEach(item => {
      arr[item.name] = arr[item.valType] || ''
    })
    return arr
  }
}
export { MyPlugin }
