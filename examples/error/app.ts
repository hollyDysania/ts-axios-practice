import axios, { AxiosError } from '../../src/index'

// url写错 404
// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })
// // 延时模拟网络错误
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   }).then((res) => {
//     console.log(res)
//   }).catch((e) => {
//     console.log(e)
//   })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e.message)
// })

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e)
})
