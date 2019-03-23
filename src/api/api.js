
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
export default {
  login,
  agencyDel,
  agencyList,
  agencyUpdate,
  agencyCreate
}
