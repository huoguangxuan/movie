import axios from "@/utils/request";

const prefix = "";

export default {
  //获取动态座位图
  getSeats(params) {
    return axios.get(
      `/mtc-proxy/v1/seats/seatsList?flowNo=${params.flowNo}&showId=${params.showId}`
    );
  },
  //获取订单信息
  getOrderInfo(params) {
    return axios.post(`${prefix}/mock/cinema/getMessage`, params);
  },
  //获取影票信息
  getTicketInfo(params) {
    return axios.post(`/mock/user/getUserOrderDetai`, params);
  },
  //影票正在热映、即将上映
  getMoreDatar(params) {
    return axios.post(`${prefix}/mock/home/getMoreDatar`, params);
  },
  //首页轮播、活动
  getHomeData(params) {
    return axios.get(
      `${prefix}/mock/v1/homeInfo/getHomeData?cityId=${params.cityId}`
    );
  },
  //首页的正在热映、即将上映
  getHomeDatar(params) {
    return axios.get(`${prefix}/mock/v1/homeInfo/getShowingOrComing`, params);
  }
};
