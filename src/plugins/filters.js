/*
 * @Author: renpengfei
 * @Date: 2019-03-25 14:56:51
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-05-08 16:57:31
 */
/**
 * 设备装机状态
 * @param {*} status
 */
export const getSteps = status => {
  switch (status) {
    case 'unknown' :
      return '未知'
    case 'delivered' :
      return '已出库'
    case 'to_setup' :
      return '待安装'
    case 'setup' :
      return '已安装'
    case 'training' :
      return '已培训'
    case 'accepted' :
      return '已验收'
    default:
      return '无'
  }
}
/**
 * 配套耗材是否专机用
 * @param {*} isDedicatedAppendant
 */
export const getAppendant = isDedicatedAppendant => {
  switch (isDedicatedAppendant) {
    case '0' :
      return '否'
    case '1' :
      return '是'
    default:
      return '无'
  }
}
/**
 * 维修进度
 * @param {*} fixStep
 */
export const stepStatus = fixStep => {
  switch (fixStep) {
    case 'unknown' :
      return '未知'
    case 'reported' :
      return '已上报'
    case 'todo' :
      return '待维修'
    case 'doing' :
      return '正在维修'
    case 'done' :
      return '完成'
    case 'abort' :
      return '取消'
    default:
      return '未知'
  }
}
/**
 * 保养进度
 * @param {*} fixStep
 */
export const mainStatus = fixStep => {
  switch (fixStep) {
    case 'todo' :
      return '待保养'
    case 'doing' :
      return '正在保养'
    case 'done' :
      return '完成'
    case 'abort' :
      return '取消'
    default:
      return '未知'
  }
}

/**
 * 类别
 * @param {*} kind
 */
export const kindStatus = kind => {
  switch (kind) {
    case 'maintain' :
      return '保养'
    case 'qa' :
      return '质控'
    default:
      return '未知'
  }
}
/**
 * 物联类别
 * @param {*} kind
 */
export const deviceStatus = kind => {
  switch (kind) {
    case 'co' :
      return '协调器'
    case 'gw' :
      return '网关'
    case 'sensor' :
      return '监测终端'
    case 'qr' :
      return '二维码'
    case '4g' :
      return '4G模块'
    default:
      return '未知'
  }
}
/**
 * 设备状态
 * @param {*} assetStatus
 */
export const filterAssetStatus = assetStatus => {
  switch (assetStatus) {
    case '10' :
      return '关机'
    case '20' :
      return '开机'
    case '30' :
      return '待机'
    case '40' :
      return '激活'
    default:
      return '未知'
  }
}
export const filterSectionType = type => {
  switch (type) {
    case '1' :
      return '门诊'
    case '2' :
      return '急诊'
    case '3' :
      return '住院'
    default:
      return ''
  }
}
export const formatToFinacial = (money, n) => {
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
