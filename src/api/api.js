
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
function roleUpdate (params, id) { // 编辑角色
  return axios.post('/manage/role/update/'+ id, params)
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
  roleList,
  roleCreate,
  roleUpdate,
  userInfo,
  userCreate,
  userDel,
  userList,
  userUpdate,
  assetList,
  roleUpdate
}
