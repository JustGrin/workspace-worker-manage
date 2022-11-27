<template>
  <div>
    <MobileVerify
      :ok-text="$t('login.logIn')"
      template="LOGIN_CONFIRM"
      @onOk="onLogin"
    />
    <div class="footer-btns">
      <el-button type="text" @click="changeComponent('PwdLogin')">
        {{ $t('login.pwdLogin') }}
      </el-button>
      <el-button
        slot="reference"
        type="text"
        @click="changeComponent('RecoverPwd')"
      >
        {{ $t('login.forgetPwd') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileVerify from './MobileVerify'

export default {
  name: 'NoteLogin',
  components: {
    MobileVerify
  },

  inject: ['changeComponent'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    onLogin({ code, telPhone }) {
      this.$store.dispatch('user/login', {
        code,
        telPhone,
        grantType: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
