import axios from "@/utils/request";

const prefix = "";

export default {
  getSeats(params) {
    return axios.get(`${prefix}/ticket/getSeatDatas`, params);
  }
};
