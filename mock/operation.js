import Mock from 'mockjs'
import { getResponse, api, pageJson } from './tools'

const operationTable = Mock.mock({
  'tableDatas|10': [
    {
      id: '@integer(1,10)',
      goodName: '@ctitle',
      qty: '@integer(10,1000) ',
      money: '@float(100,10000)'
    }
  ],
  'inventoryTable|33': [
    {
      id: '@integer(1,10)',
      'amount|1-99999': 0.01,
      goodsName: '@cword(3,6)',
      'index|+1': 0,
      'qty|0-9999': 1
    }
  ],
  'accessEquipment|10': [
    {
      id: '@guid',
      name: '@ctitle',
    }
  ],
  'taskList|10': [
    {
      id: '@guid',
      'station|+1': 1, // 设备工位
      atomizerNo: '@string(5)', // 雾化片编号
      volumeFlow: '@float(1, 20, 2)', // 雾化量(ml/min)
      'status|0-1': 1, // 运行状态
      'remark': '@paragraph(1,2)', // 说明
    }
  ],
  'configList|10': [
    {
      id: '@guid',
      'station|+1': 1, // 设备工位
 
      waterfloodTime: '@float(1, 20, 2)', // 注水时间(s)
      power: '@float(1, 20, 2)', // 功率(w)
      frequency: '@integer(1, 20)', // 雾化频率(k)
 
    }
  ],
})
 
const topList = {
  monthBuyAmount: '111',
  monthBuyOrderPrice: '222',
  monthBuyOrderTotal: '333',
  monthBuySupplierPrice: '444',
  monthBuySupplierTotal: '555',
  yesterdayBuyAmount: '666'
}

export default [
  { // 获取接入设备列表
    url: '/taskStatus/accessEquipment/list',

    type: 'get',
    response: config => {
      const tableData = operationTable.accessEquipment
      return {
        code: '200',
        data: tableData
      }
    }
  },
  { // 任务列表
    url: '/taskStatus/task/list',
    type: 'get',
    response: config => {
      const tableData = operationTable.taskList
      return {
        code: '200',
        data: tableData
      }
    }
  },
  { // 删除任务
    url: '/taskStatus/task/delete',
    type: 'post',
    response: (config) => {
      const { id } = config.query || {}
      operationTable.taskList = operationTable.taskList.filter(task => task.id !== id)

      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 编辑任务
    url: '/taskStatus/task/edit',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 暂停任务
    url: '/taskStatus/task/suspend',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 开始任务
    url: '/taskStatus/task/start',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 停止任务
    url: '/taskStatus/task/stop',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 任务全部启动
    url: '/taskStatus/task/allStart',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 任务全部停止
    url: '/taskStatus/task/allStop',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },

  // 参数配置
  { // 本机信息
    url: '/configuration/base/info',
    type: 'get',
    response: config => {
      return {
        code: '200',
        data: {
          ip: '192.168.8.9:8921'
        }
      }
    }
  },
  { // 配置列表
    url: '/configuration/config/list',
    type: 'get',
    response: config => {
      const tableData = operationTable.configList
      return {
        code: '200',
        data: tableData
      }
    }
  },
  { // 删除任务
    url: '/configuration/config/delete',
    type: 'post',
    response: (config) => {
      const { id } = config.query || {}
      operationTable.configList = operationTable.configList.filter(task => task.id !== id)
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
  { // 编辑任务
    url: '/configuration/config/edit',
    type: 'post',
    response: (config) => {
      return {
        code: '200',
        data: null,
        msg: '操作成功'
      }
    }
  },
 
  {
    url: api.inventoryChart,
    type: 'get',
    response: config => {
      return getResponse({ data: topList })
    }
  }
]
