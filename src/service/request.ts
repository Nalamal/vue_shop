// 导入 service 模块
import service from './index'
// 导入类型变量
import type { IUserlist } from '@/components/user/Users.vue'
import type { IRoleslist } from '@/components/power/Roles.vue'

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
export const deleteRoleRight = (rolelist: IRoleslist, id: number) => {
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

// 定义查询商品分类的请求
export const selectGoodsCategories = (params?: object) => {
  return service({
    url: 'categories',
    method: 'get',
    params
  })
}

// 添加分类的请求
export const insertGoodsCategories = (data: object) => {
  return service({
    url: 'categories',
    method: 'post',
    data
  })
}

// 定义根据 id 查询商品分类的请求
export const selectGoodsCategoriesById = (id: number) => {
  return service({
    url: 'categories/' + id,
    method: 'get'
  })
}

// 定义 editCateForm 的类型
interface IEditCateForm {
  cat_id: number
  cat_name: string
  cat_pid: string
  cat_level: number
}

// 定义编辑提交分类的请求
export const updateGoodsCategories = (editCateForm: IEditCateForm) => {
  return service({
    url: 'categories/' + editCateForm.cat_id,
    method: 'put',
    data: {
      cat_name: editCateForm.cat_name
    }
  })
}

// 定义删除分类的请求
export const deleteGoodsCategories = (id: number) => {
  return service({
    url: 'categories/' + id,
    method: 'delete'
  })
}

// 定义查询商品列表的请求
export const selectGoods = (params: object) => {
  return service({
    url: 'goods',
    method: 'get',
    params
  })
}

// 定义编辑提交商品的请求
// export const updateGood = () => {
//   return service({
//     url: 'goods' + id,
//     method: 'put',
//     data: {
//       goods_name: '',
//       goods_price: '',
//       goods_number: '',
//       goods_weight: '',
//       goods_introduce
//     }
//   })
// }

// 定义删除商品的请求
export const deleteGood = (id: number) => {
  return service({
    url: 'goods/' + id,
    method: 'delete'
  })
}

// 定义获取参数列表的请求
export const selectCategoriesArributes = (id: number, sel: string) => {
  return service({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel
    }
  })
}

// 定义上传图片的请求
export const uploadPicture = (file: File) => {
  return service({
    url: 'upload',
    method: 'post',
    data: {
      file
    }
  })
}
