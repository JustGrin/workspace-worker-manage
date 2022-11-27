<template>
  <el-form
    :ref="refName"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <el-form-item prop="newPassword">
      <el-input
        v-model="loginForm.newPassword"
        size="large"
        :placeholder="'新密码'"
        name="newPassword"
        type="password"
        tabindex="1"
        auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="confirmPwd">
      <el-input
        v-model="loginForm.confirmPwd"
        size="large"
        type="password"
        :placeholder="'确认新密码'"
        name="confirmPwd"
        tabindex="2"
        auto-complete="on"
        @keyup.enter.native="handleLogin"
      />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      class="loginBtn"
      @click.native.prevent="handleLogin"
    >
      重置密码
    </el-button>
    <div class="footer-btns">
      <el-button type="text" @click="changeComponent('PwdLogin')">
        {{ $t('login.toLogin') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

// pwdSame: '两次输入密码不一致!',
// newPwdReq: '新密码不能为空',
// confirmPwdReq: '请输入确认密码'

const refName = 'loginForm'

export default {
  name: 'PwdLogin',
  inject: ['changeComponent'],
  data() {
    const validatePass = (rule, value, callback) => {
      if (value) {
        if (this.loginForm.confirmPwd !== '') {
          this.$refs[refName].validateField('confirmPwd')
        }
        const pwdRegEn = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
        if (!pwdRegEn.test(value)) {
          callback(new Error(this.$t('account.pwdFormat')))
          return
        }
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value && value !== this.loginForm.newPassword) {
        callback(new Error(this.$t('account.pwdSame')))
      } else {
        callback()
      }
    }
    return {
      refName,
      loginForm: {
        newPassword: '',
        confirmPwd: ''
      },
      loginRules: {
        newPassword: [
          {
            required: true,
            message: this.$t('account.newPwdReq'),
            trigger: 'blur'
          },
          {
            min: 6,
            message: this.$t('account.pwdMin'),
            trigger: 'blur'
          },
          {
            max: 12,
            message: this.$t('account.pwdMax'),
            trigger: ['change', 'blur']
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPwd: [
          {
            required: true,
            message: this.$t('account.confirmPwdReq'),
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },

      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs[refName].validate(valid => {
        if (!valid) {
          return false
        }

        const { telPhone, code } = window.tempCodeData || {}
        this.$store
          .dispatch('user/resetPwd', {
            verifyCode: code,
            telPhone: telPhone.trim(),
            password: this.loginForm.newPassword
          })
          .then(success => success && this.changeComponent('PwdLogin'))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
