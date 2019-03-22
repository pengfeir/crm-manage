
import axios from './config'

function login (params) { // 登陆
  return axios.post('/manage/admin/login', params)
}
function createAgency (params) { // 新建机构
  return axios.post('/manage/organization/create', params)
}
export default {
  login,
  createAgency
}
