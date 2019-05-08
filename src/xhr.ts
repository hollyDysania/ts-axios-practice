import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createdError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise{
  return new Promise((resolve, reject) => {
    // 利用默认值和结构取值
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config
    // 创建XMLHttpRequest实例对象
    const request = new XMLHttpRequest()
    // 方式 url 同步异步(true为异步)
    request.open(method.toUpperCase(), url, true)
    // type
    if (responseType) {
      request.responseType = responseType
    }
    // 超时时间 ms
    if(timeout) {
      request.timeout = timeout
    }
    // 监听状态
    request.onreadystatechange = function handleLoad() {
      let {readyState, status} = request
      // 响应未完成直接return
      if(readyState !== 4) {
        return
      }
      // 网络错误或超时 status为0
      if(status === 0) {
        return
      }
      // 拿到响应头 响应头字符串转换为对象
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 根据type拿到对应的响应数据
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // 根据status状态码对response做处理
      handleResponse(response)
    }
    // 监听错误 网络
    request.onerror = function handleError() {
      reject(createdError('Network Error', config, null, request))
    }
    // 监听超时
    request.ontimeout = function handleTimeout() {
      // ECONNABORTED 表示被终止
      reject(createdError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // headers
    Object.keys(headers).forEach(name => {
      console.log(headers, 666)
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    // 发送请求
    request.send(data)

    // 针对不同status做处理
    function handleResponse(response: AxiosResponse): void {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      }else {
        reject(
          createdError(`Request failed with status code ${response.status}`, config, null, request, response)
        )
      }
    }
  })
}
