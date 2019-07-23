const AnyToString = Object.prototype.toString

// 判断时间对象
export function isDate(val: any): val is Date {
  return AnyToString.call(val) === '[object Date]'
}

// 判断对象
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}

// 判断普通对象 (为了排除formData, Blod)
export function isplainObject(val: any): val is object {
  return AnyToString.call(val) === '[object Object]'
}

// 混合对象
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isplainObject(val)) {
          if (isplainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
