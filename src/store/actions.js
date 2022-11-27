export default {
  hideModal({ commit }) {
    commit('app/Hide_MODAL')
  },
  showModal({ commit }, payload = {}) {
    commit('app/SHOW_MODAL', payload)
  },
  setLoading({ commit }, payload) {
    commit('app/SETLOADING', payload)
  },
  // 发送验证码
  sendCode({ dispatch }, payload) {
    return dispatch('common/sendCode', payload)
  },
  // 地址树
  getAddressTree({ dispatch }) {
    return dispatch('common/getAddressTree')
  },
  // 获取公司列表
  getCompanyList({ dispatch }) {
    return dispatch('common/getCompanyList')
  },
  // 获取公用列表
  getCommonList({ dispatch }, payload) {
    return dispatch('common/getCommonList', payload)
  }
}
