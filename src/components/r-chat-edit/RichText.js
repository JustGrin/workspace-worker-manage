import Vue from 'vue'

export default Vue.component('RichText', {
  props: {
    content: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    contentMap(arr, createElement) {
      return arr.map(item => {
        if (typeof item === 'string') {
          return item
        }
        const { tag, attrs, children } = item

        const attribut = {
          attrs: {},
          style: {
            'max-width': '100%',
            'word-wrap': 'break-word',
            'word-break': 'normal'
          },
          props: {},
          class: {}
        }

        let itemTag = tag

        // const htmlClass = {}
        for (const attrItem of attrs) {
          const { name, value } = attrItem
          switch (name) {
            case 'style':
              Object.assign(attribut.style, {
                [name]: value
              })
              break
            case 'class':
              Object.assign(attribut.class, {
                [name]: value
              })
              break
            default:
              Object.assign(attribut.attrs, {
                [name]: value
              })
          }
        }

        if (tag === 'img') {
          itemTag = 'el-image'
          Object.assign(attribut.props, {
            src: attribut.attrs.src,
            'preview-src-list': [attribut.attrs.src]
          })
        }
        if (tag === 'pre') {
          itemTag = 'p'
        }
        return createElement(
          itemTag,
          attribut,
          this.contentMap(children, createElement)
        )
      })
    }
  },
  render: function(createElement) {
    return createElement('div', this.contentMap(this.content, createElement))
  }
})
