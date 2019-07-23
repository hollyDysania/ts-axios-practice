import { AxiosRequestConfig } from '../types'
import { isplainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

// 优先返回第二个参数
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
// 只返回第二个参数
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
// 针对headers复杂对象合并策略
function deepMergeStrat(val1: any, val2: any): any {
  // val2是对象 深拷贝合并12
  if (isplainObject(val2)) {
    return deepMerge(val1, val2)
    // 2不存在返回val2
  } else if (typeof val2 !== 'undefined') {
    return val2
    // 1是对象 2不是对象又存在 返回深拷贝val1
  } else if (isplainObject(val1)) {
    return deepMerge(val1)
    // 1存在又不是对象 直接返回
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strakKeysFromVal2 = ['url', 'params', 'data']

strakKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeep = ['headers']

stratKeysDeep.forEach(key => {
  strats[key] = deepMergeStrat
})

// 请求前一些配置合并
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  // 遍历2 根据不同策略给config赋值
  for (let key in config2) {
    mergeField(key)
  }

  // 遍历1 给config赋值config2没有的属性
  for (let key in config1) {
    if (!config1[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStart
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
