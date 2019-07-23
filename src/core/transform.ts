import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  // 不是数组转数组 方便统一处理
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    // 每次转换函数data作为下一次data参数传入
    data = fn(data, headers)
  })
  return data
}
