import axios from "@/utils/request";

const userList = "";

export default {
  // 我的订单
  getUserOrders(params) {
    return axios({
      url: `${userList}/user/getUserOrders`,
      method: "get",
      params
    });
  },
  // 我的收藏
  getUserCollect(params) {
    return axios({
      url: `${userList}/user/getUserCollect`,
      method: "get",
      params
    });
  },
  // 我想看的
  getUserWant(params) {
    return axios({
      url: `${userList}/user/getUserWant`,
      method: "get",
      params
    });
  },
  // 个人中心
  getBaseMessage() {
    return axios({
      url: `${userList}/user/getBaseMessage`,
      method: "get"
    });
  },
  // 我的影城卡
  getCinemaCard() {
    return axios({
      url: `${userList}/user/getCinemaCard`,
      method: "get"
    });
  }
};
