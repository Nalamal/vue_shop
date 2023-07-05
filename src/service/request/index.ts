import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig } from './type'

class Request {
  instance: AxiosInstance
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (config) => {
        // Loading
        // console.log('全局请求成功拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功拦截')
        return res.data
      },
      (err) => {
        // console.log('全局响应失败拦截')
        return err
      }
    )
  }
  // 请求方法
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次请求的拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  put<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}
export default Request
