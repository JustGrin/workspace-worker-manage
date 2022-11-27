<template>
  <el-card>
    <div slot="header">
      参数配置
    </div>
    <el-form
      label-width="100px"
      :inline="true" 
    >
      <el-form-item label="本机信息">
        <el-input
          disabled
          :value="ip"
        />
      </el-form-item>
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
    <Rtable :source-data="taskList" :columns="columns" :pagination="false" />
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
      ip: '',
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
          label: '注水时间(s)',
          prop: 'waterfloodTime'
        },
        {
          label: '功率(w)',
          prop: 'power'
        },
    
        {
          label: '雾化频率(k)',
          prop: 'frequency'
        },
    
        {
          label: '操作',
          prop: 'isenable',
          width: 150,
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
    this.loadBaseInfo()
    this.loadAccessEquipment()
  },
  methods: {
    // 获取本机信息
    loadBaseInfo() {
      request({
        url: '/configuration/base/info',
        method: 'get'
      }).then(res => {
        if (res.success) {
          const resData = res.data
 
          this.ip = resData.ip
        }
      })
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
        url: '/configuration/config/list',
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

    // 删除
    onDel(row) {
      request({
        url: '/configuration/config/delete',
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
.header-title {
 
  display: flex;
  align-items: center;
  .title-text {
 
  }
  .title-input{
    width: 200px;
  }

}
  .tool_bar {
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
}
</style>
