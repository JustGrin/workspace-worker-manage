import Mock from 'mockjs'
import { getResponse, api, pageJson } from './tools'

const sysDictList = {
  workOrderStatus: [
    {
      id: '3fefbec49864dd85d961dbb757692253',
      code: 'W4hA20200417142555',
      createdBy: '001',
      createdDate: '2020-04-17 14:25:55',
      updateBy: '001',
      updateDate: '2020-04-17 14:25:55',
      state: 1,
      remark: '',
      typeCode: 'workOrderStatus',
      dictName: null,
      dictKey: 'C',
      dictValue: '已处理',
      flag: 1
    },
    {
      id: '823ba845279e8830ac2d4e91e1e846da',
      code: 'ETs120200417142536',
      createdBy: '001',
      createdDate: '2020-04-17 14:25:37',
      updateBy: '001',
      updateDate: '2020-04-17 14:25:37',
      state: 1,
      remark: '',
      typeCode: 'workOrderStatus',
      dictName: null,
      dictKey: 'W',
      dictValue: '待接单',
      flag: 1
    },
    {
      id: 'e2fffae5a564a89c885db7349618fcd3',
      code: 'AhZr20200417142543',
      createdBy: '001',
      createdDate: '2020-04-17 14:25:44',
      updateBy: '001',
      updateDate: '2020-04-17 14:25:44',
      state: 1,
      remark: '',
      typeCode: 'workOrderStatus',
      dictName: null,
      dictKey: 'D',
      dictValue: '处理中',
      flag: 1
    }
  ]
}

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
    }
  ]
})

// upload: `/dmp-saas-work-order/dmp/sys/file/upload`, // 上传
// getFileList: `/dmp-saas-work-order/dmp/sys/file/getByBusinessId`, // 获取列表
// deleteFileById: `/dmp-saas-work-order/dmp/sys/file/deleteById`, // 通过文件id 删除文件
// deleteFileByBusinessId: `/dmp-saas-work-order/dmp/sys/file/deleteByBusinessId`, // 通过业务id 删除文件

const dataList = [
  {
    id: '1287674975795335169',
    status: 0,
    remark: null,
    createdBy: '001',
    createdDate: '2020-07-27 17:03:32',
    updatedBy: '001',
    updatedDate: '2020-07-27 17:03:32',
    dataVersion: 0,
    concurrentVersion: 0,
    originalName: '2a794cade1c56219e35e3316c62dc233_r.jpg',
    realName: '15958694127232a794cade1c56219e35e3316c62dc233_r.jpg',
    url:
      'D:\\dmp\\file\\2020\\07\\27\\15958694127232a794cade1c56219e35e3316c62dc233_r.jpg',
    type: 'image/jpeg',
    size: 19701,
    businessId: '1287674975761780737'
  }
]

export default [
  {
    // 字典
    url: api.getI18nDict,
    type: 'get',
    response: config => {
      const { typeCode } = config.query || {}
      return getResponse({
        data: sysDictList[typeCode] || []
      })
    }
  },
  {
    // 上传
    url: api.upload,
    type: 'post',
    response: config => {
      return getResponse({
        data: dataList
      })
    }
  },
  {
    // 文件列表
    url: api.getFileList,
    type: 'get',
    response: config => {
      return getResponse({
        data: dataList
      })
    }
  },
  {
    // 根据业务id删除文件
    url: api.deleteFileByBusinessId,
    type: 'get',
    response: config => {
      return getResponse({})
    }
  },
  {
    // 通过文件id 删除文件
    url: api.deleteFileById,
    type: 'get',
    response: config => {
      return getResponse({})
    }
  },
  {
    url: api.addressTree,
    type: 'get',
    response: config => {
      return getResponse({
        data: [
          {
            code: 'beijing',
            hasChildren: true,
            id: '1',
            level: '',
            name: '北京',
            parentId: 0,
            children: [
              {
                hasChildren: true,
                id: '11',
                parentId: '1',
                name: '北京',
                code: '11',
                children: [
                  {
                    code: '111',
                    id: '111',
                    parentId: '11',
                    name: '东城区'
                  },
                  {
                    id: '112',
                    code: '112',
                    parentId: '11',
                    name: '西城区'
                  }
                ]
              }
            ]
          },
          {
            code: 'sichuan',
            hasChildren: true,
            id: '2',
            level: '',
            name: '四川',
            parentId: 0,
            children: [
              {
                hasChildren: true,
                id: '21',
                code: '21',
                parentId: '2',
                name: '成都',
                children: [
                  {
                    id: '211',
                    code: '211',
                    parentId: '21',
                    name: '高新区'
                  },
                  {
                    id: '212',
                    code: '212',
                    parentId: '21',
                    name: '天府新区'
                  }
                ]
              },
              {
                hasChildren: true,
                id: '22',
                code: '22',
                parentId: '2',
                name: '自贡',
                children: [
                  {
                    id: '221',
                    code: '221',
                    parentId: '22',
                    name: '大安区'
                  },
                  {
                    id: '222',
                    code: '222',
                    parentId: '22',
                    name: '自流井区'
                  }
                ]
              }
            ]
          }
        ]
      })
    }
  },
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: '200',
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
