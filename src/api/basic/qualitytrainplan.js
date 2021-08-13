import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/admin/qualitytrainplan/page",
    method: "get",
    params: query
  });
}

export function addObj(obj) {
  return request({
    url: "/admin/qualitytrainplan",
    method: "post",
    data: obj
  });
}

export function getObj(id) {
  return request({
    url: "/admin/qualitytrainplan/" + id,
    method: "get"
  });
}

export function delObj(id) {
  return request({
    url: "/admin/qualitytrainplan/" + id,
    method: "delete"
  });
}

export function putObj(obj) {
  return request({
    url: "/admin/qualitytrainplan",
    method: "put",
    data: obj
  });
}
// 完成
export function getFinish(id) {
  return request({
    url: "/admin/qualitytrainplan/finish/" + id,
    method: "put"
  });
}

// /admin/qualitypersonnel/tree
export function tableTree() {
    return request({
      url: "/admin/qualitypersonnel/tree",
      method: "get"
    });
  }