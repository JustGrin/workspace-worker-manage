import { stringify } from 'qs'
import md5 from 'js-md5'
import { Message } from 'element-ui'
import store from '@/store'
import defaultSettings from '@/settings'
import { objectSort } from './index'

// eslint-disable-next-line no-unused-vars
const { isDev } = defaultSettings
 
// eslint-disable-next-line prefer-const
// const _isMock = false
 
const _isMock = isDev // 本行控制 是否全部默认全部接口用 mock -------------------------

export const isMock = _isMock

export const accessKey = 'a2b6a50bb2984f488461c3ff87784f79'
export const secretKey = '92ddbc226fe14186961c41bc2893b040'

// 返回码列表
export const resCodes = {
  success: 200,
  failure: 500,
  forbidden: 403,
  remoteLogin: 400003,
  loginExpired: 401
}

// 阻止请求

const msgState = {
  erring: false
}
// 显示报错信息
export const showMessage = (msg, success) => {
  const duration = 5 * 1000
  if (success || !msgState.erring) {
    // 成功 || 没有报错时 才可提示
    Message({
      message: msg,
      type: success ? 'success' : 'warning',
      duration
    })
  }

  if (!success && !msgState.erring) {
    // 报错时 开始计时
    msgState.erring = true
    setTimeout(() => {
      msgState.erring = false
    }, duration)
  }
}

// 退出登录
export const doLogout = msg => {
  // stopRequest = true
  setTimeout(() => {
    store.dispatch('user/logout')
    // stopRequest = false
    showMessage(msg)
  }, 500)
}

// 设置loading状态
export const setLoading = beal => {
  store.dispatch('setLoading', beal)
}

// 参数生成签名
export const getSign = (data, paramSign, secretKey, isJson, url) => {
  let signStr
  if (isJson) {
    const sortObj = objectSort(Object.assign({ secretKey }, paramSign))
    signStr = stringify(sortObj)
    const dataStr = JSON.stringify(data)
    if (dataStr) {
      signStr = `${signStr}&${dataStr}`
    }
  } else {
    const sortObj = objectSort(Object.assign({ secretKey }, paramSign, data))
    signStr = stringify(sortObj)
  }

  // if (process.env.NODE_ENV !== 'development') {
  //   console.table({
  //     [url]: signStr,
  //     sign: md5(signStr).toUpperCase()
  //   })
  // }

  return md5(signStr).toUpperCase()
}
