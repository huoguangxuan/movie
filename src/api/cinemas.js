import axios from "@/utils/request";

const prefix = "cinema";

export default {
  getFilms(params) {
    return axios.post(`${prefix}/getMessage`, params);
  }
};
