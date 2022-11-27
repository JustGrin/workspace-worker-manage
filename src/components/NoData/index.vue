<template>
  <div class="no-data">
    <el-image :src="src" fit="scale-down" />
    <div class="text">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: '/bg/def_img.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 15%;
  .text {
    color: #ccc;
    line-height: 80px;
  }
}
</style>
