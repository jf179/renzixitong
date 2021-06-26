const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  isLogin: state => (state.user.userInfo ? true : false),
  roles: state => (state.user.userInfo ? state.user.userInfo.roles : {})
  // avatar: state => state.user.avatar,
  // name: state => state.user.name // undefined
}
export default getters
