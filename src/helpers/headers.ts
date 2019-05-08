import { isplainObject } from './util'

// 规范化
function normalizeHeaderName (headers: any, normalizeName: string): void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    // 大小写不同但实际上相同的header转换为首字母大写的header
    if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()){
      headers[name] = headers[normalizeName]
      delete headers[name]
    }
  })
}

// 未传Content-Type的headers时根据data类型进行转换headers
export function handlingHearders (headers: any, data: any): any {
  // 规范化首字母大写
  normalizeHeaderName(headers, 'Content-Type')
  if(isplainObject(data)) {
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 响应头处理为对象形式
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }
  // 根据换行符和空格切割
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    // 去空格 规范小写
    key = key.trim().toLowerCase()
    if(!key) {
      // 进行下次循环
      return
    }
    parsed[key] = val
  })
  return parsed
}
