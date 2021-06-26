import Vue from 'vue' // 导入vue

import 'normalize.css/normalize.css' // 抺平浏览器差异

import ElementUI from 'element-ui' // element-ui
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // 全局样式

import App from './App'
import store from './store' // vuex
import router from './router' // 路由

import i18n from '@/lang'

import '@/icons' // icon图标  能够全局使用svg-icon组件 用法:svg-icon   iconClass="svg文件名"
import '@/permission' // 导航守卫
import PrintNb from 'vue-print-nb'
Vue.use(PrintNb)
import componentsJs from '@/components'
Vue.use(componentsJs)

// 全局过滤器
// import employeesData from '@/utils/constant/employees'
// Vue.filter('formatFormOf', str => {
//   let _obj = employeesData.hireType.find(item => {
//     return item.id === str
//   })
//   return _obj.value
// })
import filtersObj from '@/filters'
// [formatFormOf,xxx]
Object.keys(filtersObj).forEach(item => {
  Vue.filter(item, filtersObj[item])
})

// import tools from '@/components/tools'
// Vue.component(tools.name, tools)
Vue.prototype.$bus = new Vue()
// 全局注册自定义指令
// Vue.directive('imgerror', {
//   inserted (dom, obj) {
//     dom.src = dom.src || obj.value
//     dom.onerror = () => {
//       dom.src = obj.value
//     }
//   }
// })
// import directiveObj from '@/directive'
// import { default as directiveObj } from '@/directive'
// import { imgerror, xxx } from '@/directive'
import * as directiveObj from '@/directive'
// window.console.log('directiveObj', directiveObj)
// [xxx,ooo,imgerror]
Object.keys(directiveObj).forEach(item => {
  Vue.directive(item, directiveObj[item])
})

//  process.env.NODE_ENV:判断当前环境是开发环境(development)还是生产环境(production)
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// vue相应提示语
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
