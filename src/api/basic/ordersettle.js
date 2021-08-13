import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/ordersettle/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/ordersettle',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/ordersettle/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/ordersettle/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/ordersettle',
    method: 'put',
    data: obj
  })
}


export function closeOrder(id) {
    return request({
      url: "/admin/ordersettle/close/" + id,
      method: "put"
    });
  }
  
  export function openOrder(obj) {
    return request({
      url: "/admin/ordersettle/open",
      method: "put",
      data: obj
    });
  }
  