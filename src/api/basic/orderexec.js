import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/orderexec/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/orderexec",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/orderexec/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/orderexec/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/orderexec",
    method: "put",
    data: obj
  });
}

export function closeOrder(id) {
  return request({
    url: "/admin/orderexec/close/" + id,
    method: "put"
  });
}

export function openOrder(obj) {
  return request({
    url: "/admin/orderexec/open",
    method: "put",
    data: obj
  });
}
