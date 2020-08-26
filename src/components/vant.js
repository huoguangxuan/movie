import { Row, Col, Botton, Toast } from "vant";
const vant = {
  install: function(Vue) {
    Vue.component("van-row", Row);
    Vue.component("van-col", Col);
    Vue.component("van-button", Botton);
    Vue.component("van-toast", Toast);
  }
};
export default vant;
