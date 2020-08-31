import axios from "@/utils/request";

const userList = "";

export default {
  getUserOrders(params) {
    return axios({
     url: `${userList}/user/getUserOrders`,
     method: 'get',
     params
    });
  }
};