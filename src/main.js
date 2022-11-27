import Vue from 'vue'
import moment from 'moment'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import i18n from './lang' // internationalization
// import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/element-9580F9/index.css' // 紫色主题
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
// import '@/permission' // permission control

// 启用mock
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

/* ---------- 过滤器 --------start---------*/
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
/* ----------过滤器 --------start---------*/

/* ----------修改 组件默认属性 --------start---------*/

// Dialog 的 closeOnClickModal
Object.assign(ElementUI.Dialog.props.closeOnClickModal, {
  default: false
})

Object.assign(ElementUI.Dialog.props.appendToBody, {
  default: true
})

// Card 的 shadow 默认值
Object.assign(ElementUI.Card.props.shadow, {
  default: 'never'
})
/* ----------修改 组件默认属性 --------end---------*/

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
