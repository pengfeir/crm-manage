/*
 * @Author: renpengfei
 * @Date: 2019-03-27 18:46:48
 * @Last Modified by: renpengfei
 * @Last Modified time: 2019-03-28 15:56:55
 */
import api from '@/api/api'
const token = {
  data () {
    return {
      uploadToken: '',
      uploadUrl: 'http://upload.qiniup.com',
      imgBaseUrl: 'http://xldou.cn'
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
