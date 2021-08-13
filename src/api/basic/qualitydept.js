import request from '@/router/axios'

// pageDept
// saveDept
// updateDept
// delDept
export function fetchList(query) {
    return request({
      url: '/admin/qualitypersonnel/pageDept',
      method: 'get',
      params: query
    })
  }
  
  export function addObj(obj) {
    return request({
      url: '/admin/qualitypersonnel/saveDept',
      method: 'post',
      data: obj
    })
  }
  
  export function getListObj() {
    return request({
      url: '/admin/qualitypersonnel/listDept',
      method: 'get'
    })
  }
  export function delObj(id) {
    return request({
      url: '/admin/qualitypersonnel/delDept/' + id,
      method: 'delete'
    })
  }
  
  export function putObj(obj) {
    return request({
      url: '/admin/qualitypersonnel/updateDept',
      method: 'put',
      data: obj
    })
  }