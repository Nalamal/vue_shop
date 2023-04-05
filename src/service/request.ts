// 导入 service 模块
import service from './index'
// 导入
import type { IUserlist } from '@/components/user/Users.vue'
import type { IRolelist } from '@/components/power/Roles.vue'

// 定义登录请求
export const login = (data: Object) => {
  return service({
    url: 'login',
    method: 'post',
    data
  })
}

// 定义获取左侧菜单请求
export const selectMenus = () => {
  return service({
    url: 'menus',
    method: 'get'
  })
}

// 定义获取用户数据列表请求
export const selectUsers = (params: object) => {
  return service({
    url: 'users',
    method: 'get',
    params
  })
}

// 定义修改用户状态请求
export const updateUserState = (data: IUserlist) => {
  return service({
    url: `users/${data.id}/state/${data.mg_state}`,
    method: 'put',
    data
  })
}

// 定义添加用户的请求
export const insertUser = (data: object) => {
  return service({
    url: 'users',
    method: 'post',
    data
  })
}

// 定义根据 id 查询角色的请求
export const selectUserById = (id: number) => {
  return service({
    url: 'users/' + id,
    method: 'get'
  })
}

// 定义 userEditForm 的类型
interface IUserEditData {
  id: number
  username: string
  email: string
  mobile: string
}

// 定义编辑用户的请求
export const updateUser = (userEditForm: IUserEditData) => {
  return service({
    url: 'users/' + userEditForm.id,
    method: 'put',
    data: {
      email: userEditForm.email,
      mobile: userEditForm.mobile
    }
  })
}

// 定义删除单个用户的请求
export const deleteUserById = (id: number) => {
  return service({
    url: 'users/' + id,
    method: 'delete'
  })
}

// 定义获取权限列表的请求 (参数为 list)
export const selectListRights = () => {
  return service({
    url: 'rights/list',
    method: 'get'
  })
}

// 定义获取角色列表的请求
export const selectRoles = () => {
  return service({
    url: 'roles',
    method: 'get'
  })
}

// 定义添加角色的请求
export const insertRole = (data: object) => {
  return service({
    url: 'roles',
    method: 'post',
    data
  })
}

// 定义根据 id 查询角色的请求
export const selectRoleById = (id: number) => {
  return service({
    url: 'roles/' + id,
    method: 'get'
  })
}

// 定义 roleEditForm 的类型
interface IRoleEditForm {
  roleId: number
  roleName: string
  roleDesc: string
}

// 定义编辑角色的请求
export const updateRole = (roleEditForm: IRoleEditForm) => {
  return service({
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
  return service({
    url: 'roles/' + id,
    method: 'delete'
  })
}

// 定义获取权限列表的请求 (参数为 tree)
export const selectTreeRights = () => {
  return service({
    url: 'rights/tree',
    method: 'get'
  })
}

// 定义删除角色指定权限的请求
export const deleteRoleRight = (rolelist: IRolelist, id: number) => {
  return service({
    url: `roles/${rolelist.id}/rights/${id}`,
    method: 'delete'
  })
}

// 定义角色授权的权限
export const updateRoleRights = (roleId: number, rids: string) => {
  return service({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids: rids
    }
  })
}

// 定义分配用户角色的请求
export const updateUserRole = (id: number, rid: string) => {
  return service({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid: rid
    }
  })
}
