<template>
  <div class="r-chat-edit-container">
    <div :id="headId">
      <!-- 菜单 -->
    </div>

    <div :ref="refName" class="r-chat-edit-box" @keyup.enter="enterKeyUp">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
  </div>
</template>

<script>
// 文档地址: https://www.kancloud.cn/wangfupeng/wangeditor3/332599
import E from 'wangeditor'

export default {
  name: 'RChatEdit',
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      headId: 'w-edit-menu',
      refName: 'w-edit',
      editor: null
    }
  },
  watch: {
    value(v) {
      if (!v || !v.length) {
        this.editor.txt.html('')
      }
    }
  },
  mounted() {
    const editor = new E(this.headId, this.$refs[this.refName])
    this.editor = editor
    editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // editor.customConfig.pasteFilterStyle = false // 关闭粘贴样式的过滤
    editor.customConfig.menus = this.menus
    editor.customConfig.zIndex = 100
    editor.customConfig.onchange = () => {
      // const jsonStr = JSON.stringify(json)
      if (this.$listeners.input) {
        // 监控变化，同步更新到 textarea
        const json = editor.txt.getJSON() // 获取 JSON 格式的内容
        this.$emit('input', json)
      }
    }
    // editor.customConfig.pasteTextHandle = content => {
    //   // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
    //   return content
    // }
    editor.create()
  },
  methods: {
    enterKeyUp(e) {
      const { ctrlKey } = e
      if (ctrlKey && this.$listeners.ctrlEnter) {
        this.$emit('ctrlEnter', this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

//   @include scrollBar;
.r-chat-edit-container {
  height: 100%;
  background: #fff;
  .r-chat-edit-box {
    border: 1px solid #ddd;
    height: 100%;
    >>> .w-e-text {
      @include scrollBar;
    }
  }
}
</style>
