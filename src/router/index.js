import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/tickets";
import store from "@/store";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    component: Home
  },
  //首页
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "pages" */ "../views/tickets")
  },
  //首页城市选择
  {
    path: "/citySelection",
    name: "citySelection",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/tickets/citySelection")
  },
  //首页banner详情页
  {
    path: "/bannerDetail",
    name: "bannerDetail",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/tickets/bannerDetail")
  },
  //首页搜索页
  {
    path: "/homeSearch",
    name: "homeSearch",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/tickets/homeSearch")
  },
  //首页搜索页结果
  {
    path: "/homeSearch/result",
    name: "homeSearchResult",
    component: () =>
      import(
        /* webpackChunkName: "pages" */ "../views/tickets/homeSearchResult"
      )
  },
  //资讯详情
  {
    path: "/information",
    name: "information",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/tickets/information")
  },
  //热门活动
  {
    path: "/activity",
    name: "activity",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/tickets/activity")
  },

  //个人主页
  {
    path: "/userCenter",
    name: "userCenter",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter")
  },
  //优惠券
  {
    path: "/coupon",
    name: "coupon",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/coupon")
  },
  //影城卡
  {
    path: "/cinemaCard",
    name: "cinemaCard",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/cinemaCard")
  },
  //联名卡
  {
    path: "/cobrandCard",
    name: "cobrandCard",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/cobrandCard")
  },
  //我的订单
  {
    path: "/order",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/order")
  },
  //想看的影片
  {
    path: "/favor",
    name: "favor",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/favor")
  },
  //我的收藏
  {
    path: "/collection",
    name: "collection",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/collection")
  },
  //影评
  {
    path: "/comments",
    name: "comments",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/comments")
  },
  //关于
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/about")
  },
  //我的活动
  {
    path: "/activites",
    name: "activites",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/userCenter/activites")
  },
  //404
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue")
  }
];

//webpack的自动导入功能

const routerContext = require.context("./", true, /\.js$/);
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 不处理
  if (route.startsWith("./index")) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule);
});

routes = routes.concat({
  path: "*",
  redirect: "/404"
});

const createRouter = () =>
  new VueRouter({
    mode: "history", //require service support
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes
  });
const myRouter = createRouter();
const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem("count") * 1 || 0;
history.setItem("/", 0);

myRouter.beforeEach((to, from, next) => {
  if (to.params.direction) {
    store.commit("updateDirection", to.params.direction);
  } else {
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      if (
        !fromIndex ||
        parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
        (toIndex === "0" && fromIndex === "0")
      ) {
        store.commit("updateDirection", "forward");
      } else {
        store.commit("updateDirection", "back");
      }
    } else {
      ++historyCount;
      history.setItem("count", historyCount);
      to.path !== "/" && history.setItem(to.path, historyCount);
      store.commit("updateDirection", "forward");
    }
  }
  next();
});

export function resetRouter() {
  myRouter.replace("/");
}

export default myRouter;
