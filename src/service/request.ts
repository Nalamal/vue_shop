// 导入 service 模块
import service from './index'
// 导入
import type { IUserlist } from '@/components/user/Users.vue'

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

// 定义 editForm 的类型
interface IUserEditData {
  id: number
  username: string
  email: string
  mobile: string
}

// 定义编辑用户的请求
export const updateUser = (data: IUserEditData) => {
  return service({
    url: 'users/' + data.id,
    method: 'put',
    data: {
      email: data.email,
      mobile: data.mobile
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
