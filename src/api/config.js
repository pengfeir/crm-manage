/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:31:01
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-30 15:29:57
 */
import axios from 'axios'
import router from '../router'
import { Notification } from 'element-ui'
const service = axios.create({
  timeout: 6000 // 超时时间,
})
// Add a request interceptor
service
  .interceptors
  .request
  .use(
  // Do something before request is sent
    config => {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = `${localStorage.getItem('token')}`
      }
      return config
    },
    // Do something with request error
    error => Promise.reject(error))

// Add a response interceptor
service
  .interceptors
  .response
  .use(
  // Do something with response data
    response => {
      if (response.data) {
        if (response.data.code === 401) {
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.path
            }
          })
          return
        }
        if (response.data.code !== 200) {
          Notification.error(response.data.message || '操作失败')
        } else {
          return response.data
        }
        // return Promise.resolve(response.data)
      } else {
        Notification.error('操作失败')
        return Promise.reject(response)
      }
    },
    // Do something with response error
    error => {
      console.log(error)
      Notification.error('网络请求失败，请稍后再试')
      if (error.response) {
        switch (error.response.status) {
          case 401:
          // 返回 401 清除token信息并跳转到登录页面
            router.currentRoute.path !== 'login' && router.replace({
              path: 'login',
              query: {
                redirect: router.currentRoute.path
              }
            })
        }
      }
      return Promise.reject(error)
    })
service.prototype.post = function (url, params) {
  return service({ url: url, data: params, method: 'post' })
}
service.prototype.get = function (url, params) {
  return service({ url: url, data: params, method: 'get' })
}
export default service
