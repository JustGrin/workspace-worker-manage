<template>
  <div>
    <el-card>
      参考地址:
      <a
        href="https://github.com/jrainlau/chat-input-box"
        target="_blank"
      >https://github.com/jrainlau/chat-input-box</a>
    </el-card>

    <div :ref="refName" class="editor" contenteditable="true" />
 
  </div>
</template>

<script>
/**
 * 预览函数
 *
 * @param {*} dataUrl base64字符串
 * @param {*} cb 回调函数
 */
function toPreviewer(dataUrl, cb) {
  cb && cb(dataUrl)
}

/**
 * 图片压缩函数
 *
 * @param {*} img 图片对象
 * @param {*} fileType  图片类型
 * @param {*} maxWidth 图片最大宽度
 * @returns base64字符串
 */
function compress(img, fileType, maxWidth) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')

  const proportion = img.width / img.height
  const width = maxWidth
  const height = maxWidth / proportion

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)

  const base64data = canvas.toDataURL(fileType, 0.75)
  canvas = ctx = null

  return base64data
}

/**
 * 选择图片函数
 *
 * @param {*} e input.onchange事件对象
 * @param {*} cb 回调函数
 * @param {number} [maxsize=200 * 1024] 图片最大体积
 */
/**
 * 选择图片函数
 *
 * @param {*} e input.onchange事件对象
 * @param {*} cb 回调函数
 * @param {number} [maxsize=200 * 1024] 图片最大体积
 */
function chooseImg(e, cb, maxsize = 200 * 1024) {
  const file = e.target.files[0]

  if (!file || !/\/(?:jpeg|jpg|png)/i.test(file.type)) {
    return
  }

  const reader = new FileReader()
  reader.onload = function() {
    const result = this.result
    let img = new Image()

    if (result.length <= maxsize) {
      toPreviewer(result, cb)
      return
    }

    img.onload = function() {
      console.log(123213123123)
      const compressedDataUrl = compress(img, file.type, maxsize / 1024)
      toPreviewer(compressedDataUrl, cb)
      console.log(123213123123)
      img = null
    }

    img.src = result
  }

  reader.readAsDataURL(file)
}

/**
 * 处理粘贴板数据
 *
 * @param {*} e paste粘贴板对象
 */
const onPaste = e => {
  const { clipboardData } = e
  if (!clipboardData || !clipboardData.items) {
    // 如果粘贴板没用数据 则 返回
    return
  }
  return new Promise((resolve, reject) => {
    // 复制的内容在剪贴板里位置不确定，所以通过遍历来保证数据准确
    for (const item of clipboardData.items) {
      switch (item.kind) {
        case 'string':
          item.getAsString(str => resolve(str))
          return
        case 'file':
          {
            const pasteFile = item.getAsFile()
            // 处理pasteFile
            // TODO(pasteFile)

            chooseImg(
              {
                target: {
                  files: [pasteFile]
                }
              },
              src => resolve(src)
            )
          }

          return
        default:
          reject(new Error('Not allow to paste this type!'))
      }
    }
  })
}

export default {
  data() {
    return {
      refName: 'chat-box-ref',
      testImg: 'https://static.easyicon.net/preview/121/1214124.gif'
    }
  },
  computed: {
    chartBoxDom() {
      return this.$refs[this.refName]
    }
  },
  mounted() {
    this.chartBoxDom.addEventListener('paste', async e => {
      // 读取剪贴板的内容
      const result = await onPaste(e)
      const imgRegx = /^data:image\/png;base64,/
      // 如果是图片格式（base64），则通过构造range的办法把<img>标签插入正确的位置
      // 如果是文本格式，则通过document.execCommand('insertText')方法把文本插入
      if (imgRegx.test(result)) {
        const sel = window.getSelection()
        if (sel && sel.rangeCount === 1 && sel.isCollapsed) {
          const range = sel.getRangeAt(0)
          const img = new Image()
          img.src = result
          img.style = 'max-width: 400px'
          range.insertNode(img)
          range.collapse(false)
          sel.removeAllRanges()
          sel.addRange(range)
        }
      } else {
        document.execCommand('insertText', false, result)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';

.editor {
  height: 200px;
  border: 1px solid #ccc;
  overflow-y: scroll;
  @include scrollBar;
  img {
    max-width: 400px;
  }
}
</style>
