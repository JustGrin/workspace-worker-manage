<template>
  <el-input
    ref="password"
    :key="passwordType"
    v-bind="pwdAttrs"
    :value="value"
    :type="passwordType"
    @input="$emit('input')"
    v-on="pwdListents"
  >
    <svg-icon v-if="prefix" slot="prefix" icon-class="password" />
    <svg-icon
      slot="suffix"
      :icon-class="passwordType === typeKeys.pwd ? 'eye' : 'eye-open'"
      class="show-pwd"
      @click="showPwd"
    />
  </el-input>
</template>

<script>
const typeKeys = {
  pwd: 'password',
  text: 'text'
}

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    prefix: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordType: typeKeys.pwd,
      typeKeys
    }
  },
  computed: {
    pwdAttrs() {
      return Object.assign(
        {
          placeholder: this.$t('account.password'),
          tabindex: '2'
        },
        this.$attrs
      )
    },
    pwdListents() {
      return Object.assign({}, this.$listeners)
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === typeKeys.pwd) {
        this.passwordType = typeKeys.text
      } else {
        this.passwordType = typeKeys.pwd
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.show-pwd {
  cursor: pointer;
  margin-top: 12px;
}
</style>
