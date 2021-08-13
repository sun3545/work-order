import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/equipcali/page',
    method: 'get',
    params: query
  })
}
 
export function addObj(obj) {
  return request({
    url: '/admin/equipcali',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/equipcali/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/equipcali/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/equipcali',
    method: 'put',
    data: obj
  })
}

export function getFinish(id) {
    return request({
      url: '/admin/equipcali/finish/' + id,
      method: 'put'
    })
  }
  
