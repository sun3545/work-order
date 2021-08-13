import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/orderbusiness/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/orderbusiness",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/orderbusiness/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/orderbusiness/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/orderbusiness",
    method: "put",
    data: obj
  });
}

export function closeOrder(id) {
  return request({
    url: "/admin/orderbusiness/close/" + id,
    method: "put"
  });
}

export function openOrder(obj) {
    return request({
      url: "/admin/orderbusiness/open",
      method: "put",
      data: obj
    });
  }
