/*
vuex管理所有的路由配制
路由配制:静态路由配制+动态路由配制
1:让vuex内能够拿到它所在能访问的路由配制
2:去掉以前默认的需要权限的路由配制,通过router.addRoutes(需要权限的路由配制)
3:什么时候添加
    登陆完成后===>获取用户信息(调用filterRoutes)
    router.addRoutes有bug
      它添加完成的路由不能立马使用,需要经历一次beforeEach后才可以使用
      next执行二次  next(to.fullPath)   next()
*/
import { constantRoutes, asyncRoutes } from '@/router'
import router from '@/router'
const state = {
  // 所有能访问的页面路由配制
  routes: [...constantRoutes]
}
const mutations = {
  setRoutes (state, value) {
    state.routes = value
  }
}
const actions = {
  filterRoutes (store) {
    // 过滤出当前用户能访问的路由(筛选动态路由)
    // store.rootGetters.roles.menus:[name]
    // asyncRoutes:[{name}]
    let _newArr = asyncRoutes.filter(item => {
      return store.rootGetters.roles.menus.includes(item.name)
    })
    router.addRoutes([
      ..._newArr,
      { path: '*', redirect: '/404', hidden: true }
    ])
    window.console.log(_newArr)
    store.commit('setRoutes', [...constantRoutes, ..._newArr])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
