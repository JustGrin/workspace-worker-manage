// store/permission.js
import { asyncRouterMap, constantRouterMap } from '@/router'
import { getCurUserMenu } from '@/api/user'
import i18n from '@/lang'

// 菜单树 -> 哈希对象 (处理后端返回的菜单)
const menuTree2Map = tree => {
  const menuMap = {}
  let firstPath
  const tree2Map = _tree => {
    for (const item of _tree) {
      const { children, url, type, title } = item
      if (type !== '0') {
        // type === '0' 是菜单, 不是菜单的就跳过
        continue
      }
      if (!firstPath) {
        // 第一个页面
        firstPath = url
      }
      // 获取 通过后端的菜单获取key
      const urlArr = url.split('/')
      const mapKey = urlArr[urlArr.length - 1]
      menuMap[mapKey.toLowerCase()] = title
      // 嵌套
      children && children.length && tree2Map(children)
    }
  }
  tree2Map(tree)

  return {
    menuMap,
    firstPath
  }
}

// 获取路由
const getRouter = (routerMap, menuMap, paremtAlways, parentDev) => {
  const routers = []
  for (const item of routerMap) {
    const {
      children,
      path,
      always = paremtAlways,
      isDev = parentDev,
      meta
    } = item
    const { title } = meta || {}
    const menuTitle = menuMap[path.toLowerCase()]
    if (path && !menuTitle && !always && !isDev) {
      // 在菜单中没有 且 不是always 且 不是在开发环境的开发菜单(继承父级)
      continue
    }

    routers.push(
      Object.assign({}, item, {
        meta: Object.assign({}, meta, { title: menuTitle || title }),
        children:
          children && children.length
            ? getRouter(children, menuMap, always, isDev)
            : undefined
      })
    )
  }
  return routers
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menusLanguge: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menuMap) {
      // const {
      //   menuMap
      //   // , firstPath
      // } = menuTree2Map(menus)
      return new Promise(resolve => {
        // const accessedRouters = []
        const [firstRouter, ...otherRouterMap] = asyncRouterMap
        const { children } = firstRouter || {}
        const newAsyncRouterMap = [].concat(
          Object.assign({}, firstRouter, {
            // redirect: firstPath,
            children: getRouter(children || [], menuMap)
          }),
          otherRouterMap
        )
        commit('SET_ROUTERS', newAsyncRouterMap)

        resolve()
      })
    },
    // 获取用户菜单
    async getMenuTree({ state, rootGetters }) {
      const { token, language } = rootGetters
      const { menusLanguge } = state
      if (!token) {
        return
      }
      const { data } = await getCurUserMenu()
      if (!data) {
        // 没有 菜单时报错
        return Promise.reject(i18n.t('global.noMenuMsg'))
      }
      const {
        menuMap
        // , firstPath
      } = menuTree2Map(data)

      if (!menusLanguge[language]) {
        // 菜单国际化
        state.menusLanguge = Object.assign(
          {
            [language]: menuMap
          },
          menusLanguge
        )
      }

      return Promise.resolve(menuMap)
    }
  }
}

export default permission
