// 管理员列表
const admins = ['administrator', 'admin']
// 客服
const services = ['service']
// 客户
const clients = ['client']

// 页面的全局滚动target
const scrollTarget = '#app>.app-wrapper'

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  title: '管理平台',

  /**
   * @type {boolean} true | false
   * @description 是否固定页眉
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 否显示logo
   */
  sidebarLogo: true,

  // 页眉logo
  sideLogo: '/logo/nav-logo.svg',
  textLogo: '/logo/nav-logo-text.svg',
  rolesMap: {
    admins,
    services,
    clients
  },
  scrollTarget,

  // 开发环境
  isDev,
  copyRight: `Copyright © 2020 `
}
