<template>
  <el-upload
    :ref="refName"
    class="chat-upload-container"
    :http-request="httpRequest"
    :action="fileConfig.action"
    :accept="fileConfig.fileType + ',' + fileConfig.imgType"
    multiple
    :file-list="fileList"
  >
    <el-button class="upload-file" type="text">
      <svg-icon icon-class="details_uploading " />
    </el-button>
  </el-upload>
</template>

<script>
import { Message } from 'element-ui'

import {
  uploadFile,
  uploadConfig
  //   getImgUrl,
  //   downloadFileByUrl
} from '@/api/file'

export default {
  data() {
    return {
      refName: 'chat-upload',
      fileConfig: uploadConfig(),
      fileList: []
    }
  },
  methods: {
    // 自定义请求
    async httpRequest(req) {
      const { data, success, msg } = await uploadFile(req.file)
      if (success) {
        this.$emit('onUpload', data || [])
      } else {
        Message.warning(msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-upload-container {
  >>> .el-upload-list {
    display: none;
  }
}
.upload-file {
  font-size: 28px;
  padding: 0;
}
</style>
