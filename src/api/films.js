import axios from "@/utils/request";

const prefix = "";

export default {
  getFilms(params) {
    return axios.post(`${prefix}/home/getMoreData`, params);
  },
  getFilmDetail(params) {
    return axios.post(`${prefix}/film/getFilmDetail`, params);
  },
  getSearchResul(params) {
    return axios.post(`${prefix}/homeInfo/getSearchResul`, params);
  }
};
