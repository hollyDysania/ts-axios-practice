import { isplainObject } from './util'
// 对请求体和响应体的处理
export function transformRequest(data: any): any {
  if(isplainObject(data)) {
    // 转化为JSON字符串
    return JSON.stringify(data)
  }
  return data
}