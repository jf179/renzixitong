import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: '', // /approvals
      component: () => import('@/views/approvals/index'),
      meta: {
        title: '审批',
        icon: 'peoples'
      }
    }
  ]
}
