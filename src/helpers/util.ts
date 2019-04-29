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