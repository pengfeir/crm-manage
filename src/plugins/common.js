/*
 * @Author: renpengfei
 * @Date: 2019-03-18 15:55:28
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-10-11 15:29:41
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
  Vue.prototype.createArrFromSchema = (schema) => {
    let arr = []
    schema.forEach(item => {
      let obj = {}
      obj.id = item.name
      obj.value = item.label
      arr.push(obj)
    })
    return arr
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
  Vue.prototype.formatToFinacial = (money, n) => {
    if (!money) {
      money = 0
    }
    money = parseFloat(money)
    let absicon = ''
    if (parseFloat(money) !== Math.abs(money) && money !== Math.abs(money) && money !== 0 && money !== '0.00') {
      absicon = '-'
    }
    if (n === 0) {
      money = parseFloat((money + '').replace(/[^\d.]/g, '')) + ''
    } else {
      if (!n) {
        n = 2
      }
      n = n > 0 && n <= 20 ? n : 2
      let arr = String(money).split('.')
      if (arr[1]) {
        if (arr[1].substring(n) && arr[1].substring(n) === '5') {
          money = money > 0 ? parseFloat(arr[0] + '.' + arr[1].substring(0, n)) + parseFloat(Math.pow(0.1, n).toFixed(n)) : parseFloat(arr[0] + '.' + arr[1].substring(0, n)) - parseFloat(Math.pow(0.1, n).toFixed(n))
        } else {
          money = money.toFixed(n)
        }
      } else {
        money = money.toFixed(n)
      }
      money = parseFloat((money + '').replace(/[^\d.]/g, '')).toFixed(n) + ''
    }
    var l = money.split('.')[0].split('').reverse()
    var r = money.split('.')[1] ? money.split('.')[1] : '00'
    var t = ''
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    let returnResult = t.split('').reverse().join('') + '.' + r
    if (returnResult === '0.00') {
      absicon = ''
    }
    return absicon + t.split('').reverse().join('') + '.' + r
  }
}
export { MyPlugin }
