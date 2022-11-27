import request from '@/utils/request'
// 外部需要： url, size

// const defaultDescs = 'createdDate'

export default {
  props: {
    sourceData: {
      type: [Array, null],
      default: null
    }
  },
  data() {
    return {
      tableLoading: false,
      headers: [],
      tableData: [],
      current: 1,
      total: 0,
      orders: null
    }
  },
  computed: {
    _tableData() {
      return this.tableData
    },
    _headers() {
      return this.headers.map(item => {
        const { key, name, textAlign, sorted } = item
        const hItem = {
          label: name,
          prop: key
        }
        if (textAlign) {
          hItem.align = textAlign
        }
        if (sorted) {
          hItem.sortable = 'custom'
        }
        return hItem
      })
    },
    _columns() {
      let colData = this.columns
      if (this.colByData) {
        colData = colData.concat(this._headers)
      }

      return colData.map(colItem => {
        const {
          operates
          // prop, slotName
        } = colItem || {}
        const tolltip = !operates
        const baseConf = {
          'show-overflow-tooltip': tolltip,
          align: 'center'
        }
        // if (!operates && !slotName && prop) {
        //   // 普通数据才可用来排序
        //   Object.assign(baseConf, {
        //     sortable: 'custom'
        //   })
        // }

        return Object.assign(baseConf, colItem)
      })
    }
  },
  watch: {
    conditions() {
      this.current = 1
      this.loadList()
    },
    sourceData(newValue, oldValue) {
      if (newValue) {
        // 如果数据有更新也刷新表
        this.loadList()
      }
    },
  },

  mounted() {
    // 如果传入了数据就不处理了
    this.loadList()
  },

  methods: {
    // 加载数据
    async loadList(payload = {}) {
      const { current: newCurrent = this.current } = payload
  
      if (this.sourceData) {
        const startIndex = this.size * (newCurrent - 1)
        // 本地数据
        Object.assign(this, {
          tableData: this.sourceData.slice(startIndex, startIndex + this.size),
          current: newCurrent,
          total: this.sourceData.length,
          tableLoading: false
        })
      } else {
        // 远端数据
        this.tableLoading = true
        const res = await request({
          url: this.url,
          method: 'get',
          params: Object.assign(
            { current: newCurrent, size: this.size },
            this.orders,
            this.conditions
          )
        })
        const { data } = res || {}
        const { headers, records, current, total = 0 } = data || {}

        if (this.getResponse) {
          this.getResponse(res)
        }

        Object.assign(this, {
          tableData: records || [],
          current,
          total,
          tableLoading: false,
          headers: headers || []
        })
      }
    },

    // 翻页
    onPageChange(current) {
      this.loadList({ current })
    },
    // 排序
    sortChange({ column, prop, order }) {
      // this.orderCfg
      switch (order) {
        case 'ascending':
          this.orders = { ascs: prop }
          break
        case 'descending':
          this.orders = { descs: prop }
          break
        default:
          this.orders = null
      }
      this.loadList()
    }
  }
}
