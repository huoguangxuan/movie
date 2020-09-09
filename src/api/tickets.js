import axios from "@/utils/request";

const prefix = "";

export default {
  //获取动态座位图
  getSeats(params) {
    return axios.get(`${prefix}/ticket/getSeatDatas`, params);
  },
  //获取订单信息
  getOrderInfo(params) {
    return axios.post(`${prefix}/cinema/getMessage`, params);
  },
  //获取影票信息
  getTicketInfo(params) {
    return axios.post(`${prefix}/user/getTicket`, params);
  },
  //home
  // getHomeData(params) {
  //   return axios.post(`${prefix}/home/getHomeData`, params);
  // },
  getMoreDatar(params) {
    return axios.post(`${prefix}/home/getMoreDatar`, params);
  },
  getHomeData(params) {
    return axios.get(
      `${prefix}/mtc-front/v1/homeInfo/getHomeData?cityId=${params.cityId}`
    );
  },
  getHomeDatar(params) {
    return axios.get(
      `${prefix}/mtc-front/v1/homeInfo/getShowingOrComing`,
      params
    );
  }
};
