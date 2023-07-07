import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

// 引入路由
import router from '@/router'
// 引入登录请求
import { login } from '@/service/modules/login'

// 定义登录表单类型
export interface IAccount {
  username: string
  password: string
}

const useLoginStore = defineStore('loginStore', () => {
  // 定义 token
  const token = ref('')
  // 定义登录行为的方法
  const loginAction = async (account: IAccount) => {
    // 发起登录请求
    const res = await login(account)
    // 登录失败
    if (res.meta.status !== 200) {
      // 提示登录失败
      return ElMessage.error('登录失败！')
    }
    // 登录成功
    ElMessage.success('登录成功！')
    // 将 token 存储再 localStorage 中
    window.localStorage.setItem('token', res.data.token)
    // 实现路由跳转
    router.push('/home')
  }

  return { token, loginAction }
})

export default useLoginStore
