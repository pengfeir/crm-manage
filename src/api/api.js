
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
export default {
  login,
  agencyDel,
  agencyList,
  agencyUpdate,
  agencyCreate,
  roleDel,
  roleInfo,
  roleList,
  roleCreate,
  roleUpdate
  assetList
}
