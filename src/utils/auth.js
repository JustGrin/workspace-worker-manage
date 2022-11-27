import Cookies from 'js-cookie'

const key = 'YSdata'
const TokenKey = `${key}_token`
const UserCodeKey = `${key}_user_code`
const ClientSideTypeKey = `${key}_client_Side_Type`
const TenantIdKey = `${key}_Tenant_Id`
const LanguageKey = `${key}_language`

// all
export function setAuth(auth = {}) {
  const { userCode, token, clientSideType } = auth || {}
  Cookies.set(TokenKey, token)
  Cookies.set(UserCodeKey, userCode)
  Cookies.set(ClientSideTypeKey, clientSideType)
}

export function removeAuth() {
  Cookies.remove(TokenKey)
  Cookies.remove(UserCodeKey)
  Cookies.remove(ClientSideTypeKey)
}

// token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// userCode
export function getUserCode() {
  return Cookies.get(UserCodeKey)
}

export function setUserCode(userCode) {
  return Cookies.set(UserCodeKey, userCode)
}

export function removeUserCode() {
  return Cookies.remove(UserCodeKey)
}

// clientSideType
export function getSideType() {
  return Cookies.get(ClientSideTypeKey)
}

export function setSideType(clientSideType) {
  return Cookies.set(ClientSideTypeKey, clientSideType)
}

export function removeSideType() {
  return Cookies.remove(ClientSideTypeKey)
}

// TenantId
export function getTenantId() {
  return Cookies.get(TenantIdKey)
}

export function setTenantId(tenantId) {
  return Cookies.set(TenantIdKey, tenantId)
}

// language
export function getLanguage() {
  return Cookies.get(LanguageKey)
}

export function setLanguage(language) {
  return Cookies.set(LanguageKey, language)
}

// clientSideType(客户端类型)、 token(验证信息)、userCode(用户编码)、language(语言)
// "客户端类型 手机端phone 电脑端pc",
