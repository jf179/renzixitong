import Cookies from 'js-cookie'
/*
app.js:控制菜单展开与收起

本地浏览器存储:
   cookie   localStorage   sessionStorage(窗口级别的,只要窗口关闭它就没有了)
   js-cookie    
   1:安装  npm i js-cookie
   2:导入使用
      import cookiejs from 'js-cookie' 
      获取cookie  cookie.get('key')
      设置cookie   cookie.set(key,value)
      删除cookie   cookie.remove(key)
*/

const state = {
  // routes:[所有能访问的路由配制],
  // opend:控制菜单是否收起和展开
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
