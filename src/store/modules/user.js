import { login, sysProfile, sysUser } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth.js'
// import Cookies from 'js-cookie'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  userInfo: '' // 用户信息
}
const mutations = {
  setToken (state, value) {
    state.token = value
    // 存储token到浏览器
    setToken(value)
    // Cookies.set('time', Date.now())
  },
  setUserInfo (state, value) {
    state.userInfo = value
  },
  // 退出登录的处理
  logout (state) {
    // 删除token
    state.token = ''
    removeToken()
    // 删除userInfo
    state.userInfo = ''
    // 重置路由的routes
    resetRouter()
  }
}
const actions = {
  // 调用登陆接口获取token
  // store={commit}
  async getUserToken ({ commit }, value) {
    try {
      const res = await login(value) // 中断
      commit('setToken', res)
      // window.console.log(res)
      // return 123
      // login(value)
      //   .then(res => {
      //     commit('setToken', res)
      //   })
      //   .catch(() => {
      //     // alert('出错了')
      //   })
    } catch {
      // window.console.log(error)
    }
  },
  // 获取用户信息
  async getUserInfo (store) {
    // 调用接口获取用户信息
    const res = await sysProfile()
    const res2 = await sysUser(res.userId)
    // {...res,...res2}
    // Object.assign(res,res2)
    store.commit('setUserInfo', { ...res, ...res2 })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
