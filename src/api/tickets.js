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
  }
};
