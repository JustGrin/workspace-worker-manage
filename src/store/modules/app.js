import Cookies from 'js-cookie'
import { getLanguage } from '@/lang'

const defaultModalState = {
  modalKey: null,
  modalData: {},
  language: getLanguage(),
}

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  loading: false,
  ...defaultModalState
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // 设置语言
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  // loading
  SETLOADING: (state, beal) => {
    state.loading = beal
  },
  // modal
  Hide_MODAL: state => {
    Object.assign(state, defaultModalState)
  },
  SHOW_MODAL: (state, payload) => {
    Object.assign(state, payload)
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 国际化
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
