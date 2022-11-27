<template>
  <div :ref="refName" />
</template>

<script>
import Player from 'xgplayer'

export default {
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    screenShot: {
      type: Boolean,
      default: false
    },
    videoInit: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      player: null,

      refName: 'video-ref'
    }
  },
  computed: {
    attrs() {
      return {}
    }
  },
  mounted() {
    this.player = new Player(
      Object.assign(
        {
          el: this.$refs[this.refName],
          autoplay: this.autoplay,
          loop: this.loop,
          videoInit: this.videoInit,
          screenShot: this.screenShot,
        },
        this.$attrs
      )
    )
  }
}
</script>

<style></style>
