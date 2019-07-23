import { isPlainObject } from './util'
// 对请求体和响应体的处理
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    // 转化为JSON字符串
    return JSON.stringify(data)
  }
  return data
}

// 由于不传reseponseType默认返回json字符串类型的数据
// 此处对响应数据做处理 返回json对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 不一定是json字符串 使用try catch 转化失败不做任何操作
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
