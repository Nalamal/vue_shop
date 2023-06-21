// 导入service模块
import service from '@/service'

// 定义登录的请求
export const login = (data: object) => {
  return service.post({
    url: 'login'
  })
}
