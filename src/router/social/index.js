import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  name: 'social_securitys',
  children: [
    {
      path: '', // /social
      component: () => import('@/views/social/index'),
      meta: {
        title: '社保',
        icon: 'component'
      }
    }
  ]
}
