import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserlist, addUserlist, changeUserState, getUserById } from '@/service/modules/user'
import { ElMessage } from 'element-plus'

// 定义 queryInfo 的类型
interface IQueryInfo {
  query: string
  pagenum: number
  pagesize: number
}

// 定义 userlist 的类型
export interface IUserlist {
  create_time?: number
  email?: string
  id?: number
  mg_state?: boolean
  mobile?: string
  role_name?: string
  username?: string
}

// 定义 userForm 的类型
interface IUserForm {
  username: string
  password: string
  email: string
  mobile: string
}

// 定义 editForn 的类型
export interface IEditForm {
  id?: number
  username?: string
  email?: string
  mobile?: string
}

const useUserStore = defineStore('userStore', () => {
  // 用户列表数据
  const userlist = ref<IUserlist[]>([])
  // 数据总条数
  const total = ref(0)

  // 定义获取用户列表的请求
  const getUserlistAction = async (queryInfo?: IQueryInfo) => {
    // 发送获取用户列表的请求
    const res = await getUserlist(queryInfo)
    // 获取用户失败
    if (res.meta.status !== 200) {
      return ElMessage.error('获取用户列表失败！')
    }
    // 将返回的结果存储到数据仓库中
    total.value = res.data.total
    userlist.value = res.data.users
  }

  // 定义添加用户列表的请求
  const addUserlistAction = async (userlist: IUserForm) => {
    const res = await addUserlist(userlist)
    // 请求失败
    if (res.meta.status !== 201) {
      return ElMessage.error('添加用户失败！')
    }
    // 请求成功
    ElMessage.success('添加用户成功!')
  }

  // 定义修改用户状态的请求
  const changeUserStateAction = async (userlist: IUserlist) => {
    // 发起修改用户状态的请求
    const res = await changeUserState(userlist)
    // 请求失败
    if (res.meta.status !== 200) {
      // 将状态取反回复原状态
      userlist.mg_state = !userlist.mg_state
      ElMessage.error('更新用户状态失败！')
    }
    // 请求成功
    ElMessage.success('更新用户状态成功！')
  }

  // 修改表单的用户数据
  const editForm = ref<IEditForm>()

  //  定义根据id查询用户的请求
  const getUserByIdAction = async (id: number) => {
    // 发起根据id查询用户的请求
    const res = await getUserById(id)
    // 请求失败
    if (res.meta.status !== 200) {
      return ElMessage.error('查询用户信息失败!')
    }
    editForm.value = res.data
  }

  return {
    userlist,
    total,
    getUserlistAction,
    addUserlistAction,
    changeUserStateAction,
    editForm,
    getUserByIdAction
  }
})

export default useUserStore
