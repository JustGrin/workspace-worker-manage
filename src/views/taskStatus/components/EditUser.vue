<template>
  <el-dialog
    :title="modalData.id ? '编辑任务' : '修改任务'"
    :visible="visible"
 
    width="500px"
    @close="onClose"
    @open="onOpen"
  >
    <el-form
      :ref="refName"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
    >
      <el-form-item label="设备工位" prop="station">
        <el-input
          v-model="ruleForm.station" 
          placeholder="设备工位"
        />
      </el-form-item>
      <el-form-item label="雾化片编号" prop="atomizerNo">
        <el-input
          v-model="ruleForm.atomizerNo" 
          placeholder="雾化片编号"
        />
      </el-form-item>
      <el-form-item label="雾化量(ml/min)" prop="volumeFlow">
        <el-input
          v-model="ruleForm.volumeFlow"
          type="number" 
          placeholder="雾化量(ml/min)"
        />
      </el-form-item>

      <el-form-item label="运行状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="运行状态">
          <el-option label="正常" title="正常" :value="1" />
          <el-option label="异常" title="异常" :value="0" />
        </el-select>
      </el-form-item>
 
      <el-form-item label="说明" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          placeholder="说明"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('onClose')">{{ $t('btns.cancel') }}</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        {{ $t('btns.confirm') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'

export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      refName: 'ruleForm',
      ruleForm: {},
      rules: {
        station: [
          { required: true, message: '请输入设备工位', trigger: 'blur' },
 
        ],
        atomizerNo: [
          { required: true, message: '请输入雾化片编号', trigger: 'blur' },
          { max: 100, message: '最多数100个字符', trigger: 'blur' }
        ],
        volumeFlow: [
          { required: true, message: '雾化量(ml/min)', trigger: 'blur' },
 
        ],
        remark: [
          { max: 500, message: '最多数500个字符', trigger: 'blur' }
 
        ],
  
      }
    }
  },
  computed: {
 
    ...mapGetters(['modalKey', 'modalData', 'loading'])
  },

  methods: {
    submitForm() {
      this.$refs[this.refName].validate(valid => {
        if (!valid) {
          return
        }
        request({
          url: '/taskStatus/task/edit',
          method: 'post',
          data: { id: this.modalData.id, ...this.ruleForm }
        }).then(res => {
          if (res.success) {
            this.$emit('onOk')
          }
        })
      })
    },
    onClose() {
      this.$emit('onClose')
      this.ruleForm = {}
      this.$refs[this.refName].resetFields()
    },
    onOpen() {
      this.ruleForm = Object.assign({}, this.modalData)
    }
  }
}
</script>
