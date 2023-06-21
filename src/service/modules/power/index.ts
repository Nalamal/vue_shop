import service from '@/service'

// 定义获取权限列表的请求 (参数为 list)
export const selectListRights = () => {
  return service.get({
    url: 'rights/list'
  })
}

// 定义获取角色列表的请求
export const selectRoles = () => {
  return service.get({
    url: 'roles'
  })
}

// 定义添加角色的请求
export const insertRole = (data: object) => {
  return service.post({
    url: 'roles',

    data
  })
}

// 定义根据 id 查询角色的请求
export const selectRoleById = (id: number) => {
  return service.get({
    url: 'roles/' + id
  })
}

// 定义编辑角色的请求
export const updateRole = (roleEditForm: any) => {
  return service.put({
    url: 'roles/' + roleEditForm.roleId,
    method: 'put',
    data: {
      roleName: roleEditForm.roleName,
      roleDesc: roleEditForm.roleDesc
    }
  })
}

// 定义删除指定角色的请求
export const deleteRole = (id: number) => {
  return service.delete({
    url: 'roles/' + id
  })
}

// 定义获取权限列表的请求 (参数为 tree)
export const selectTreeRights = () => {
  return service.get({
    url: 'rights/tree'
  })
}

// 定义删除角色指定权限的请求
export const deleteRoleRight = (rolelist: any, id: number) => {
  return service.delete({
    url: `roles/${rolelist.id}/rights/${id}`
  })
}

// 定义角色授权的权限
export const updateRoleRights = (roleId: number, rids: string) => {
  return service.post({
    url: `roles/${roleId}/rights`,
    data: {
      rids: rids
    }
  })
}

// 定义分配用户角色的请求
export const updateUserRole = (id: number, rid: string) => {
  return service.put({
    url: `users/${id}/role`,
    data: {
      rid: rid
    }
  })
}
