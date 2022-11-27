import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
 
import getPageTitle from '@/utils/get-page-title' 

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

const initialRouters = router.options.routes

router.beforeEach(async(to, from, next) => {
  // start 进度条
  NProgress.start()

  // 设置页面title
  document.title = getPageTitle(to.meta.title)

  // if (to.path === '/tenant') {
  //   next('/404')
  //   return
  // }

  // 获取用户信息
  const addRoutesList = store.getters.addRouters 
  router.options.routes = [...initialRouters, ...addRoutesList]
  router.addRoutes(addRoutesList) // 动态添加可访问路由表
  // hack方法 确保addRoutes已完成 ,设置replace: true，这样导航就不会留下历史记录
  next()
})

router.afterEach(() => {
  // finish 进度条
  NProgress.done()
})
