import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vant from "@/components/vant";
import store from "./store";
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "971cc87c4b47791024d62f25355b3716",
  plugin: [
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PlaceSearch",
    "AMap.Geolocation",
    "AMap.Geocoder"
  ],
  v: "1.4.4",
  uiVersion: "1.0"
});
// import "@/utils/permission";

// 引入全局重置样式
import "./assets/base.css";
Vue.use(vant);

// 根据屏幕宽度动态设置rem基准值
import "amfe-flexible";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
