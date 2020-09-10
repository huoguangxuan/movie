import axios from "@/utils/request";

const prefix = "";

export default {
  getFilms(params) {
    return axios.post(`${prefix}/mock/home/getMoreData`, params);
  },
  getFilmDetail(params) {
    return axios.post(`${prefix}/mock/film/getFilmDetail`, params);
  },
  handleCollect(params) {
    // 类型,收藏:0,标记想看为:1 ,收藏为:2
    // 操作:想看或已看或收藏为:1,取消想看或已看或收藏为:2
    return axios.post(`${prefix}/mock/film/markWanAlready`, params);
  },
  getSearchResul(params) {
    return axios.post(`${prefix}/homeInfo/getSearchResul`, params);
  }
};
