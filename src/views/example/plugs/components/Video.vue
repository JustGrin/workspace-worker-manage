<template>
  <el-card>
    <div slot="header">
      视频插件
    </div>
    <el-card> 文档地址： <a target="_blank" href="http://h5player.bytedance.com">http://h5player.bytedance.com</a> </el-card>
    <el-card>
      <Rvideo loop screen-shot url="/example/食屎啦.mp4" />
    </el-card>
  </el-card>
</template>

<script>
import Rvideo from '@/components/r-video'

export default {
  components: {
    Rvideo
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {}
}
</script>

<style></style>
