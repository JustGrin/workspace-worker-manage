import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import RouterLayout from '@/layout/RouterLayout'
import { baseRouters, menuList } from './config'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 获取路径上的文件
const pathCompanent = paths => resolve =>
  require(['@/views' + paths.join('/').replace('//', '/')], resolve)

const routerMap = (routers, paths = []) => {
  return routers
    .map(routerItem => {
      if (routerItem.disabled) {
        return null
      }
      const {
        key,
        children,
        hiddenChildren,
        name = key,
        component,
        layout,
        path,
        meta = {},
        ...other
      } = routerItem

      // 拼接路径
      const newPaths = paths.concat(key)

      // 引入 文件
      let _component
      if (component) {
        // 主动设置 文件
        _component = component
      } else if (layout) {
        // 设置 布局
        _component = Layout
      } else if (children) {
        // 设置 子菜单 && 不隐藏子菜单
        _component = RouterLayout
      } else {
        // 默认 获取路径上的文件
        _component = pathCompanent(newPaths)
      }

      // 重构 children
      let childrenArr = children
      let routerName = name || ''
      if (children) {
        const otherChild = []
        if (hiddenChildren) {
          routerName = ''
          otherChild.push({
            name,
            path: '',
            component: pathCompanent(newPaths)
          })
        }

        childrenArr = otherChild.concat(routerMap(children, newPaths))
      }

      return Object.assign(
        {
          path: path || key,
          children: childrenArr,
          component: _component,
          hiddenChildren,
          name: routerName,
          meta: Object.assign(
            {
              titleKey: (path || key).toLowerCase(),
              menuUrl: newPaths.join('/').replace('//', '/')
            },
            meta
          )
        },
        other
      )
    })
    .filter(e => e)
}
// 路由信息
export const constantRouterMap = routerMap(baseRouters)

// 菜单列表
export const menus = routerMap(menuList)

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
 
// 一些不需要登录的页面
export const whiteList = baseRouters.map(e => e.key)
