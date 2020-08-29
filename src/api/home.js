import axios from "@/utils/request";

const prefix = "";

export default {
  getHomeData(params) {
    return axios.post(`${prefix}/home/getHomeData`, params);
  }
};
