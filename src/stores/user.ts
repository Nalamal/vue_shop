import { selectUser } from '@/service/modules/user'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

// 定义 userlist 的类型
interface IUserlist {
  create_time?: number
  email?: string
  id?: number
  mg_state?: boolean
  mobile?: string
  role_name?: string
  username?: string
}

const useUserStore = defineStore('userStore', () => {
  // 表单列表的参数对象
  const queryInfo = reactive({
    query: '',
    // 当前的页数
    pagenum: 1,
    // 当前每页显示多少条数据
    pagesize: 2
  })

  // 定义当前页数
  const pagenum = ref(1)

  // 定义返回的总条数
  const total = ref(0)

  // 定义获取用户列表的请求
  const getUserlistAction = async () => {
    const res = await selectUser(queryInfo)
    console.log(res)
  }

  // 控制添加表单对话框的显示与隐藏
  const addDialogVisible = ref(false)

  return { queryInfo, getUserlistAction, addDialogVisible }
})

export default useUserStore
