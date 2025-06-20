/*
 * @Author: xutian 77181077+Tiana1234@users.noreply.github.com
 * @Date: 2023-09-13 17:31:52
 * @LastEditors: xutian 77181077+Tiana1234@users.noreply.github.com
 * @LastEditTime: 2023-11-02 11:59:29
 * @FilePath: \vue-admind:\wms_ui\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    if (window.localStorage.getItem('access-token')) {
      config.headers.Authorization = window.localStorage.getItem('access-token')
      config.headers.userId = window.localStorage.getItem('userId')
      config.headers.oway = '0'//PDA使用
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      ElMessage({
        message: '操作失败',
        type: 'error',
      })
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        message = '未登录'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.message || '服务请求异常'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
