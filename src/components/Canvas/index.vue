<template>
  <canvas ref="outsideDomRef" class="content" />
</template>

<script>
import { dottedLine } from './generater'
export default {
  name: 'CanvsBg',
  mounted() {
    dottedLine.particles(this.$refs.outsideDomRef)
  },
}
</script>

<style scoped>
  .content{
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
