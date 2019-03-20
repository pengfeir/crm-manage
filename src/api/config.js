/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:31:01
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-20 18:24:55
 */
import axios from 'axios'
import router from '../router'
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
    //   if (localStorage.getItem('token')) {
    //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    //   }
      console.log(config)
      config.headers['x-access-token'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmeXoiLCJjcmVhdGVkIjoxNTUzMDY3MDA5OTk3LCJleHAiOjE1NTM2NzE4MDl9.DPrNvLt7AO-YqLo8xKXXAnbIRcnGDWICfnzO89-1prgiUT6iQPvgKwo3qidO5puzxhlP8-wQFhpIiRFvUyhIXQ'
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
        // return Promise.resolve(response.data)
        return response.data
      } else {
        return Promise.reject(response)
      }
    },
    // Do something with response error
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // // 返回 401 清除token信息并跳转到登录页面
            // router.currentRoute.path !== 'login' && router.replace({
            //   path: 'login',
            //   query: {
            //     redirect: router.currentRoute.path
            //   }
            // })
        }
      }
      return Promise.reject(error)
    })

export default service
