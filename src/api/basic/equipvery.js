import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/equipvery/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/equipvery",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/equipvery/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/equipvery/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/equipvery",
    method: "put",
    data: obj
  });
}

export function getFinish(id) {
  return request({
    url: "/admin/equipvery/finish/" + id,
    method: "put"
  });
}
