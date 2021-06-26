import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [
    {
      path: '', // /employees
      component: () => import('@/views/employees/index'),
      meta: {
        title: 'users',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?', // /employees/detail
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工详情',
        icon: 'people'
      }
    },
    {
      path: 'print/:id?', // /employees/print
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '员工打印',
        icon: 'people'
      }
    }
  ]
  //
}
