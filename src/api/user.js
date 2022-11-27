import request from '@/utils/request'
// import { getUserCode } from '@/utils/auth'
import url from './url'

// 获取密钥
export function getSecretKey() {
  return request({
    url: url.getAesInfo,
    showMsg: false,
    method: 'post',

    // mock: true
  })
}

// 登录
export function login(data) {
  // "telPhone": "手机号",
  // "password": "密码或验证码",
  // "clientSideType": "客户端类型 手机端phone 电脑客户端pc 管理端gm",
  // "grantType": "登录类型 验证码登录1 密码登录0",
  // “clientId”:”客户端ID 前端生成一个UUID即可”

  // data.clientSideType = 'gm'
  data.clientId = new Date().getTime() + Math.random()

  return request({
    url: url.login,
    method: 'post',
    data,
    showMsg: false,
    // mock: true
  })
}

// 找回密码
export function resetPwd(data) {
  // "telPhone": "手机号",
  // " password": "新密码",
  // “verifyCode”:”验证码”

  return request({
    url: url.resetPwd,
    method: 'post',
    // showMsg: false,
    data
  })
}

// 登出啦
export function logout() {
  return request({
    url: url.logout,
    method: 'post',
    showMsg: false,
  })
}

// 获取当前用户信息
export function getInfo(userCode) {
  return request({
    url: url.getCurUser,
    // mock: true,
    method: 'get'
  })
}

// 获取当前用户菜单
export function getCurUserMenu(userCode) {
  return request({
    url: url.getCurUserMenu,
    // mock: true,
    method: 'get'
  })
}

// token 续约(避免超时退出)
export function tokenRefresh() {
  return request({
    url: url.tokenRefresh,
    showMsg: false,
    loading: false
  })
}

/*  -----------------  用户管理 -------------------------  */

// 获取用户信息
export function getUserById(id) {
  return request({
    url: url.getUserById,
    method: 'get',
    data: { id }
  })
}

// 新增/修改用户
export function editUser(payload = {}) {
  const { id, tenantName } = payload
  let apiUrl = url.addUser
  let data = payload
  if (id) {
    apiUrl = url.updateUser
    data = {
      dmpAuthUser: payload,
      tenantName
    }
  }
  return request({
    url: apiUrl,
    method: 'post',
    data
  })
}

// 通过旧密码改密码
export function updatePwdByOld(data) {
  return request({
    url: url.updatePwdByOld,
    data,
    method: 'post'
  })
}

// 用户列表
export function getUserList(params) {
  return request({
    url: url.userGetPage,
    method: 'get',
    params
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: url.userDel,
    method: 'post',
    data: { id }
  })
}
// 重置用户
export function resetUser(userId) {
  return request({
    url: url.userReset,
    method: 'post',
    data: { userId }
  })
}
