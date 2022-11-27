<template>
  <el-card>
    <div slot="header">
      任务状态
    </div>
    <el-form
      label-width="100px"
      :inline="true" 
    >
 
      <el-form-item label="接入设备">
        <el-select v-model="accessEquipmentId" placeholder="请选择接入设备">
          <el-option
            v-for="item in accessEquipmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="tool_bar">
      <el-button type="success" size="small" @click="onAllStart">全部启动</el-button>
      <el-button type="warning" plain size="small" @click="onAllStop">全部停止</el-button>
    </div>
    <Rtable :source-data="taskList" :columns="columns" :pagination="false">
      <template #status="scope">
        <el-popover
          placement="top"
          title="说明"
          width="400"
          trigger="hover"
          :content="scope.row.remark"
        >
    
          <template slot="reference">
            <el-tag
              v-if="Number(scope.row.status)"
              size="small"
              effect="dark"
              type="success"
            >正常</el-tag>
          
            <el-tag v-else type="danger" size="small" effect="dark">异常</el-tag>

          </template>
      
        </el-popover>

      </template>
    </Rtable>
    <EditUser
      :visible="modalKey === modalKeys.edit"
      @onClose="onHide"
      @onOk="onSubmitEdit"
    />
  </el-card>
</template>

<script>
import Rtable from '@/components/r-table'
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import EditUser from './components/EditUser'

const modalKeys = {
  edit: 'edit'
}

export default {
  components: {
    Rtable,
    EditUser
  },
  data() {
    return {
      modalKeys,
      conditions: {},
      taskList: [],
      accessEquipmentList: [], // 接入设备列表
      accessEquipmentId: null
    }
  },
  computed: {
    ...mapGetters(['modalKey', 'modalData']),
    columns() {
      // 'remark': '@paragraph', // 说明

      return [
        {
          label: '设备工位',
          prop: 'station',
          width: 80,
        },
        {
          label: '雾化片编号',
          prop: 'atomizerNo'
        },
        {
          label: '雾化量(ml/min)',
          prop: 'volumeFlow'
        },
        {
          label: '运行状态',
          prop: 'status',
          slotName: 'status',
          // width: 80,
        }, 
        {
          label: '操作',
          prop: 'isenable',
          width: 350,
          operates: [
            {
              el: 'button',
              text: '编辑',
              opEvent: this.onShowEdit,
              props: {
                type: 'dafault',
              },
            },
            {
              el: 'button',
              text: '开始',
              opEvent: this.onStart,
              props: {
                type: 'dafault',
              },
            },
            {
              el: 'button',
              text: '停止',
              opEvent: this.onStop,
              props: {
                type: 'success',
              },
            },
            {
              el: 'button',
              text: '暂停',
              opEvent: this.onSuspend,
              props: {
                type: 'primary',
              },
            },
 
            {
              el: 'popconfirm',
              text: '删除',
              props: {
                title: '确定删除吗?',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              },
              childProps(row) {
                return {
                  type: 'danger',
                  // disabled: true
                }
              },
              opEvent: this.onDel
            }
          ]
        }
      ]
    }
  },
  watch: {
    accessEquipmentId() {
      this.loadTaskList(this.accessEquipmentId)
    }
  },
  mounted() {
    this.loadAccessEquipment()
  },
  methods: {
    onEdit(row) {
      console.log(row)
    },
    // 加载接入设备列表
    loadAccessEquipment() {
      request({
        url: '/taskStatus/accessEquipment/list',
        method: 'get'
      }).then(res => {
        if (res && res.data && res.data.length) {
          this.accessEquipmentList = res.data
          // 默认选择第一条
          this.accessEquipmentId = this.accessEquipmentList[0].id
        }
      })
    },
    // 根据设备id加载任务列表
    loadTaskList(accessEquipmentId = this.accessEquipmentId) {
      if (!accessEquipmentId) {
        return
      }
      request({
        url: '/taskStatus/task/list',
        method: 'get',
        params: {
          accessEquipmentId: accessEquipmentId
        }
      }).then(res => {
        if (res && res.data && res.data.length) {
          this.taskList = res.data || []
          console.log(this.taskList, '- this.taskList ')
        }
      })
    },
    // 全部停止开始
    onAllStart() {
      if (!this.accessEquipmentId) {
        return
      }
      request({
        url: '/taskStatus/task/allStart',
        method: 'post',
        data: {accessEquipmentId: this.accessEquipmentId}
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },
    // 全部停止
    onAllStop() {
      if (!this.accessEquipmentId) {
        return
      }
      request({
        url: '/taskStatus/task/allStop',
        method: 'post',
        data: {accessEquipmentId: this.accessEquipmentId}
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },

    // 删除
    onDel(row) {
      request({
        url: '/taskStatus/task/delete',
        method: 'post',
        data: { id: row.id }
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },
    // 开始
    onStart(row) {
      request({
        url: '/taskStatus/task/start',
        method: 'post',
        data: { id: row.id }
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },
    // 停止
    onStop(row) {
      request({
        url: '/taskStatus/task/stop',
        method: 'post',
        data: { id: row.id }
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },
    // 暂停
    onSuspend(row) {
      request({
        url: '/taskStatus/task/suspend',
        method: 'post',
        data: { id: row.id }
      }).then(res => {
        if (res.success) {
          this.loadTaskList()
        }
      })
    },
    // 编辑弹框
    onShowEdit(row) {
      this.$store.dispatch('showModal', {
        modalKey: this.modalKeys.edit,
        modalData: row
      })
    },
    // 提交编辑
    onSubmitEdit() {
      this.loadTaskList()
      this.onHide()
    },
    // 隐藏弹框
    onHide() {
      this.$store.dispatch('hideModal')
    },
  }
}
</script>

<style lang="scss" scoped>
.tool_bar {
  padding-bottom: 1em;
}
</style>
