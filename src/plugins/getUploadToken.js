/*
 * @Author: renpengfei
 * @Date: 2019-03-27 18:46:48
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-04-15 16:39:33
 */
import api from '@/api/api'
const token = {
  data () {
    return {
      uploadToken: '',
      // 七牛地址
      uploadUrl: 'http://upload.qiniup.com',
      // 图片下载地址
      imgBaseUrl: 'http://smart-hcp.com',
      uploadData: {
        token: '',
        key: ''
      }
    }
  },
  created () {
    this.getUpToken()
  },
  methods: {
    async getUpToken () {
      try {
        let data = await api.getUpToken()
        this.uploadToken = data.data
      } catch (err) {
      }
    }
  }
}
export default token
