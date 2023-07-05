import { BASE_URL, TIME_OUT } from './config'
import Request from './request/index'

// 创建一个 Request 实例
const service = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config: any) => {
      return config
    }
  }
})

// 导出请求实例
export default service
