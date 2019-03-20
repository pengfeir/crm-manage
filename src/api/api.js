/*
 * @Author: renpengfei
 * @Date: 2019-03-16 18:31:53
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-19 10:03:14
 */
import axios from './config'
/**
 * @param {*} data
 * @returns
 */
export const getInfo = (data) => {
  return axios({
    url: '/manage/admin/login',
    data: data,
    method: 'post'
  })
}
