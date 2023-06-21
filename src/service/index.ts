import { BASE_URL, TIME_OUT } from './config'
import Request from './request/index'

const service = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config: any) => {
      return config
    }
  }
})
export default service
