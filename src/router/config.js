// 是否是开发环境
import defaultSettings from '@/settings'
const { isDev } = defaultSettings

/** 路由配置
 * @param {key}                   影响path/文件路径/name
 * @param {name}                  路由名称, 默认等于[key]
 * @param {hidden}                隐藏菜单
 * @param {hiddenChildren}        隐藏子菜单, 显示本路径文件
 * @param {disabled}              路由不可用
 * @param {isMenu}                是否为菜单
 * @param {isDev}                 是否为开发环境(该值如果填写就固定为[true], 代表一些在开发环境才显示的的菜单)
 * @param {always}                菜单一直显示
 * @param {layout}                是否被包含在基础布局内
 * @param {redirect}              重定义
 * @param {children}              嵌套子菜单
 * @param {meta} : {
      // roles: ['admin','editor'],     路由所属角色
      title: 'title',                   名称显示在侧栏和面包屑(推荐设置)
      icon: 'svg-name',                 菜单图标
      breadcrumb: false,                如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
      activeMenu: '/example/list',      如果设置路径，侧栏将高亮显示您设置的路径
  }
 */

const exampleMenus = [{
  key: 'example',
  meta: { title: '组件示例', icon: 'menu_Appmanager' },
  isDev,
  children: [
    {
      key: 'rtable',
      meta: { title: '分页表示例' }
    },
    {
      key: 'iconList',
      meta: { title: '图标列表' }
    },
    {
      key: 'custom',
      meta: { title: '自定义组件' }
    },
    {
      key: 'plugs',
      meta: { title: '三方插件' }
    }
  ]
}]

export const menuList = [
  {
    key: 'taskStatus',
    meta: { icon: 'operation', title: '任务状态' },
  },
  {
    key: 'configuration',
    meta: { icon: 'menu_system', title: '参数配置' },
  },
  {
    key: 'report',
    meta: { icon: 'details_excel', title: '报表导出' },
  },
  ...exampleMenus
]

// 路由配置
export const baseRouters = [
  {
    key: '/',
    name: 'appMain',
    layout: 1,
    redirect: '/taskStatus',
    children: menuList,
  },

  {
    key: '/404',
    name: '404'
  },

]
 
// console.log(process.env.NODE_ENV, 'console.log(process.env.NODE_ENV)')
