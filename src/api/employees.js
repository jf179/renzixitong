import request from '@/utils/request'
// 获取员工列表
export function sysUser (params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工
export function sysUserDel (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增
export function sysUserAdd (data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 批量新增
export function sysUserBatch (data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

// 获取 个人详情
export function employeesPersonalInfo (id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal (data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail (id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob (data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
// 根据id更新角色
export function sysUserAssignRoles (data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  })
}
