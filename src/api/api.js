
import axios from './config'

function login (params) {
  return axios.post('/manage/admin/login', params)
}
export default {
  login
}
