/*
1:导入axios  import axios from 'axios'
2:创建axios副本 
  const server=axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
  })
3:请求拦截
  server.interceptors.request.use()
4:响应拦截
 server.interceptors.response.use()
5:暴露出去 
  export default server

*/
/*
后端与前端说好了，token超时时间是5秒钟
登录时就拿到token,记录当前时间，过5秒钟就让你超时处理
请求拦截处理：时间比较，如果超过5秒钟就认为超时了，就直接超时处理

*/

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui' // Message===this.$message
// import Cookies from 'js-cookie'
let _cancelArr = []
window.cancelAll = function () {
  _cancelArr = _cancelArr.filter(item => {
    // 会将整个数组遍历
    item.fn()
    return false
  })
}
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 3:请求拦截
/*
需求：同一接口请求第二次请求时取消前面的请求
*/

server.interceptors.request.use(
  function (config) {
    // window.console.log('router', router)
    /*
   1: 后端不需要token就不允许添加
   2: 随便加(大部分后端)
    */
    // if (config.needToken) {
    //   config.headers.Authorization = `Bearer ` + store.getters.token
    // }
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ` + store.getters.token
    }
    _cancelArr = _cancelArr.filter(item => {
      // 会将整个数组遍历
      // 1:  url:del  fn:a1   2:url:add  fn:a2    (删除)3:del   fn:a3
      if (item.url === config.url && item.method === config.method) {
        item.fn()
        return false
      }
      return true
    })

    // [1,2,3,4,5]
    // 使用源数组同时删除里面的项统一用filter
    // _cancelArr.forEach((item, index) => {
    //   if (item.url === config.url && item.method === config.method) {
    //     item.fn()
    //     _cancelArr.splice(index, 1)
    //   }
    // })
    // window.console.log('_cancelArr', _cancelArr)

    //  1：拿到取消方法  2:请求前取消3:请求完取消后，要从数组中删除该项
    //  url相同，请求方法相同
    config.cancelToken = new axios.CancelToken(cancelFn => {
      _cancelArr.push({
        url: config.url,
        method: config.method,
        fn: cancelFn
      })
    })

    // 判断当前时间与记录时间比较，如果超过5秒就认为token过期
    // if (Date.now() - Cookies.get('time') > 5000) {
    //   Cookies.remove('time')
    //   store.commit('user/logout')
    //   // 当前路由的fullPath   window.location.href.split('#')[1]
    //   let _redirect = window.location.href.split('#')[1]
    //   if (_redirect.includes('/login')) {
    //     router.push('/login')
    //   } else {
    //     router.push('/login?redirect=' + window.location.href.split('#')[1])
    //   }
    //   Message.error(error.response.data.message)
    // }

    return config
  },
  function (error) {
    // 不让.then执行跳转到.catch执行
    return Promise.reject(error)
  }
)
// 4:响应拦截
server.interceptors.response.use(
  function (res) {
    // 接口请求成功
    if (res.data.success) {
      return res.data.data
    } else {
      // 调用接口失败
      // 1:提示  2：中止.then执行，执行.catch
      Message.error(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (error) {
    // window.console.log('响应拦截:', [error])
    // token超时:code:10002
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 10002
    ) {
      // token超时:1:删除token2:删除userInfo 3:跳转到登录页  4:中止.then执行,执行.catch
      store.commit('user/logout')
      // 当前路由的fullPath   window.location.href.split('#')[1]
      let _redirect = window.location.href.split('#')[1]
      if (_redirect.includes('/login')) {
        router.push('/login')
      } else {
        router.push('/login?redirect=' + window.location.href.split('#')[1])
      }
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

function _ajax (data) {
  return new Promise((resolve, reject) => {
    server(data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // window.console.log(err)
        // 某个接口想执行.catch
        if (data.needCatch) {
          reject(err)
        }
      })
  })
}

export default _ajax
