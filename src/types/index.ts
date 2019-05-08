import { request } from "http";

// 定义method可选内容
export type Method = 'get' | 'Get'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

// 定义axios的config接口类型
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
// axios的response接口类型
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// axios返回的promise对象
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 错误类型接口
export interface AxiosError extends Error {
  config: AxiosRequestConfig,
  code?: string | null
  request?: any
  response?: AxiosResponse
}