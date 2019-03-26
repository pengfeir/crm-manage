/*
 * @Author: renpengfei
 * @Date: 2019-03-25 14:56:51
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-26 17:11:22
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
