import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 首屏打开慢(路由懒加载,gzip压缩,cdn,异步组件,减少接口请求(vuex),图片精灵图,静态图片需要自己压缩一下....) +不利于seo(nuxt.js)/汽车官网(seo)
// 静态路由：不需要权限都可以访问的路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/uploadExcel',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'uploadExcel',
        component: () => import('@/views/uploadExcel/index'),
        meta: { title: 'uploadExcel', icon: 'dashboard' }
      }
    ]
  }
  // 不显示子菜单：children只有一个项，children其它项的hidden:true,只有一个项为false

  // 标题：meta:{title}   icon meta:{icon}
  // 没有子菜单：只有一个children/其它的children有一个hidden:true
  // 不同的角色显示不同的菜单

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// 动态路由
import departments from './departments'
import employees from './employees'
import setting from './setting'
import salarys from './salarys'
import social from './social'
import attendances from './attendances'
import approvals from './approvals'
import permission from './permission'
import app from '@/store/modules/app'
export const asyncRoutes = [
  departments,
  employees,
  setting,
  salarys,
  social,
  attendances,
  approvals,
  permission
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // routes: [...constantRoutes, ...asyncRoutes]
    routes: [...constantRoutes]
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
