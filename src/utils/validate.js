/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 正则
 */
export const RegExps = {
  url: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/, // 网址
  phoneNumber: /^(?:(?:\+|00)86)?1\d{10}$/, // 电话号码
  password: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/, // 密码
  legalChart: /^[a-zA-Z0-9_-]{4,16}$/ // 数字 字母 下划线 减号(合法字符)
}

/** 验证正则
 * @param {string} num
 * @returns {Boolean}
 */
export function validateRegExp(re, str) {
  const regExp = RegExps[re]
  if (!re || !regExp) {
    return true
  }
  return regExp.test(str)
}
 
/** 是否网址
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/** 测试用户验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
