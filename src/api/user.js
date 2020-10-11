import request from '@/utils/request'

// 登录接口
export function userLogin(params) {
  console.log(111)
  return request({
    url: '/api/users/login',
    method: 'POST',
    params
  })
}

// 获取用户信息接口
export function getUserInfo(params) {
  return request({
    url: '/api/users/current',
    method: 'get',
    params
  })
}

// 注册接口
export function register(data) {
  return request({
    url: '/api/users/register',
    method: 'post',
    data
  })
}