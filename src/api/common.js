import request from '@/utils/request'
import url from './url'

const pageInfo = {
  current: 1,
  size: 500
}

// 请求短信
export function sendVerifyCode(data) {
  // purpose	用途 1注册，2其他操作
  // telPhone	电话
  // template	验证码模板,可用值:USER_VALIDATE,LOGIN_CONFIRM,LOGIN_EXCEPTION,USER_REGISTER,PWD_MODIFY,USERINFO_MODIFY
  return request({
    url: url.sendVerifyCode,
    method: 'post',
    data
    // mock: true,
  })
}

export function validateVerifyCode(data) {
  // code
  // phone
  return request({
    url: url.validateVerifyCode,
    data
  })
}
// 换绑手机
export function updateUserPhone(data) {
  // {
  //    purpose	    用途 1原手机验证，2更换后手机验证
  //    telPhone	  电话
  //    verifyCode	验证码
  // }
  return request({
    url: url.updateUserPhone,
    method: 'post',
    data
  })
}

// 请求地址树
export function getAddressTree() {
  return request({
    url: url.addressTree,
    method: 'get'
  })
}

// 获取 common 列表
export function getCommonList(key, data = {}) {
  return request({
    url: url[key],
    data
  })
}

/*  --------- 字典接口 ----- start -------------  */
// 子项列表Page
export function getI18nDict(typeCode) {
  // roleName,remark
  return request({
    url: url.getI18nDict,
    params: { typeCode }
  })
}
/*  --------- 角色接口 ----- end -------------  */

/*  --------- 角色接口 ----- start -------------  */
// 角色列表Page
export function getRolePage(params) {
  // roleName,remark

  return request({
    url: url.rolePage,
    method: 'get',
    params
  })
}
// 角色列表
export function getRoleList(params = {}) {
  return request({
    url: url.rolePage,
    method: 'get',
    params: { ...pageInfo, ...params }
  })
}

// 新增角色
export function addRole(data) {
  // roleName,remark
  return request({
    url: url.roleAdd,
    data
  })
}

/*  --------- 角色接口 ----- end -------------  */

/*  --------- 公司接口 ----- start -------------  */
//  公司列表Page
export function getCompanyPage(params) {
  // roleName,remark

  return request({
    url: url.companyPage,
    method: 'get',
    params
  })
}
//  公司列表
export function getCompanyList(params = {}) {
  return request({
    url: url.companyPage,
    method: 'get',
    params: { ...pageInfo, ...params }
  })
}

// 新增
export function addCompany(data) {
  // roleName,remark
  return request({
    url: url.companyAdd,
    data
  })
}

/*  --------- 公司接口 ----- end -------------  */

/*  --------- 集团接口 ----- start -------------  */
// 集团列表Page
export function getGroupPage(params) {
  // roleName,remark

  return request({
    url: url.groupPage,
    method: 'get',
    params
  })
}
// 集团列表
export function getGroupList(params = {}) {
  return request({
    url: url.groupPage,
    method: 'get',
    params: { ...pageInfo, ...params }
  })
}

// 新增集团
export function addGroup(data) {
  // roleName,remark
  return request({
    url: url.groupAdd,
    data
  })
}

/*  --------- 集团接口 ----- end -------------  */
