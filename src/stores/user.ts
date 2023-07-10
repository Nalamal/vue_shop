import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getUserlist } from '@/service/modules/user'
import { ElMessage } from 'element-plus'

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
  // 获取用户列表的参数
  const queryInfo = reactive({
    query: '',
    // 显示当前页数，默认显示第1页
    pagenum: 1,
    // 当前每页显示多少条数据，默认每页显示2条
    pagesize: 2
  })

  // 数据总条数
  const total = ref(0)

  // 用户列表数据
  const userlist = ref<IUserlist[]>([])

  // 定义获取用户列表的请求
  const getUserlistAction = async () => {
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

  return { queryInfo, total, userlist, getUserlistAction }
})

export default useUserStore
