<template>
  <el-form
    :ref="refName"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <el-form-item prop="telPhone">
      <el-input
        v-model="loginForm.telPhone"
        size="large"
        :placeholder="$t('account.telPhone')"
        name="telPhone"
        type="text"
        tabindex="1"
        auto-complete="on"
      >
        <svg-icon slot="prefix" icon-class="user " />
      </el-input>
    </el-form-item>

    <el-form-item prop="code">
      <div class="note-input">
        <el-input
          v-model="loginForm.code"
          size="large"
          type="text"
          :placeholder="this.$t('account.noteCode')"
          name="code"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />

        <el-button
          size="large"
          type="primary"
          :loading="loading"
          :disabled="!!countDown"
          @click="onGetCode"
        >
          {{ getCodeBtn }}
        </el-button>
      </div>
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      class="loginBtn"
      @click.native.prevent="handleLogin"
    >
      {{ okText }}
    </el-button>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { validateRegExp } from '@/utils/validate'

export default {
  name: 'NoteLogin',
  inject: ['changeComponent'],
  props: {
    okText: {
      type: String,
      default: ''
    },
    template: {
      type: String,
      default: '' // USER_VALIDATE,LOGIN_CONFIRM(登录),LOGIN_EXCEPTION,USER_REGISTER,PWD_MODIFY(忘记密码，修改密码),USERINFO_MODIFY
    }
  },
  data() {
    // 校验电话
    const validatePhone = (rule, value, callback) => {
      if (value && !validateRegExp('phoneNumber', value)) {
        callback(new Error(this.$t('account.phoneNumberFormat')))
      } else {
        callback()
      }
    }
    return {
      refName: 'loginForm',
      loginForm: {
        telPhone: '',
        code: ''
      },
      loginRules: {
        telPhone: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('account.mobileReq')
          },
          {
            trigger: 'blur',
            validator: validatePhone
          }
        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('account.noteReq')
          }
        ]
      },
      countDown: 0
    }
  },
  computed: {
    ...mapGetters(['loading']),
    getCodeBtn() {
      return this.countDown
        ? this.countDown + 's'
        : this.$t('account.sendNoteCode')
    }
  },

  methods: {
    handleLogin() {
      this.$refs[this.refName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$emit('onOk', this.loginForm)
      })
    },
    // 发送验证
    onGetCode() {
      this.$refs[this.refName].validateField(['telPhone'], err => {
        if (err) {
          return
        }
        const { telPhone } = this.loginForm
        this.$store
          .dispatch('sendCode', {
            telPhone,
            template: this.template,
            purpose: 2
          })
          .then(isSucess => isSucess && this.setCountDown())
      })
    },

    // 开始倒计时
    setCountDown() {
      this.countDown = 60
      let downIntrval = setInterval(() => {
        this.countDown -= 1
        if (this.countDown <= 0) {
          clearInterval(downIntrval)
          downIntrval = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
