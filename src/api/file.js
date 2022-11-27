import request from '@/utils/request'
import { getTenantId } from '@/utils/auth'
import { randomWord } from '@/utils'
import url, { baseURL } from './url'
// import { Message } from 'element-ui'

// rar,zip,xls,xlsx,doc,docx,text, gif,jpg,png,jpeg
//
// 生成 上传配置
export const uploadConfig = () => {
  const imgType = '.gif,.jpg,.png,.jpeg'
  return {
    action: '/api' + url.upload,
    imgType,
    fileType: '.rar,.zip,.xls,.xlsx,.doc,.docx,.text'
  }
}

// 获取文件列表
export function getFileList(businessId) {
  return request({
    url: url.getFileList,
    data: { businessId }
  })
}

// 上传文件
export function uploadFile(file, businessId) {
  const data = new FormData()
  data.append('multipartFiles', file)
  if (businessId) {
    data.append('businessId', businessId)
  }

  return request({
    url: url.upload,
    method: 'post',
    isFile: true,
    showMsg: false,
    data
  })
}

// 上传Base64文件
export function uploadBase64File(content, businessId) {
  return request({
    url: url.uploadBase64,
    data: {
      content,
      businessId,
      fileName: randomWord() + '.jpg'
    },
    method: 'post',
    showMsg: false,
    loading: false
  })
}

// 通过文件id 删除文件
export function deleteFileById(id) {
  return request({
    url: url.deleteFileById,
    data: { id }
  })
}

// 通过业务id 删除文件
export function deleteByBusinessId(businessId) {
  return request({
    url: url.deleteFileById,
    data: { businessId }
  })
}

// 获取图片流地址
export const getImgUrl = id =>
  `${baseURL}${url.imgStream}?fileId=${id}&tenantId=${getTenantId()}`

/**
 *  下载文件 直接通过连接
 * @param fileUrl 文件地址
 *
 * 用这个的前提是不需要token或者后端提供了服务器地址
 */
export const downloadFileByUrl = id => {
  // const strs = fileUrl.split('/')
  // const fileName = strs[strs.length - 1]

  // const downloadUrl = prefix + url.download + fileName
  const downloadUrl = `${baseURL}${
    url.download
  }?fileId=${id}&tenantId=${getTenantId()}`
  let elemIF = document.getElementById('fileDownLoad')
  if (!elemIF) {
    elemIF = document.createElement('iframe')
    elemIF.id = 'fileDownLoad'
    elemIF.src = downloadUrl
    elemIF.style.display = 'none'
    document.body.appendChild(elemIF)
  } else {
    elemIF.src = ''
    elemIF.src = downloadUrl
  }
}

/**
 *  下载文件  通过接口请求到文件流再转换成文件
 * @param fileUrl
 * @param fileName
 *
 * 可以带token
 */
export async function downloadFile(fileId) {
  // roleName,remark
  //   const strs = fileUrl.split('/')
  //   const fileName = strs[strs.length - 1]

  const response = await request({
    url: url.download,
    method: 'get',
    formatRes: false,
    data: { fileId }
  })
  return response
  // const fileLink = window.URL.createObjectURL(new Blob([response.data]))
  // const link = document.createElement('a')
  // link.href = fileLink
  // // link.setAttribute('download', fileName)
  // // link.download = fileName
  // document.body.appendChild(link)
  // link.click()
  // document.body.removeChild(link)
}
