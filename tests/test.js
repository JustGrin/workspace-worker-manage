import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { prefix } from '@/api/url'

import defaultSettings from '@/settings'
import { randomWord, getSign, objectSort } from './index'

// eslint-disable-next-line no-unused-vars
const { isDev } = defaultSettings
 
let isMock
// eslint-disable-next-line prefer-const
isMock = false
// isMock = isDev // 本行控制 是否全部默认全部接口用 mock -------------------------

const accessKey = 'a2b6a50bb2984f488461c3ff87784f79'
const secretKey = '92ddbc226fe14186961c41bc2893b040'

// 返回码列表
const resCodes = {
  success: '200',
  failure: '500',
  forbidden: '403',
  remoteLogin: '40003',
  loginExpired: '401'
}

// 阻止请求
// let stopRequest = false

// 退出登录
const doLogout = () => {
  // stopRequest = true
  setTimeout(() => {
    store.dispatch('user/logout')
    // stopRequest = false
  }, 500)
}

// 设置loading状态
const setLoading = beal => {
  store.dispatch('setLoading', beal)
}
// ----修复项详情----
// 项目名称：    主页劫持程序
// 项目描述：    该软件可能影响主页锁定。
// ---1个相关文件---
// C:\Users\Administrator\AppData\Roaming\recommand

// 显示报错信息
const showMessage = ({ success, msg }) =>
  Message({
    message: msg,
    type: success ? 'success' : 'warning',
    duration: 5 * 1000
  })

// 创建axios实例
const service = axios.create({
  baseURL: isMock ? '/mock' : '/api', // api的base_url
  timeout: 10000, // 请求超时时间 10s
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8'
    // 'Content-Type': 'multipart/form-data'
  }
  // method
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做点什么
    const { token, userCode, clientSideType, language } = store.getters || {}

    const newHeader = {
      language
      // clientSideType: 'gm' // "客户端类型 手机端phone 客户端pc 管理端gm ",
    }

    // 签名参数
    const signParams = {
      timestamp: new Date().getTime(),
      random: randomWord(),
      accessKey
    }

    if (token) {
      Object.assign(newHeader, {
        token,
        userCode,
        clientSideType
      })
    }

    const { loading = true, method = 'get', isForm } = config || {}

    if (loading) {
      setLoading(true)
    }
 
    if (isForm) {
      Object.assign(newHeader, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }

    if (method === 'get' || isForm) {
      config.params = objectSort(config.params || config.data)

      signParams.sign = getSign(
        config.params,
        signParams,
        secretKey,
        false,
        config.url
      )
    } else {
      config.data = objectSort(config.data)

      signParams.sign = getSign(
        config.data,
        signParams,
        secretKey,
        true,
        config.url
      )
    }

    Object.assign(config.headers, newHeader, signParams)

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

    const { retCode, retMsg } = data
    let isSuccess = false

    let sendData = {}
    switch (retCode) {
      case resCodes.success:
        // api返回的code
        isSuccess = true

        sendData = {
          success: isSuccess,
          msg: retMsg || '操作成功!',
          ...data
        }
        break
      case resCodes.remoteLogin:
      case resCodes.forbidden:
      case resCodes.loginExpired:
        doLogout()
        sendData = {
          success: isSuccess,
          msg: retMsg || '登录失效',
          ...data
        }
        break
      default:
        sendData = {
          success: isSuccess,
          msg: retMsg || (isSuccess ? '操作成功!' : '操作失败!'),
          ...data
        }
    }

    if (sendData.msg === resCodes.success) {
      sendData.msg = '操作成功!'
    }
    // api未返回data  默认显示message；showMsg 强制决定是否显示message
    if (
      showMsg ||
      (method.toLocaleLowerCase() === 'post' && showMsg !== false)
    ) {
      showMessage({
        success: sendData.success,
        msg: sendData.msg
      })
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
