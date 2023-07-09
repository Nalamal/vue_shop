// 导入service模块
import service from '@/service'
import type { IUserlist } from '@/components/user/Users.vue'

// 定义获取用户数据列表请求
export const selectUser = (params: object) => {
  return service.get({
    url: 'users',
    params
  })
}

// 定义修改用户状态请求
export const changeUserState = (data: IUserlist) => {
  return service.put({
    url: `users/${data.id}/state/${data.mg_state}`,
    data
  })
}

// 定义添加用户的请求
export const addUser = (data: object) => {
  return service.post({
    url: 'users',
    data
  })
}

// 定义根据 id 查询角色的请求
export const selectUserById = (id: number) => {
  return service.get({
    url: 'users/' + id,
    method: 'get'
  })
}

// 定义编辑用户的请求
export const updateUser = (userEditForm: any) => {
  return service.put({
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
  return service.delete({
    url: 'users/' + id
  })
}
