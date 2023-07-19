// 导入service模块
import service from '@/service'
import type { IUserlist, IEditForm } from '@/stores/user'

// 定义获取用户数据列表请求
export const getUserlist = (queryInfo = { query: '', pagenum: 1, pagesize: 2 }) => {
  return service.get({
    url: 'users',
    params: {
      ...queryInfo
    }
  })
}

// 定义添加用户的请求
export const addUserlist = (userlist: IUserlist) => {
  return service.post({
    url: 'users',
    ...userlist
  })
}

// 定义修改用户状态请求
export const changeUserState = (userlist: IUserlist) => {
  return service.put({
    url: `users/${userlist.id}/state/${userlist.mg_state}`,
    ...userlist
  })
}

// 定义根据 id 查询角色的请求
export const getUserById = (id: number) => {
  return service.get({
    url: 'users/' + id,
    method: 'get'
  })
}

// 定义编辑用户的请求
export const editUserlist = (editForm: IEditForm) => {
  return service.put({
    url: 'users/' + editForm.id,
    method: 'put',
    data: {
      email: editForm.email,
      mobile: editForm.mobile
    }
  })
}

// 定义删除单个用户的请求
export const deleteUserById = (id: number) => {
  return service.delete({
    url: 'users/' + id
  })
}
