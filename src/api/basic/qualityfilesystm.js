import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/qualityfilesystm/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/qualityfilesystm',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/qualityfilesystm/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/qualityfilesystm/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/qualityfilesystm',
    method: 'put',
    data: obj
  })
}
