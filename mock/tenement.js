// import Mock from 'mockjs'
import {pageJson, api, getResponse } from './tools'

const tenementList = [
  {
    id: '001',
    tenantCode: '000000001',
    tenantName: '企业1',
    companyNames: '厂商1',
    userNumbers: '10',
    tenantStatus: '0',
    createDate: '2020-04-20 10:51:48',
    telPhone: '17760039131',
    tenantId: '',
    updatedBy: '',
    updatedDate: '',
    userCode: '',
    userName: '安格'
  },
  {
    id: '002',
    tenantCode: '000000002',
    tenantName: '企业2',
    companyNames: '厂商2',
    userNumbers: '10',
    tenantStatus: '1',
    createDate: '2020-04-20 20:51:48',
    telPhone: '177222222222',
    tenantId: '',
    updatedBy: '',
    updatedDate: '',
    userCode: '',
    userName: '安格2'
  },
  {
    id: '003',
    tenantCode: '000000003',
    tenantName: '企业3',
    companyNames: '厂商3',
    userNumbers: '10',
    tenantStatus: '0',
    createDate: '2020-04-20 10:51:48'
  },
  {
    id: '004',
    tenantCode: '000000004',
    tenantName: '企业4',
    companyNames: '厂商4',
    userNumbers: '10',
    tenantStatus: '1',
    createDate: '2020-04-20 20:51:48'
  },
  {
    id: '005',
    tenantCode: '000000005',
    tenantName: '企业5',
    companyNames: '厂商5',
    userNumbers: '10',
    tenantStatus: '0',
    createDate: '2020-04-20 10:51:48'
  },
  {
    id: '006',
    tenantCode: '000000006',
    tenantName: '企业6',
    companyNames: '厂商6',
    userNumbers: '10',
    tenantStatus: '1',
    createDate: '2020-04-20 20:51:48'
  }
]

// 查询详情
const getDetails = [
  {
    retCode: '',
    data: {
      // 用户
      dmpAuthUsers: [
        {
          alias: '',
          concurrentVersion: 0,
          createdBy: '',
          createDate: '',
          dataVersion: 0,
          departmentName: '',
          id: 0,
          isAdmin: 0,
          password: '',
          positionName: '',
          remark: '',
          state: 0,
          tenantStatus: 0,
          telPhone: '17760039131',
          tenantId: '',
          updatedBy: '',
          updatedDate: '',
          userCode: '',
          userName: '安格'
        }
      ],
      // 企业信息
      dmpTenant: {
        addr: '详细地址sssssssss',
        cityCode: '浩特市', // 市编码
        concurrentVersion: 0,
        createdBy: '',
        createDate: '',
        dataVersion: 0,
        countyCode: '',
        id: 0,
        tenantName: '',
        provinceCode: '',
        remark: '',
        tenantStatus: 0,
        companyNames: '',
        tenantCode: '',
        townCode: '',
        updatedBy: '',
        updatedDate: '',
        userNumbers: ''
      }
    },
    retMsg: ''
  }]

const tenementNumber = {
  totalNumbers: 4,
  monthAddNumbers: 4,
  enableNumbers: 1
}

export default [
// 企业分页查询
  {
    url: api.tenementPage,
    type: 'get',
    response: config => {
      return pageJson(tenementList, config.query)
    }
  },
  // 详情
  {
    url: api.tenementById,
    type: 'get',
    response: config => {
      return pageJson(getDetails, config.query)
    }
  },
  // 企业总数
  {
    url: api.numberStatistics,
    type: 'get',
    response: config => {
      return getResponse({data: tenementNumber})
    }
  },
]
