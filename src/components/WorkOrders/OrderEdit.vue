<template>
  <el-dialog
    :title="modalData.code ? '修改工单' : '新增工单'"
    :visible="visible"
    destroy-on-close
    :center="true"
    @close="onClose"
    @open="onOpen"
  >
    <el-form
      :ref="refName"
      :model="ruleForm"
      label-width="80px"
      :rules="rules"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题" />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="工单类型" prop="typeDict">
            <el-select v-model="ruleForm.typeDict" placeholder="请选择工单类型">
              <el-option
                v-for="(wotItem, index) in woTypeList"
                :key="index"
                :label="wotItem.dictValue"
                :value="wotItem.dictKey"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属模块" prop="moduleDict">
            <el-select
              v-model="ruleForm.moduleDict"
              placeholder="请选择所属模块"
            >
              <el-option
                v-for="(wotItem, index) in moduleDictList"
                :key="index"
                :label="wotItem.dictValue"
                :value="wotItem.dictKey"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="问题描述" prop="description">
        <el-input
          v-model="ruleForm.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          placeholder="请输入问题描述"
        />
      </el-form-item>

      <!-- 上传图片 -->
      <el-form-item label="上传图片">
        <el-upload
          :action="fileCongfig.action"
          :headers="fileCongfig.headers"
          :name="fileCongfig.name"
          list-type="picture-card"
          :limit="imgLimit"
          :on-change="imgesChange"
          accept=".jpg,.png"
          :class="upImgClass"
          :file-list="imagesList"
          :on-remove="removeImg"
          :before-upload="beforeUploadImg"
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">
            最多可上传{{ imgLimit }}张图片
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传附件">
        <el-upload
          :action="fileCongfig.action"
          :headers="fileCongfig.headers"
          :name="fileCongfig.name"
          :limit="attachLimit"
          :on-change="attachmentChange"
          :class="upAttachments"
          :file-list="attachmentsList"
          :on-remove="removeAttachment"
        >
          <el-button type="primary" class="do-upload-btn">添加附件</el-button>
          <div slot="tip" class="el-upload__tip">
            最多可上传{{ attachLimit }}个附件
          </div>
        </el-upload>
      </el-form-item>
    </el-form>

    <span slot="footer" style="text-align: center">
      <el-button @click="onClose">
        取 消
      </el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">
        提 交
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { uploadConfig } from '@/api/file'
import { Message } from 'element-ui'

// 获取文件数据
const getFileData = file => {
  const { response, url, name } = file || {}
  const { data } = response || {}
  const { downUrl } = data || {}
  return {
    attachmentUrl: downUrl || url,
    fileName: name
  }
}

// 格式化上传文件数据
const formatFileDataList = (file, fileList) => {
  const { response } = file || {}
  let list = fileList
  if (response) {
    const { retCode, retMsg } = response
    if (retCode !== '200') {
      Message.warning(retMsg)
      list = fileList.slice(0, fileList.length - 1)
    }
  }
  return list
}

// 获取文件后缀名
const getExtension = fileName => {
  // 文件扩展名的正则表达式
  var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i

  // 获得文件扩展名
  var fileExtension = fileName.match(patternFileExtension)
  return fileExtension[0] || ''
}

export default {
  name: 'OrderEdit',
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      refName: 'ruleForm',
      fileCongfig: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 30, message: '标题不能超过30字', trigger: 'blur' }
        ],
        typeDict: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ],
        moduleDict: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入问题描述', trigger: 'blur' },
          { max: 500, message: '问题描述不能超过500字', trigger: 'blur' }
        ]
      },
      ruleForm: {},
      // 图片List
      imagesList: [],
      // 附件list
      attachmentsList: [],
      imgLimit: 9,
      attachLimit: 3
    }
  },
  computed: {
    ...mapGetters(['dicMap', 'dicCodes', 'loading', 'modalData']),
    woType() {
      return this.dicCodes['work_order_type']
    },
    moduleDict() {
      return this.dicCodes['work_order_module']
    },
    woTypeList() {
      return this.dicMap[this.woType]
    },
    moduleDictList() {
      return this.dicMap[this.moduleDict]
    },
    upImgClass() {
      return {
        'hide-upload-btn': this.imagesList.length >= this.imgLimit
      }
    },
    upAttachments() {
      return {
        'hide-upload-btn': this.attachmentsList.length >= this.attachLimit
      }
    }
  },
  mounted() {
    this.$store.dispatch('common/getDictChild', this.woType)
    this.$store.dispatch('common/getDictChild', this.moduleDict)
    this.fileCongfig = uploadConfig()
  },
  methods: {
    onClose() {
      this.$store.dispatch('hideModal')
      this.$refs[this.refName].resetFields()
      Object.assign(this, {
        ruleForm: {},
        imagesList: [],
        attachmentsList: []
      })
    },
    onOpen() {
      this.ruleForm = Object.assign({}, this.modalData)
      const { images, attachments } = this.modalData || {}
      if (images) {
        this.imagesList = images.map(({ attachmentUrl, fileName }) => ({
          name: fileName,
          url: attachmentUrl
        }))
      }
      if (attachments) {
        this.attachmentsList = attachments.map(
          ({ attachmentUrl, fileName }) => ({
            name: fileName,
            url: attachmentUrl
          })
        )
      }
    },
    onSubmit() {
      this.$refs[this.refName].validate(valid => {
        if (!valid) {
          return
        }
        const images = this.imagesList.map(getFileData)
        const attachments = this.attachmentsList.map(getFileData)

        this.$store.dispatch('clientOrder/onEditWo', {
          // code: '',
          ...this.ruleForm,
          attachments,
          images
        })
      })
    },

    // 图片上传前判断文件后缀
    beforeUploadImg(file) {
      const exNames = ['.png', '.jpg']
      const { name } = file || {}
      const extension = getExtension(name)
      if (exNames.indexOf(extension) === -1) {
        Message.warning(`图片格式仅支持${exNames.join()}`)
        return false
      }
      if (this.imagesList.length > this.imgLimit) {
        console.log(this.imagesList, '--')
        Message.warning(`只可上传${this.imgLimit}张图片`)
        return false
      }

      return true
    },

    fnGetExtension(fileName) {
      // 文件扩展名的正则表达式
      var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i

      // 获得文件扩展名
      var fileExtension = fileName.match(patternFileExtension)
      return fileExtension
    },

    // 图片改变
    imgesChange(file, fileList) {
      this.imagesList = formatFileDataList(file, fileList)
    },
    // 附件改变
    attachmentChange(file, fileList) {
      this.attachmentsList = formatFileDataList(file, fileList)
    },
    removeImg(file, fileList) {
      this.imagesList = fileList
      console.log(this.imagesList, 'this.imagesList')
    },
    removeAttachment(file, fileList) {
      this.attachmentsList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-upload-btn {
  >>> .el-upload--picture-card {
    display: none;
  }
  .do-upload-btn {
    display: none;
  }
}
</style>
