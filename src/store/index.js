import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import routes from './modules/routes'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app, //  控制菜单是否展示的一些处理
    settings, // 读取setting.js的顶部导航是否固定与左边菜单logo是否显示控制
    user, // 用户信息处理
    routes
  },
  getters
})

export default store
