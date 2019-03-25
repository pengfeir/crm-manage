/*
 * @Author: renpengfei
 * @Date: 2019-03-25 14:56:51
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-25 18:39:20
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
