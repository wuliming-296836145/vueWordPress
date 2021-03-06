/*
 * @文件描述: 请求配置
 * @作者: L
 */
import axios from 'axios'
import qs from 'qs' 
import { getToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import store from '@/store'
// import route from '@/router'
// 设置axios请求默认配置
const request = axios.create({
  baseURL: '', // api的base_url前缀
  // baseURL: 'localhost:3000/api/', // api的base_url前缀
  timeout: 1000 * 30 // 请求超时
})

// request拦截器 请求前的拦截器
request.interceptors.request.use(
  config => {
    if (getToken()) {
      console.log(111)
      config.headers.Authorization = getToken()
    }
    console.log(config.method.toLowerCase())
    // 这里可以自定义一些config 配置
    if (config.method.toLowerCase() === 'post' && !config.headers['Content-Type']) {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      config.headers['Content-Type'] = 'application/json'
    }
    if (/application\/x-www-form-urlencoded/.test(config.headers['Content-Type']) && typeof config.data === 'object') {
      // let params = new URLSearchParams()
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// axios响应拦截
request.interceptors.response.use(
  response => {
    const res = response
    if (res.status === 200) {
      return res
    } else {
      return Promise.reject(res.msg || 'Error')
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          console.log('token 失效')
          MessageBox.confirm('您登录时间过长，请重新返回登录页面进行登录', '确定登出', {
            confirmButtonText: '重新登录',
            showCancelButton: false,
            closeOnClickModal: false,
            showClose: false,
            closeOnPressEscape: false,
            type: 'warning'
          }).then(() => {
            store.dispatch('user/loginOut').then(() => {
              // route.replace('/index')
              store.dispatch('app/showModal', 1)
            })
          })
          break
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

export default request
