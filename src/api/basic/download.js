
import request from '@/router/axios'

export default function(obj) {
    return request({
      url: '/admin/file/download',
      method: 'post',
      data: obj
    })
  }