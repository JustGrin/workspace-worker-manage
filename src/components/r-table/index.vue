<template>
  <div v-loading="tableLoading" class="contBox">
    <div>
      <el-table
        v-bind="$attrs"
        :data="_tableData"
        border
        size="mini"
        @sort-change="sortChange"
      >
        <!--数据列-->
        <template v-for="col in _columns">
          <el-table-column v-if="col.slotName" :key="col.label" v-bind="col">
            <template v-slot="scope">
              <slot v-bind="scope" :name="col.slotName" />
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="col.operates"
            :key="col.label"
            v-bind="col"
          >
            <template v-slot="{ row, $index }">
              <template v-for="(ope, i) of col.operates">
                <template v-if="ope.el === 'popconfirm'">
                  <template v-if="i > 0">
                    &nbsp;&nbsp;
                  </template>
                  <el-popconfirm
                    :key="i"
                    v-bind="getColBind(ope.props, row, $index)"
                    @onConfirm="ope.opEvent(row, $index, $event)"
                  >
                    <el-button
                      slot="reference"
                      v-bind="getColBind(ope.childProps, row, $index)"
                    >
                      {{ ope.text }}
                    </el-button>
                  </el-popconfirm>
                </template>

                <el-switch
                  v-else-if="ope.el === 'switch'"
                  :key="i"
                  :value="row[ope.prop || col.prop]"
                  v-bind="getColBind(ope.props, row, $index)"
                  @change="ope.opEvent($event, row, $index)"
                />
                <el-button
                  v-else
                  :key="i"
                  v-bind="getColBind(ope.props, row, $index)"
                  @click="ope.opEvent(row, $index, $event)"
                >
                  {{ ope.text }}
                </el-button>
              </template>
            </template>
          </el-table-column>

          <el-table-column v-else :key="col.label" v-bind="col" />
        </template>
        <!--end-->
        <NoData slot="empty" />
      </el-table>
    </div>
    <div class="gutter" />
    <el-pagination
      v-if="!!pagination"
      :current-page.sync="current"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="onPageChange"
    />
  </div>
</template>

<script>
import NoData from '@/components/NoData'
import tableMixins from './tableMixins'

// 操作组件
export default {
  naem: 'r-table',
  components: { NoData },
  mixins: [tableMixins],
  inheritAttrs: false,

  props: {
    url: {
      type: String,
      default: ''
    },
    pagination: {
      type: [Object, Boolean],
      default: () => {
        return {}
      }
    },
    size: {
      type: Number,
      default() {
        return this.pagination ? 18 : 500
      }
    },

    conditions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    getResponse: {
      type: Function,
      default: null
    },
    colByData: {
      // 通过 数据的 headers 生成 columns
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: null
    },
    lineHeight: {
      // 行高
      type: Number,
      default: 41
    },
    headLineHeight: {
      // 表头行高
      type: Number,
      default: 59
    }
  },
  computed: {
    tableHeight() {
      if (this.height) {
        return this.height
      }
      return this.size * this.lineHeight + this.headLineHeight
    }
  },
  methods: {
    getColBind(props, row, $index) {
      const defProps = {
        type: 'primary',
        size: 'mini'
      }
      if (props instanceof Function) {
        return Object.assign(defProps, props(row, $index))
      }
      return Object.assign(defProps, props)
    }
  }
}
</script>

<style lang="scss" scoped>
.contBox {
  height: 100%;
  .gutter {
    height: 10px;
  }
}
</style>
