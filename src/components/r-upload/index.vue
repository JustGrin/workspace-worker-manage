<template>
  <div class="r-upload">
    <el-upload
      :ref="refName"
      size="mini"
      :action="fileConfig.action"
      multiple
      :disabled="preview"
      :limit="limit"
      :class="uploadClass"
      :file-list="fileList"
      :http-request="httpRequest"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-remove="onRemove"
      :on-preview="onPreview"
      v-bind="attrsList"
    >
      <template v-if="!preview">
        <template v-if="isImg">
          <i class="el-icon-plus" />
        </template>
        <template v-else>
          <el-button size="mini" type="primary">
            {{ $t('btns.addAccessory') }}
          </el-button>
        </template>
        <div slot="tip" class="el-upload__tip">
          {{ limitStr }}
        </div>
      </template>
    </el-upload>
    <el-dialog
      :visible.sync="previewVisible"
      append-to-body
      close-on-click-modal
      class="img-preview-box"
    >
      <img width="100%" :src="previewUrl" :alt="this.$t('btns.addAccessory')" />
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import {
  uploadFile,
  getFileList,
  uploadConfig,
  deleteFileById,
  getImgUrl,
  downloadFileByUrl
} from '@/api/file'

// // 获取文件后缀名
// const getExtension = fileName => {
//   // 文件扩展名的正则表达式
//   var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i
//   // 获得文件扩展名
//   var fileExtension = fileName.match(patternFileExtension)
//   return fileExtension[0] || ''
// }

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isImg: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refName: 'r-upload-ref',
      fileConfig: uploadConfig(),
      fileList: [],
      removePromis: null,
      imgLimit: 9,
      attachLimit: 3,
      previewUrl: '',
      previewVisible: false,
      uploadPromis: null
    }
  },
  computed: {
    uploadDom() {
      return this.$refs[this.refName]
    },
    limit() {
      return this.isImg ? this.imgLimit : this.attachLimit
    },
    uploadClass() {
      // 下载模式 || 文件大于限制时
      return {
        'hide-upload-btn': this.preview || this.fileList.length >= this.limit
      }
    },
    attrsList() {
      const baseObj = this.isImg
        ? {
            accept: this.fileConfig.imgType,
            'list-type': 'picture-card'
          }
        : {
            accept: this.fileConfig.fileType
          }
      return Object.assign(baseObj, this.$attrs)
    },
    limitStr() {
      return `${this.$t('btns.moreUpload')}${this.limit}${
        this.isImg ? this.$t('btns.pic') : this.$t('btns.accessory')
      }`
    }
  },
  watch: {
    value(v) {
      // 更新 value时  获取文件列表
      if (v) {
        this.loadFileList(v)
      } else {
        // value 转为空时 清空 数据
        this.fileList = []
      }
    }
  },
  mounted() {
    // 初始化时 获取列表
    this.loadFileList(this.value)
  },
  methods: {
    // 自定义请求
    async httpRequest(req) {
      const { data, success, msg } = await uploadFile(req.file, this.value)
      if (!success) {
        // 上传失败时,  删除上传文件
        this.uploadDom.uploadFiles.splice(
          this.uploadDom.uploadFiles.length - 1,
          1
        )
        Message.warning(msg)
        this.fileList = this.uploadDom.uploadFiles
        return
      }
      const [firstRet] = data || []
      const { businessId } = firstRet || {}
      if (businessId) {
        this.$emit('input', businessId)
        const uploadFiles = this.uploadDom.uploadFiles
        Object.assign(uploadFiles[uploadFiles.length - 1], {
          id: firstRet.id,
          url: getImgUrl(firstRet.id)
        })
        this.fileList = uploadFiles
      }
    },
    // 图片上传前判断文件后缀
    beforeUpload(file) {
      // const exNames = ['.png', '.jpg']
      // const { name } = file || {}
      // const extension = getExtension(name)
      // if (exNames.indexOf(extension) === -1) {
      //   Message.warning(`图片格式仅支持${exNames.join()}`)
      //   return false
      // }

      if (this.fileList.length > this.limit) {
        Message.warning(`最多可上传${this.limit}张图片`)
        return false
      }

      return true
    },
    // 加载文件list
    async loadFileList(busiId) {
      if (!busiId || this.fileList.length) {
        return
      }
      const { data } = await getFileList(busiId) //

      this.fileList = (data || []).map(fItem =>
        Object.assign(fItem, {
          name: fItem.originalName,
          url: getImgUrl(fItem.id)
        })
      )
    },

    // 删除-前 file, fileList
    async beforeRemove(file) {
      const { success, msg } = await deleteFileById(file.id)
      if (!success) {
        Message.warning(msg)
        return Promise.reject()
      }
      return Promise.resolve()
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      return this.isImg ? this.previewImges(file) : this.download(file)
    },
    // 预览图片
    previewImges(file) {
      const { url } = file || {}
      Object.assign(this, {
        previewUrl: url,
        previewVisible: true
      })
    },
    // 下载附件
    download(file) {
      downloadFileByUrl(file.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.r-upload {
  >>> .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
}

.hide-upload-btn {
  >>> .el-upload--picture-card {
    display: none;
  }
  >>> .el-upload {
    display: none;
  }
}
</style>
