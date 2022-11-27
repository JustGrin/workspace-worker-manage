// import { stringify } from 'qs'
// import md5 from 'js-md5'

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/** 解析链接参数
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/** 复制进粘贴板
 * @param {string} text
 * @returns {Object}
 */
export function onCopy(text) {
  const oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  document.body.removeChild(oInput)
}

/** 驼峰转下划线
 * @param {string} string 字符串
 * @returns {Object} options
 */
export function decamelize(string, options = {}) {
  var separator = options.separator || '_'
  var split = options.split || /(?=[A-Z])/

  return string
    .split(split)
    .join(separator)
    .toLowerCase()
}

// 将树平铺
export function unfoldTree(tree) {
  const arr = []
  const fo = _tree => {
    for (const item of _tree) {
      const { children, ...other } = item
      arr.push(other)
      if (children) {
        fo(children)
      }
    }
  }
  fo(tree)
  return arr
}

/* 获取随机字符串
 ** length 产生随机字母数字组合的长度
 */

export function randomWord(length = 32) {
  let str = ''
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890'

  for (let i = 0; i < length; i++) {
    const pos = Math.round(Math.random() * (chars.length - 1))
    str += chars[pos]
  }
  return str
}

/** 对象 按属性名 排序 (目前自需要升序)
 * @param   {Object}  obj     要排序的对象
 * @returns {Object}  result  排序后的结果
 */
export function objectSort(obj) {
  if (!obj) {
    return obj
  }
  if (obj instanceof Array) {
    return obj
  }
  const result = {}
  const keys = Object.keys(obj)
  keys.sort()
  for (const kItem of keys) {
    result[kItem] = obj[kItem]
  }
  return result
}

// 获取文件后缀名
export const getExtension = fileName => {
  // 文件扩展名的正则表达式
  var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i

  // 获得文件扩展名
  var fileExtension = fileName.match(patternFileExtension)
  return fileExtension[0] || ''
}
