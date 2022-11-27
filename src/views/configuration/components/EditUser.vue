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
 
      <el-form-item label="注水时间(s)" prop="waterfloodTime">
        <el-input
          v-model="ruleForm.waterfloodTime"
          type="number" 
          placeholder="注水时间(s)"
        />
      </el-form-item>
      <el-form-item label="功率(w)" prop="power">
        <el-input
          v-model="ruleForm.power"
          type="number" 
          placeholder="功率(w)"
        />
      </el-form-item>
      <el-form-item label="雾化频率(k)" prop="frequency">
        <el-input
          v-model="ruleForm.frequency"
          type="number" 
          placeholder="雾化频率(k)"
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
        waterfloodTime: [
          { required: true, message: '注水时间', trigger: 'blur' },
 
        ],
        power: [
          { required: true, message: '功率', trigger: 'blur' },
 
        ],
        frequency: [
          { required: true, message: '雾化频率', trigger: 'blur' },
 
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
          url: '/configuration/config/edit',
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
