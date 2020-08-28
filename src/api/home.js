import axios from "@/utils/request";

const prefix = "";

export default {
  // 获取首页banner，热映，即将上映，热门活动的数据接口
  getHomeData(params) {
    return axios.get(`${prefix}/ticket/getSeatDatas`, params);
  }
};
