// 参数接口
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
// xhr请求方法
import xhr from './xhr'
import { handlingURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { handlingHearders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  handlingConfig(config)
  // 返回值为promise
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 发送请求之前对所有参数做处理
function handlingConfig(config: AxiosRequestConfig): void {
  // URL
  config.url = transformURL(config)
  // 请求头
  config.headers = transformHeaders(config)
  // data
  config.data = transformRequestData(config)
}

// URL处理
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return handlingURL(url!, params)
}
// 请求体响应体处理
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}
// 请求头
function transformHeaders(config: AxiosRequestConfig): any {
  // headers 默认值
  const { headers = {}, data } = config
  return handlingHearders(headers, data)
}

// data数据处理
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
