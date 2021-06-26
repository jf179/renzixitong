import request from '@/utils/request'
// 获取组织架构
export function companyDepartment () {
  return request({
    url: '/company/department'
  })
}
// 树形组织架构 数据删除
export function companyDepartmentDel (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 获取员工列表
export function sysUserSimple () {
  return request({
    url: '/sys/user/simple'
  })
}
// 新增部门
export function companyDepartmentAdd (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 编辑部门
export function companyDepartmentPut (data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
