import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // 引入进度条样式
// nprogress
/*
1:安装  npm i nprogress
2:导入  import Nprogress from 'nprogress'
       import 'nprogress/nprogress.css' // 引入进度条样式
3:  Nprogress.start()  开始
    Nprogress.done()  结束

*/

// 需求：如果登陆了，就允许 进入非登陆页，如果没有登陆，不允许 进入首页
let whitePage = ['/login', '/404']
// 前置守卫
router.beforeEach(async (to, from, next) => {
  window.cancelAll()
  window.console.log('to', to)
  //   next()
  /*
  有没有用户信息:登陆了
   判断是否有token
       没有token
           判断是login/404(是否需要登陆的页面)
              不需要登陆的页面  next()
              需要登陆的页面    next("/login")
       有token
           判断是否是登陆页
               是：跳转到首页next('/')
               不是：获取用户信息(没有用户信息才获取)====>next()
*/
  //   next()
  //   window.console.log('hello')
  Nprogress.start()
  if (!store.getters.token) {
    if (whitePage.includes(to.path.toLowerCase())) {
      next()
    } else {
      next('/login?redirect=' + to.fullPath)
      // next('/login')
    }
  } else {
    if (to.path.toLowerCase() === '/login') {
      next('/')
    } else {
      //  判断是否有用户信息,没有:获取用户信息后  next(),有  next()
      if (!store.getters.isLogin) {
        await store.dispatch('user/getUserInfo')
        store.dispatch('routes/filterRoutes')
        next(to.fullPath)
      } else {
        next()
      }
    }
  }
  //   Nprogress.done()
})
// 后置守卫
router.afterEach(() => {
  Nprogress.done()
})
