import Vue from 'vue'

const textBr = '-<br/>-'

export const getEditContent = json => {
  const contentArr = []
  const contentMap = arr => {
    for (const item of arr) {
      if (item && typeof item === 'string' && item.trim()) {
        const lastMap = contentArr[contentArr.length - 1] || {}
        if (lastMap.type === 'string') {
          lastMap.content = `${lastMap.content}${textBr}${item}`
        } else {
          contentArr.push({
            type: 'string',
            content: item
          })
        }
      }
      const { tag, attrs, children } = item
      if (tag === 'img') {
        const attributs = {}
        for (const attrItem of attrs) {
          const { name, value } = attrItem
          Object.assign(attributs, {
            [name]: value
          })
        }
        contentArr.push({
          type: 'img',
          content: attributs.src
        })
      }
      if (children) {
        contentMap(children)
      }
    }
  }
  contentMap(json)
  return contentArr
}

export default Vue.component('TextContent', {
  props: {
    content: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    contentMap(createElement) {
      const strArr = (this.content || '').split(textBr)
      const elArr = []
      for (const str of strArr) {
        if (str && str.trim()) {
          elArr.push(createElement('p', str.trim()))
          // if (index < strArr.length - 1) {
          //   elArr.push(createElement('br'))
          // }
        }
      }
      return elArr
    }
  },
  render: function(createElement) {
    return createElement('div', this.contentMap(createElement))
  }
})
