<template>
  <el-card>
    <div slot="header">
      远程数据
    </div>
    <SearchForm :conditions.sync="conditions" />
    <Rtable :url="url" :conditions="conditions" :columns="columns" :size="5">
      <template #updateOne="scope">
        <span>作者是: {{ scope.row.updateBy }}</span>
      </template>
    </Rtable>
  </el-card>
</template>

<script>
import Rtable from '@/components/r-table'
import SearchForm from './SearchForm' 

export default {
  components: {
    Rtable,
    SearchForm
  },
  data() {
    return {
      url: '/test/table/page',
      conditions: {}
    }
  },
  computed: {
    columns() {
      return [
        {
          label: this.$t('example.page-table.username'),
          prop: 'userName'
        },
        {
          label: this.$t('example.page-table.realname'),
          prop: 'realName'
        },
        {
          label: this.$t('example.page-table.usertype'),
          prop: 'roleAlias'
        },
        {
          label: this.$t('example.page-table.createtime'),
          prop: 'createdDate'
        },
        {
          label: this.$t('example.page-table.remark'),
          prop: 'remark'
        },
        {
          label: this.$t('example.page-table.renderOh'),
          prop: 'updateBy',
          slotName: 'updateOne'
        },
        {
          label: this.$t('example.page-table.switch'),
          prop: 'state',
          width: 70,
          operates: [
            {
              el: 'switch',
              prop: 'state',

              props: {
                // 'active-text': this.$t('btns.on'),
                // 'inactive-text': this.$t('btns.off'),
                'active-value': 1,
                'inactive-value': 0
              },
              opEvent(v, row) {
                // console.log(v, scope)
                row.state = v
              }
            }
          ]
        },
        {
          label: this.$t('example.page-table.operate'),
          prop: 'isenable',
          width: 150,
          operates: [
            {
              el: 'button',

              text: this.$t('btns.edit'),
              opEvent(row) {
                console.log(row)
              }
            },
            {
              el: 'popconfirm',
              text: this.$t('btns.reset'),
              props(row) {
                return {
                  title: `确认重置用户 ${row.userName}(${row.realName})的密码？`
                }
              },
              childProps: {
                type: 'default'
              },
              opEvent(row) {
                console.log(row)
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    onEdit(row) {
      console.log(row)
    }
  }
}
</script>

<style></style>
