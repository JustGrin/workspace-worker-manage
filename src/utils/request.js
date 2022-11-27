import axios from 'axios'
import defaultSettings from '@/settings'

// import store from '@/store'
import {
  isMock,
  
  resCodes,
  showMessage,
  // doLogout,
  setLoading,
  // getSign
} from './request-tools'
import { baseURL } from '@/api/url'

const { isDev } = defaultSettings

// 创建axios实例
const service = axios.create({
  baseURL: isMock ? '/mock' : baseURL, // api的base_url
  timeout: 10000, // 请求超时时间 10s
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
  // method
})
 
// request拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做点什么
 
    const newHeader = { }
 
    const { loading = true, method = 'get', isForm, isFile, mock = isMock } =
      config || {}

    if (mock) {
      config.baseURL = '/mock'
    }

    if (loading) {
      setLoading(true)
    }

    if (isForm) {
      Object.assign(newHeader, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    //

    if (isFile) {
      Object.assign(newHeader, {
        'Content-Type': 'multipart/form-data'
      })
    }
 
    if (method === 'get' || isForm) {
      const params = config.params || config.data || {}
      config.params = params
    } else {
      config.data = config.body || config.data || {} 
      if (isDev) {
        config.params = config.data 
      }
    }

    Object.assign(config.headers, newHeader)
    return config
  },
  error => {
    // Do something with request error
    console.log('err' + error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    setLoading(false)
    const { data = {}, config } = response || {}

    const { showMsg, method, formatRes = true } = config || {}

    if (!formatRes) {
      return response
    }

    const { code, retMsg } = data
    let isSuccess = false

    const sendData = {}

    switch (Number(code)) {
      case resCodes.success:
        // api返回的code
        isSuccess = true
        Object.assign(
          sendData,
          { success: isSuccess, msg: retMsg || '操作成功!' },
          data
        )
        break
      case resCodes.forbidden:
        Object.assign(
          sendData,
          { success: isSuccess, msg: retMsg || '失败' },
          data
        )
        break
      case resCodes.remoteLogin:
      case resCodes.loginExpired:
        Object.assign(
          sendData,
          { success: isSuccess, msg: retMsg || '登录失效' },
          data
        )
        // doLogout(sendData.msg)
        break
      default:
        Object.assign(
          sendData,
          {
            success: isSuccess,
            msg: retMsg || (isSuccess ? '操作成功!' : '操作失败!')
          },
          data
        )
    }

    // api未返回data  默认显示message；showMsg 强制决定是否显示message
    if (
      showMsg ||
      (method.toLocaleLowerCase() === 'post' && showMsg !== false)
    ) {
      showMessage(sendData.msg, sendData.success)
    }
    return sendData
  },

  error => {
    console.log('err' + error) // for debug

    // 关闭 loading
    setLoading(false)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return {
      success: false,
      msg: '操作失败'
    }
  }
)

export default service
