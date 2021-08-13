import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/ordertotal/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/ordertotal",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/ordertotal/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/ordertotal/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/ordertotal",
    method: "put",
    data: obj
  });
}

export function closeOrder(id) {
  return request({
    url: "/admin/ordertotal/close/" + id,
    method: "get"
  });
}

export function openOrder(obj) {
    return request({
      url: "/admin/ordertotal/open/",
      method: "put",
      data: obj
    });
  }
