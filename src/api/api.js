import axios from './config'

function login (params) { // 登陆
  return axios.post('/manage/admin/login', params)
}
function getUpToken (params) { // 七牛上传获取token
  return axios.post('/manage/file/getUpToken', params)
}
function agencyCreate (params) { // 新建机构
  return axios.post('/manage/organization/create', params)
}
function agencyList (params) { // 获取机构列表
  return axios.post('/manage/organization/list', params)
}
function agencyUpdate (params) { // 编辑机构
  return axios.post('/manage/organization/update', params)
}
function agencyDel (params) { // 删除机构
  return axios.post('/manage/organization/delete', params)
}
function roleList (params) { // 角色列表
  return axios.post('/manage/role/list', params)
}
function roleCreate (params) { // 添加角色
  return axios.post('/manage/role/create', params)
}
function roleDel (params) { // 删除角色
  return axios.post('/manage/role/delete', params)
}
function roleUpdate (params) { // 编辑角色
  return axios.post('/manage/role/update', params)
}
function userInfo (params) { // 获取当前用户
  return axios.post('/manage/admin/info', params)
}
function userCreate (params) { // 创建用户
  return axios.post('/manage/admin/create', params)
}
function userDel (params) { // 批量删除用户
  return axios.post('/manage/admin/delete', params)
}
function userList (params) { // 获取用户列表
  return axios.post('/manage/admin/list', params)
}
function userUpdate (params) { // 更新用户信息
  return axios.post('/manage/admin/update', params)
}
function updatePassword (params) { // 修改密码
  return axios.post('/manage/admin/updatePassword', params)
}
function assetList (params) { // 资产列表
  return axios.post('/manage/asset/list', params)
}
function deleteAsset (params) { // 删除资产列表
  return axios.post('/manage/asset/delete', params)
}
function createAsset (params) { // 创建资产列表
  return axios.post('/manage/asset/create', params)
}
function updateAsset (params) { // 更新资产列表
  return axios.post('/manage/asset/update', params)
}
function faultList (params) { // 资产故障列表
  return axios.post('/manage/fault/list', params)
}
function createFault (params) { // 创建故障列表
  return axios.post('/manage/fault/create', params)
}
function deleteFault (params) { // 删除故障列表
  return axios.post('/manage/fault/delete', params)
}
function updateFault (params) { // 更新故障列表
  return axios.post('/manage/fault/update', params)
}
function mainList (params) { // 保养质检列表
  return axios.post('/manage/maintainQa/list', params)
}
function createMain (params) { // 创建保养质检
  return axios.post('/manage/maintainQa/create', params)
}
function deleteMain (params) { // 删除保养质检
  return axios.post('/manage/maintainQa/delete', params)
}
function updateMain (params) { // 更新保养质检
  return axios.post('/manage/maintainQa/update', params)
}
function complaintList (params) { // 投诉列表
  return axios.post('/manage/complaint/list', params)
}
function createComplaint (params) { // 创建投诉
  return axios.post('/manage/complaint/create', params)
}
function deleteComplaint (params) { // 删除投诉
  return axios.post('/manage/complaint/delete', params)
}
function updateComplaint (params) { // 更新投诉
  return axios.post('/manage/complaint/update', params)
}
function unPageList (params) { // 无分页资产列表
  return axios.post('/manage/asset/unPageList', params)
}
function createRoom (params) { // 创建房间
  return axios.post('/manage/room/create', params)
}
function deleteRoom (params) { // 删除房间
  return axios.post('/manage/room/delete', params)
}
function updateRoom (params) { // 更新房间
  return axios.post('/manage/room/update', params)
}
function roomList (params) { // 房间列表
  return axios.post('/manage/room/list', params)
}
function createIotDevice (params) { // 创建物联
  return axios.post('/manage/iotDevice/create', params)
}
function deleteIotDevice (params) { // 删除物联
  return axios.post('/manage/iotDevice/delete', params)
}
function updateIotDevice (params) { // 更新物联
  return axios.post('/manage/iotDevice/update', params)
}
function iotDeviceList (params) { // 房间物联
  return axios.post('/manage/iotDevice/list', params)
}
function unPageiotDeviceList (params) { // 物联设备列表
  return axios.post('/manage/iotDevice/unPageList', params)
}
function createAssetMetrics (params) { // 创建资产运行
  return axios.post('/manage/assetMetrics/create', params)
}
function deleteAssetMetrics (params) { // 删除物联
  return axios.post('/manage/assetMetrics/delete', params)
}
function updateAssetMetrics (params) { // 更新物联
  return axios.post('/manage/assetMetrics/update', params)
}
function assetMetricsList (params) { // 房间物联
  return axios.post('/manage/assetMetrics/list', params)
}
export default {
  login,
  getUpToken,
  agencyDel,
  agencyList,
  agencyUpdate,
  agencyCreate,
  assetList,
  deleteAsset,
  createAsset,
  updateAsset,
  roleDel,
  roleList,
  roleCreate,
  roleUpdate,
  updatePassword,
  userInfo,
  userCreate,
  userDel,
  userList,
  userUpdate,
  faultList,
  createFault,
  deleteFault,
  updateFault,
  mainList,
  createMain,
  deleteMain,
  updateMain,
  complaintList,
  createComplaint,
  deleteComplaint,
  updateComplaint,
  unPageList,
  createRoom,
  deleteRoom,
  updateRoom,
  roomList,
  createIotDevice,
  deleteIotDevice,
  updateIotDevice,
  unPageiotDeviceList,
  iotDeviceList,
  createAssetMetrics,
  deleteAssetMetrics,
  updateAssetMetrics,
  assetMetricsList
}
