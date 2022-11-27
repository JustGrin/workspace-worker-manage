import Mock from 'mockjs'
// import apiUrl from '../src/api/url'
import { getResponse, pageJson, api } from './tools'

// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }
// 角色列表
const roleList = [
  {
    roleAlias: '客户',
    roleCode: 'JWbj20200414192330',
    roleName: 'client'
  },
  {
    roleAlias: '客服',
    roleCode: 'Inuq20200420105147',
    roleName: 'service'
  }
]

// 角色列表
const roleListPage = [
  {
    id: '237aa6f765938342053d91050efee68f',
    code: 'Inuq20200420105147',
    createdBy: '001',
    createdDate: '2020-04-20 10:51:48',
    updateBy: '001',
    updateDate: '2020-04-20 10:51:48',
    state: 1,
    remark: '',
    roleName: 'service',
    roleAlias: '客服'
  },
  {
    id: 'ee81e53b29a797ff2c6fe54ce81e88c5',
    code: 'JWbj20200414192330',
    createdBy: '001',
    createdDate: '2020-04-14 19:23:31',
    updateBy: '001',
    updateDate: '2020-04-14 19:23:31',
    state: 1,
    remark: '',
    roleName: 'client',
    roleAlias: '客户'
  }
]

const mockData = Mock.mock({
  'userList|77': [
    {
      id: '@id',
      code: '@guid',
      createdBy: '@first',
      createdDate: '@datetime',
      updateBy: '@first',
      updateDate: '@datetime',
      'state|1': [0, 1],
      remark: '@cparagraph(1 )',
      deptCode: null,
      companyCode: null,
      companyName: null,
      telPhone: null,
      ...roleList[1],
      realName: '@cname',
      sex: null,
      status: 'on',
      userName: '@first',
      'telPhone|130000000000-190000000000': 1
    }
  ],
  'companyList|30': [
    {
      id: '@id',
      code: '@guid',
      name: '@cname',
      addr: '@county(true)',
      provinceCode: '1',
      cityCode: '11',
      countyCode: '111'
    }
  ]
})

const userInfo = {
  tenantId: '1275313710729039873',
  id: '1275313710825508866',
  userCode: '000000015',
  userName: '9527',
  alias: '9527的别名',
  language: 'zh',
  roleIds: [1]
}

// console.log(api.sendVeryCode, 'api')

// http://wop.zzcsoft6.com
export default [
  // 登录获取token
  {
    url: api.login,
    type: 'post',

    response: config => {
      // const { userName } = config.body
      // const { token } = tokens[userName]
      const token = 'admin-token'
      let res = {
        data: {
          token,
          userCode: 'admin'
        }
      }
      // mock error
      if (!token) {
        res = {
          success: false,
          msg: '用户名或密码错误.'
        }
      }

      return getResponse(res)
    }
  },
  {
    // 密钥
    url: api.getAesInfo,
    type: 'post',

    response: config =>
      getResponse({
        data: {
          ivSuffix: '12345678',
          keySuffix: '12345678'
        }
      })
  },
  {
    url: api.sendVerifyCode,
    type: 'post',

    response: config => getResponse({})
  },
  {
    url: api.logout,
    type: 'post',
    response: () => getResponse()
  },
  {
    url: api.tokenRefresh,
    type: 'post',
    response: () => getResponse({
      token: '12312321312123'
    })
  },
  // 通过code获取用户信息
  {
    url: api.getUser,
    type: 'get',
    response: config => {
      return getResponse({
        data: userInfo
      })
    }
  },
  // 通过code获取用户菜单
  {
    url: api.getCurUserMenu,
    type: 'get',
    response: config => {
      return getResponse({
        data: [
          {
            title: 'user_update',
            type: '1',
            url: '/dmp-saas-system/dmp/auth/user/updateUserInfo',
            menuLevel: '0',
            id: '12',
            parentId: '1273559036908797954'
          },
          {
            title: 'user_update_password',
            type: '1',
            url: '/dmp-saas-system/dmp/auth/user/updatePassword',
            menuLevel: '0',
            id: '14',
            parentId: '1273559036908797954'
          },
          {
            title: 'personal_center',
            type: '0',
            url: '/personalcenter',
            menuLevel: '1',
            id: '1273560401395580929',
            parentId: '1273559036908797954'
          },
          {
            title: 'work_order_client',
            type: '0',
            url: '/workOrderClient',
            menuLevel: '1',
            id: '1273561625159270402',
            parentId: '1273559036908797954'
          },
          {
            title: 'firm_mg',
            type: '0',
            url: '/firmMg',
            menuLevel: '1',
            id: '1273561682277302274',
            parentId: '1273559036908797954'
          },
          {
            title: 'user_get_currentUser',
            type: '1',
            url: '/dmp-saas-system/dmp/auth/user/getCurrentUser',
            menuLevel: '0',
            id: '11',
            parentId: '1273559179997478914'
          },
          {
            title: 'menu_current_tree',
            type: '1',
            url: '/dmp-saas-system/dmp/auth/menu/treeByCurrentUser',
            menuLevel: '0',
            id: '10',
            parentId: '1273559179997478914'
          },
          {
            title: 'user_get_by_id',
            type: '1',
            url: '/dmp-saas-system/dmp/auth/user/getById',
            menuLevel: '0',
            id: '16',
            parentId: '1273559036908797954'
          }
        ]
      })
    }
  },
  // get user info
  {
    url: api.userGet,
    type: 'get',
    response: config => {
      return getResponse({
        data: userInfo
      })
    }
  },
  // 用户列表
  {
    url: '/test/table/page',
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return pageJson(mockData.userList, config.query)
    }
  },
  // 角色列表
  {
    url: api.rolePage,
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return pageJson(roleListPage, config.query)
    }
  },
  // 公司列表
  {
    url: api.companyPage,
    type: 'get',
    response: config => {
      // const { current, size, userName } = config.query
      return pageJson(mockData.companyList, config.query)
    }
  }
]
