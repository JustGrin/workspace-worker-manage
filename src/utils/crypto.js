import CryptoJS from 'crypto-js/crypto-js'
import { getSecretKey } from '@/api/user'

// 前端的的 KEY 与 iv
const keyPrefix = 'PdfZVvQx'
const ivPrefix = 'lHTo8Hd9'

// const KEY = CryptoJS.enc.Utf8.parse('PdfZVvQx') //  密钥
// const IV = CryptoJS.enc.Utf8.parse('lHTo8Hd9') //   密钥初始向量

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word, keyStr, ivStr) {
  // let key = KEY
  // let iv = IV

  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)

  const srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

// export function Encrypt(data) {
//   var key = CryptoJS.enc.Latin1.parse('dufy20170329java')
//   var iv = CryptoJS.enc.Latin1.parse('dufy20170329java')
//   return CryptoJS.AES.encrypt(data, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.ZeroPadding
//   }).toString()
// }

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt(word, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)

  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/**
 * 获取 后端返回的 密钥 与本地密钥结合生成密码
 *
 */
let SuffixInfo = {}
async function Crypto(pwdStr, isOld) {
  if (!isOld) {
    const { data } = await getSecretKey()
    SuffixInfo = data
  }
  const { ivSuffix, keySuffix } = SuffixInfo || {}
  const keyStr = keyPrefix + keySuffix
  const ivStr = ivPrefix + ivSuffix
  const password = Encrypt(pwdStr, keyStr, ivStr)
  return password
}

export default Crypto
