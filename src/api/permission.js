import request from '@/utils/request'
// 获取权限列表
export function sysPermission () {
  return request({
    url: '/sys/permission'
  })
}
// 删除权限点
export function sysPermissionDel (id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

// 新增权限点
export function sysPermissionAdd (data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 编辑权限点
export function sysPermissionPut (data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
