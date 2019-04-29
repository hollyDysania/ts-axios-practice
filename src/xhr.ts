import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 利用默认值和结构取值
  const { data = null, url, method = 'get',headers = {} } = config
  // 创建XMLHttpRequest实例对象
  const request = new XMLHttpRequest()
  // 方式 url 同步异步(true为异步)
  request.open(method.toUpperCase(), url, true)
  // headers
  Object.keys(headers).forEach(name => {
    console.log(headers, 666)
    if(data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    }else {
      request.setRequestHeader(name, headers[name])
    }
  })
  // 发送请求
  request.send(data)
}
