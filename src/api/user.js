import request from '@/utils/request'
// import store from '@/store'

// 登陆
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
    needCatch: true
  })
}
// 获取用户信息
export function sysProfile () {
  return request({
    url: '/sys/profile',
    method: 'post'
    // needToken: true
    // headers: {
    //   Authorization: `Bearer ` + store.getters.token
    // }
  })
}
// 获取员工个人基本信息
export function sysUser (id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 修改用户信息
export function sysUserPut (data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

export function getInfo (token) {}

export function logout () {}
