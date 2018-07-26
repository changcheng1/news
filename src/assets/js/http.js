import axios from 'axios'
import qs from 'qs'
// axios 配置
// axios.defaults.timeout = 5000
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    // 解决跨域问题
    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
export default axios
