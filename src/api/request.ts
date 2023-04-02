// 导入 service 模块
import service from '@/service'

// 定义登录请求
export const login = (data: Object) => {
  return service({
    url: 'login',
    method: 'post',
    data
  })
}
