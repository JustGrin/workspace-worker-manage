<template>
  <el-dialog
    title="查看工单"
    :visible="visible"
    destroy-on-close
    :center="true"
    @close="onClose"
    @open="onOpen"
  >
    <el-form :ref="formName" label-width="80px" size="mini" :model="ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标题">
            <span>{{ modalData.title }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="NO">
            <span>{{ modalData.code }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="工单类型">
            <span>{{ modalData.typeDictValue }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属模块">
            <span>{{ modalData.moduleDictValue }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="问题描述">
        <div>
          {{ modalData.description }}
        </div>
      </el-form-item>

      <!-- 上传图片 -->
      <el-form-item label="上传图片">
        <el-upload
          action=""
          list-type="picture-card"
          class="hide-upload-btn"
          :file-list="imagesList"
          :on-preview="prevImges"
          disabled
        />
      </el-form-item>

      <el-form-item label="上传附件">
        <el-upload
          action=""
          :file-list="attachmentsList"
          class="hide-upload-btn"
          disabled
          :on-preview="download"
        />
      </el-form-item>
      <el-divider class="color-divider">{{ modalData.statusValue }}</el-divider>
      <template
        v-if="modalData.statusDict === 'D' || modalData.statusDict === 'C'"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="接单时间">
              <div>
                {{ modalData.startTime | dateformat }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接单人">
              <span>
                {{ modalData.startRealName }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-if="modalData.statusDict === 'C'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="处理时间">
              <span>{{ modalData.doneTime | dateformat }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理人">
              <span>
                {{ modalData.doneRealName }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="回复">
          <span>
            {{ modalData.resultContent }}
          </span>
        </el-form-item>
      </template>

      <template v-if="modalData.statusDict === 'D' && isService">
        <el-form-item
          label="回复"
          prop="resultContent"
          :rules="[
            { required: true, message: '回复不能为空'},
          ]"
        >
          <el-input v-model="ruleForm.resultContent" placeholder="请输入回复" />
        </el-form-item>
      </template>
    </el-form>
    <el-dialog
      :visible.sync="previewVisible"
      append-to-body
      class="img-preview-box"
    >
      <img width="100%" :src="previewUrl" alt="预览图片">
    </el-dialog>

    <div v-if="isService" slot="footer" style="text-align: center">
      <template v-if="modalData.statusDict === 'W'">
        <el-button plain type="primary" @click="onStartWo">
          接 单
        </el-button>
      </template>
      <template v-if="modalData.statusDict === 'D'">
        <el-button @click="onClose">
          取 消
        </el-button>
        <el-button type="primary" :loading="loading" @click="onDoingWo">
          确 定
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFileByUrl } from '@/api/file'

export default {
  name: 'OrderEdit',
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    isService: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      // 图片List
      imagesList: [],
      // 附件list
      attachmentsList: [],
      imgLimit: 9,
      attachLimit: 3,
      // 图片预览
      previewUrl: '',
      previewVisible: false,
      ruleForm: {},
      formName: 'ruleForm',
    }
  },
  computed: {
    ...mapGetters(['modalData', 'dicMap', 'dicCodes', 'loading']),
    woStatus() {
      return this.dicCodes['work_order_status']
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
  mounted() {},
  methods: {
    onClose() {
      this.$store.dispatch('hideModal')
      Object.assign(this, {
        imagesList: [],
        attachmentsList: [],
        ruleForm: {}
      })
      if (this.isService) {
        this.$store.dispatch('serviceOrder/LoadeWoPage')
      }
    },
    onOpen() {
      const { images, attachments } = this.modalData || {}
      // statusDict  状态(W:等待；D：处理中；C：完成)
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

    onStartWo() {
      const { code } = this.modalData

      this.$store.dispatch('serviceOrder/onStartWo', { code })
    },
    onDoingWo() {
      const { resultContent } = this.ruleForm
      const { code } = this.modalData
      this.$refs[this.formName].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$store.dispatch('serviceOrder/onDoingWo', {
          code,
          content: resultContent
        })
      })
    },

    // 预览图片
    prevImges(file) {
      const { url } = file || {}
      Object.assign(this, {
        previewUrl: url,
        previewVisible: true
      })
    },
    // 下载附件
    download(file) {
      const { url } = file || {}
      downloadFileByUrl(url)
      // downloadFile({
      //   fileUrl: url,
      //   fileName: name
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-upload-btn {
  >>> .el-upload {
    display: none;
  }
}
.img-preview-box {
  >>> .el-dialog__header {
    display: none;
  }
}

$primary-color: #9580f9;
.color-divider {
  background: $primary-color;

  >>> .el-divider__text {
    color: $primary-color;
  }
}
</style>
