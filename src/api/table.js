import request from '@/utils/request'

// 用户列表
export function getUserList(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: '/api/users/list',
    method: 'get',
    params
  })
}

// 删除用户
export function delUser(id) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: '/api/users/delete/'+ id,
    method: 'delete'
  })
}


// 文章列表
export function getArticleList(data) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: '/api/article/list',
    method: 'post',
    params:data
  })
}
