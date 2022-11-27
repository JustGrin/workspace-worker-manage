import {
  login,
  getInfo,
  tokenRefresh,
  resetPwd,
  logout as logoutReq
} from '@/api/user'
import {
  getToken,
  getUserCode,
  getSideType,
  getTenantId,
  setTenantId,
  setAuth,
  removeAuth
} from '@/utils/auth'
import router, { resetRouter } from '@/router'
// import defaultSettings from '@/settings'
import { Message } from 'element-ui'
import Crypto from '@/utils/crypto'

// 加载 续约
let refreshInterval = null

const getDefaultState = () => {
  return {
    token: getToken(),
    userCode: getUserCode(),
    clientSideType: getSideType(),
    tenantId: getTenantId(),
    userId: '',
    telPhone: '',
    userName: '',
    avatar: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const getters = {
  defaultPage(state) {
    return '/'
  }
}

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_AUTH: (state, auth) => {
    const { token, userCode, clientSideType } = auth || {}
    Object.assign(state, {
      token,
      userCode,
      clientSideType
    })
    setAuth({ token, userCode, clientSideType })
  },
  SET_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit, getters, state }, payload) {
    const { telPhone: telPhoneStr, password } = payload || {}
    const telPhone = telPhoneStr.trim()

    const data = {}
    Object.assign(data, payload)
    if (password) {
      const cryptPassword = await Crypto(password)
      Object.assign(data, {
        password: cryptPassword
      })
    }
    // clientSideType(客户端类型)、token(验证信息)、userCode(用户编码)、language(语言)
    const { data: logRes, success, msg } = await login(data)

    if (!success) {
      Message.warning(msg)
      return
    }
    const { userCode, token, clientSideType } = logRes || {}
    commit('SET_AUTH', { userCode, token, clientSideType })
    state.telPhone = telPhone

    // 跳转页面
    router.push({ path: getters.defaultPage })
  },

  // get user info
  async getInfo({ commit, dispatch, state }) {
    const { data } = await getInfo(state.token)
    // if (!data) {
    //   Message.warning('用户信息获取失败,请重新登录')
    // }
    const { userName, id, tenantId } = data || {}
    state.userId = id
    state.tenantId = tenantId
    setTenantId(tenantId)
    commit('SET_NAME', userName)
    // 加载续约
    if (refreshInterval) {
      // 清除续约
      clearInterval(refreshInterval)
    }
    refreshInterval = setInterval(() => {
      tokenRefresh()
    }, 10 * 10 * 1000)
    return
  },

  // user logout
  async logout({ state, commit }) {
    if (router.currentRoute.path === '/login') {
      return Promise.resolve()
    }
    if (state.token) {
      await logoutReq() // 登出请求
    }
    router.push({ path: '/login' })
    removeAuth() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')

    if (refreshInterval) {
      // 清除续约
      clearInterval(refreshInterval)
    }
    return Promise.resolve()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeAuth() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 修改密码
  async resetPwd({ commit }, payload) {
    const { telPhone, password, verifyCode } = payload || {}

    const cryptPassword = await Crypto(password)
    const { success } = await resetPwd({
      telPhone: telPhone.trim(),
      password: cryptPassword,
      verifyCode
    })
    return Promise.resolve(success)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
