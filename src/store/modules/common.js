import {
  sendVerifyCode,
  validateVerifyCode,
  getCompanyList,
  getGroupList,
  getRoleList,
  // addCompany,
  // addGroup,
  // addRole,
  getI18nDict,
  getAddressTree,
  getCommonList
} from '@/api/common'
import Crypto from '@/utils/crypto'

// 地址树格式化
const formatAddressTree = tree => {
  return tree.map(({ name, code, children }) => {
    let newChildren
    if (children && children.length) {
      newChildren = formatAddressTree(children)
    }
    return {
      label: name,
      value: code,
      children: newChildren
    }
  })
}

const getDefaultState = () => {
  return {
    dicMapEn: {}, // 字典 - en
    dicMapZh: {}, // 字典 - zh
    dicCodes: {
      workOrderType: 'workOrderType', //  工单类型
      workOrderStatus: 'workOrderStatus', // 工单状态
      workOrderModule: 'workOrderModule', // 所属模块
      workOrderAttributive: 'workOrderAttributive', // 问题归属
      workOrderDeal: 'workOrderDeal' // 处理情况
    },
    addressTree: [], // 地址树
    companyList: [], // 公司列表
    dataSourceList: [],
    groupList: [],
    roleList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_LISTS: (state, { res, dataName }) => {
    const { data } = res || {}
    const { records } = data || {}
    state[dataName] = records || []
  },
  SET_COMMONLIST: (state, { key, list }) => {
    state[key] = list || []
  }
}

const actions = {
  // 发送短信
  async sendCode({ commit }, payload) {
    // "telPhone": "手机号",
    // "purpose": "注册1，其他操作2 暂时没有注册 先固定传2"
    const { success } = await sendVerifyCode(payload)
    console.log(success, '发送短信')
    return success
  },
  // 短信验证
  async validateVerifyCode({ commit }, payload) {
    const { code, telPhone } = payload
    const cryCode = await Crypto(code)
    const { data } = await validateVerifyCode(
      Object.assign({}, payload, {
        code: cryCode,
        phone: telPhone
      })
    )
    // console.log(data, '验证短信')
    return data
  },
  // 获取树地址
  async getAddressTree({ state }) {
    if (state.addressTree && state.addressTree.length) {
      return
    }
    const { data } = await getAddressTree()
    state.addressTree = formatAddressTree(data || [])
  },
  // 字典查询
  async getI18nDict({ state, rootState }, typeCode) {
    const { dicMapEn, dicMapZh } = state

    const { language } = rootState.app
    const dicMap = language === 'en' ? dicMapEn : dicMapZh
    const dicItemList = dicMap[typeCode] || {}
    if (!(dicItemList && dicItemList.length)) {
      const { data } = await getI18nDict(typeCode)

      if (language === 'en') {
        state.dicMapEn = Object.assign(
          {
            [typeCode]: data || []
          },
          state.dicMapEn
        )
      } else {
        state.dicMapZh = Object.assign(
          {
            [typeCode]: data || []
          },
          state.dicMapZh
        )
      }
    }

    return Promise.resolve()
  },
  // 角色
  async getRoleList({ commit }) {
    const res = await getRoleList()
    commit('SET_LISTS', { res, dataName: 'roleList' })
  },
  // 公司
  async getCompanyList({ commit }) {
    const res = await getCompanyList()
    commit('SET_LISTS', { res, dataName: 'companyList' })
  },
  // 集团
  async getGroupList({ commit }) {
    const res = await getGroupList()
    commit('SET_LISTS', { res, dataName: 'groupList' })
  },
  // 数据源列表
  async getCommonList({ state, commit }, { key, urlName, data }) {
    if (state[key] && state[key].length) {
      return
    }
    const res = await getCommonList(urlName || key, data)
    const { data: list } = res || {}
    commit('SET_COMMONLIST', { key, list })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
