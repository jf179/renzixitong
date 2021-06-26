import request from '@/utils/request'
// 角色列表
export function sysRole (params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}
// 新增 角色
export function sysRoleAdd (data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 删除角色
export function sysRoleDel (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 编辑角色
export function sysRolePut (data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 查询 企业信息
export function companyGet (id) {
  return request({
    url: `/company/${id}`
  })
}
// 根据角色获取详情
export function sysRoleGet (id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 给角色分配权限
export function sysRoleAssignPremPut (data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
