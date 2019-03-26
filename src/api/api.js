
import axios from './config'

function login (params) { // 登陆
  return axios.post('/manage/admin/login', params)
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
function roleInfo (params) { // 获取角色的详情信息
  return axios.post('/manage/admin/info', params)
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
export default {
  login,
  agencyDel,
  agencyList,
  agencyUpdate,
  agencyCreate,
  assetList,
  deleteAsset,
  createAsset,
  updateAsset,
  roleDel,
  roleInfo,
  roleList,
  roleCreate,
  roleUpdate,
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
  updateComplaint
}
