const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  // ↑↑↑↑↑  上面的没用
  token: state => state.user.token,
  userCode: state => state.user.userCode,
  clientSideType: state => state.user.clientSideType,
  userName: state => state.user.userName,
  telPhone: state => state.user.telPhone,
  userId: state => state.user.userId,

  language: state => state.app.language, // 国际化
  menuLocal: state => {
    const { app, permission } = state
    return permission.menusLanguge[app.language] || {}
  },
  // 公用的getter
  loading: state => state.app.loading,
  modalKey: state => state.app.modalKey,
  modalData: state => state.app.modalData,
  // 字典
  dicMap: state => {
    const { app, common } = state
    const { dicMapEn, dicMapZh } = common
    if (app.language === 'en') {
      return dicMapEn
    }
    return dicMapZh
  },
  dicCodes: state => state.common.dicCodes,
  // 地址树
  addressTree: state => state.common.addressTree,
  companyList: state => state.common.companyList,
  // 添加的路由
  addRouters: state => state.permission.addRouters
}

export default getters
