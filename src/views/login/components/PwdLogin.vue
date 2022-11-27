<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <el-form-item prop="telPhone">
      <el-input
        ref="telPhone"
        v-model="loginForm.telPhone"
        size="large"
        :placeholder="$t('account.telPhone')"
        name="telPhone"
        type="text"
        tabindex="1"
        auto-complete="on"
      >
        <svg-icon slot="prefix" icon-class="user" />
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <PwdBtn
        v-model="loginForm.password"
        prefix
        size="large"
        name="password"
        @keyup.enter.native="handleLogin"
      />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      class="loginBtn"
      @click.native.prevent="handleLogin"
    >
      {{ $t('login.logIn') }}
    </el-button>
    <div class="footer-btns">
      <el-button type="text" @click="changeComponent('NoteLogin')">
        {{ $t('login.noteLogin') }}
      </el-button>
      <el-button
        slot="reference"
        type="text"
        @click="changeComponent('RecoverPwd')"
      >
        {{ $t('login.forgetPwd') }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
import { validateRegExp } from '@/utils/validate'
import { mapGetters } from 'vuex'
import PwdBtn from '@/components/PwdBtn'
import defaultSetting from '@/settings'

const { isDev } = defaultSetting

export default {
  name: 'PwdLogin',
  components: {
    PwdBtn
  },
  inject: ['changeComponent'],
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t('account.pwdMin')))
      } else {
        callback()
      }
    }
    // 校验电话
    const validatePhone = (rule, value, callback) => {
      if (value && !validateRegExp('phoneNumber', value)) {
        callback(new Error(this.$t('account.phoneNumberFormat')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        telPhone: '',
        password: '',
        ...(isDev // 开发环境时自动填有密码
          ? {
            telPhone: '12300000000', // 前台账号: '18202322320' '12345678917/xm123456', // 后台账号: '12300000000' '15708438296/xm123456',
            password: 'xm123456', //
          }
          : {})
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
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
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
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return false
        }
        const { password, telPhone } = this.loginForm
        this.$store.dispatch('user/login', { password, telPhone, grantType: 0 })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
