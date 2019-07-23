// 参数接口
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
// xhr请求方法
import xhr from './xhr'
import { handlingURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

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
  // data
  config.data = transform(config.data, config.headers, config.transformRequest)
  // 请求头进一步处理
  config.headers = flattenHeaders(config.headers, config.method!)
}

// URL处理
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return handlingURL(url!, params)
}

// data数据处理
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
