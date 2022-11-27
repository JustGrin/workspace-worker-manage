import Mock from 'mockjs'
// import apiUrl from '../src/api/url'
import { getResponse, pageJson, api } from './tools'

const mockData = Mock.mock({
  'workOrderList|77': [
    {
      id: '@id',
      code: '@guid',
 
      createdBy: '@first',
      createdDate: '@datetime',
      updateBy: '@first',
      updateDate: '@datetime',

      remark: '@cparagraph(1 )',

      moduleDict: '1',
      typeDict: '4',
      title: '@cword(4,8)',
      description: '@cparagraph(10， 20 )',
      level: null,
      statusDict: 'W',
      startUserCode: null,
      startTime: null,
      doneTime: null,
      doneUserCode: null,
      evaluation: null,
      resultContent: null,
      doneRealName: null,
      createdRealName: '管理员',
      createdUserName: 'admin',
      startRealName: null,
      typeDictValue: '其他',
      moduleDictValue: '发票管理',
      statusValue: '待接单',
      attachments: [],
      images: [
        {
          id: '904c42bad191c656b8c90ad6d8863ab3',
          code: 'AOW220200424103648',
          createdBy: 'U4oNX20200422114456',
          createdDate: '2020-04-24 10:36:48',
          updateBy: 'U4oNX20200422114456',
          updateDate: '2020-04-24 10:36:48',
          state: 1,
          remark: null,
          workOrderCode: 'WOPC9UO20200424103648',
          attachmentType: 1,
          attachmentUrl:
            'http://http://192.168.1.5/wop/file/download/fileBgcI20200424103646.jpg',
          fileName: '1.jpg'
        }
      ],
      records: null
    }
  ]
})

// http://wop.zzcsoft6.com
export default [
  // 工单状态
  {
    url: api.woStat,
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return getResponse({
        data: {
          complete: 10,
          doing: 21,
          wait: 2
        }
      })
    }
  },
  // 工单page
  {
    url: api.woGetPage,
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return pageJson(mockData.workOrderList, config.query)
    }
  },
  // 工单list
  {
    url: api.clientWoPage,
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return pageJson(mockData.workOrderList, config.query)
    }
  },
  {
    url: api.woDel,
    type: 'post',
    response: config => getResponse()
  }
]
