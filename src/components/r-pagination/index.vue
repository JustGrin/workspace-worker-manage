<template>
  <div class="r-pagination">
    <el-button type="text" :disabled="Number(current) === 1" @click="toFirstPage">{{ $t('btns.firstPage') }}</el-button>
    <el-pagination
      :current-page="current"
      :page-size="size"
      layout="  prev, pager, next"
      :total="total"
      @current-change="onPageChange"
    />
    <el-button type="text" :disabled="Number(current) === lastPageNum" @click="toLastPage">{{ $t('btns.lastPage') }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'RPagination',
  props: {
    current: {
      type: [Number, String],
      default: 1
    },
    size: {
      type: [Number, String],
      default: 15
    },
    total: {
      type: [Number, String],
      default: 0
    }
  },
  data: function() {
    return {}
  },
  computed: {
    lastPageNum() {
      return Math.ceil(this.total / this.size)
    }
  },
  methods: {
    onPageChange(pageNum) {
      this.$emit('onPageChange', pageNum)
    },
    toFirstPage() {
      this.onPageChange(1)
    },
    toLastPage() {
      this.onPageChange(this.lastPageNum)
    }
  }
}
</script>

<style>
.r-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
