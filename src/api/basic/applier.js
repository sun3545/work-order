import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/applier/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/applier',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/applier/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/applier/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/applier',
    method: 'put',
    data: obj
  })
}
