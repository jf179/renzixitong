import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  name: 'salarys',
  children: [
    {
      path: '', // /salarys
      component: () => import('@/views/salarys/index'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
