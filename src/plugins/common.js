/*
 * @Author: renpengfei
 * @Date: 2019-03-18 15:55:28
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-29 14:46:46
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
  Vue.prototype.setStore = (key, value) => {
    return window
      .localStorage
      .setItem(key, value)
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
    _this.$notify({ title: title, message: msg, type: type })
  }
  Vue.prototype.createObjFromSchema = (schema) => {
    let arr = {}
    schema.forEach(item => {
      arr[item.name] = arr[item.valType] || ''
    })
    return arr
  }
  Vue.prototype.sliceArr = (arr, item, key) => {
    let newarr = arr.filter(v => v[key] !== (item[key] || item.response[key]))
    return newarr
  }
  Vue.prototype.getFileType = (file) => {
    let type = file.split('.')
    let a = type[type.length - 1]
    switch (a) {
      case 'doc':
        return 'word'
      case 'docx':
        return 'word'
      case 'xls':
        return 'excel'
      case 'xlsx':
        return 'excel'
      case 'ppt':
        return 'ppt'
      case 'pdf':
        return 'pdf'
      case 'jpg':
        return 'img'
      case 'image/jpeg':
        return 'img'
      case 'jpeg':
        return 'img'
      case 'png':
        return 'img'
      case 'gif':
        return 'img'
      default:
        return 'img'
    }
  }
  Vue.prototype.generateUUID = () => {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() // use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = ((d + Math.random() * 16) % 16) | 0
      d = Math.floor(d / 16)
      return (c === 'x'
        ? r
        : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
  }
}
export { MyPlugin }
