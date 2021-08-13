import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/equipmain/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/equipmain',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/equipmain/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/equipmain/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/equipmain',
    method: 'put',
    data: obj
  })
}

export function getFinish(id) {
    return request({
      url: '/admin/equipmain/finish/' + id,
      method: 'put'
    })
  }