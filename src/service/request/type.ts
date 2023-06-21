import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface MyInterceptors<T> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>
}
