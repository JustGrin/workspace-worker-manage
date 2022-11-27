<template>
  <div>
    <MobileVerify
      :ok-text="$t('btns.next')"
      template="PWD_MODIFY"
      @onOk="onNext"
    />

    <div class="footer-btns">
      <el-button type="text" @click="changeComponent('PwdLogin')">
        {{ $t('login.toLogin') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileVerify from './MobileVerify'

export default {
  name: 'NoteLogin',
  components: { MobileVerify },
  inject: ['changeComponent'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['loading'])
  },

  methods: {
    onNext(data) {
      this.$store.dispatch('common/validateVerifyCode', data).then(result => {
        window.tempCodeData = data
        if (result) {
          this.changeComponent('ResetPwd')
        } else {
          this.$message.warning(this.$t('login.veriCodeErr'))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
