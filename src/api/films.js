import axios from "@/utils/request";

const prefix = "";

export default {
  getFilms(params) {
    return axios.post(`${prefix}/home/getMoreData`, params);
  },
  getFilmDetail(params) {
    return axios.post(`${prefix}/mtc-front/v1/homeInfo/getFilmDetail`, params);
  }
};
