<template>
  <el-form :inline="true" style="text-align: right" @submit.native.prevent>
    <el-form-item>
      <el-input
        v-model="formSearch.userName"
        :placeholder="$t('example.page-table.searchPlaceholder')"
        prefix-icon="el-icon-search"
        @keyup.enter.native="onSearch"
      />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="$emit('onShowEdit')">
        {{ $t('example.page-table.addbtn') }}
      </el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  props: {
    conditions: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formSearch: {}
    }
  },

  methods: {
    // 回车查询
    onSearch() {
      this.$emit(
        'update:conditions',
        Object.assign({}, this.conditions, this.formSearch)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #9580f9;
.name-str {
  color: $bg-color;
}
</style>
