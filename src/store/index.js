import Vue from "vue";
import Vuex from "vuex";
import createLoadingPlugin from "@/utils/vuex-loading";
Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
const modules = {};
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
export default new Vuex.Store({
  plugins: [createLoadingPlugin()],
  state: {
    direction: "forward", // 页面切换方向
    show: true
  },
  getters: {
    userData(state) {
      return state.user;
      // return getters['user/user']
    }
    // vuex 全局getters引入局部
    // token () {
    //   return store.getters['user/token']
    // }
  },
  mutations: {
    // 更新页面切换方向
    updateDirection(state, direction) {
      state.direction = direction;
    },
    navshow(state, status) {
      state.show = status;
    }
  },
  actions: {
    changenavshow(context, status) {
      context.commit("navshow", status);
    }
  },
  modules
});
