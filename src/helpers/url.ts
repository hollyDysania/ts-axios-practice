import { isDate, isPlainObject } from './util'

// 转译字符串 特殊字符再转译回来
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 对URL进行处理
export function handlingURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 字符串数组
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    // 每项取值
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      // 跳出本次循环
      return
    }
    let values = []
    // 数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // 时间对象
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // 对象转为json字符串
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
    // 拼接字符串
    let serializedParams = parts.join('$')
    if (serializedParams) {
      // 检测是否有# hash 有就忽略
      const marIndex = url.indexOf('#')
      if (marIndex !== -1) {
        url = url.slice(0, marIndex)
      }
      // 拼接url与参数
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })
  return url
}
