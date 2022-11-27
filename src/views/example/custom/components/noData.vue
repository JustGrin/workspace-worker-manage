<template>
  <div class="no-data-page">
    <NoData />
  </div>
</template>

<script>
import NoData from '@/components/NoData'

export default {
  components: {
    NoData
  },
  data() {
    return {
      src: '/bg/def_img.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data-page {
 
  height: 500px;
}
</style>
