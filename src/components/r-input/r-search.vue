<template>
  <el-input
    v-model="value"
    v-bind="Rattrs"
    v-on="Rlisteners"
    @keyup.enter.native="onSearch"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    defaultValue: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      value: this.defaultValue
    }
  },
  computed: {
    Rattrs() {
      const that = this
      return Object.assign(
        {
          'suffix-icon': 'el-icon-search',
          style: { width: that.width + 'px' }
        },
        that.$attrs
      )
    },
    Rlisteners() {
      const that = this

      return Object.assign({}, that.$listeners)
    }
  },
  methods: {
    onSearch() {
      if (this.$listeners.search) {
        this.$emit('search', this.value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
