import { AxiosRequestConfig, AxiosResponse } from "../types";

// 错误类
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  // 构造器
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ){
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    // ts的问题 需要加上这行才能完成继承
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 工厂函数 外部直接调用这个
export function createdError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}