export default [
  //影票频道首页
  {
    path: "/tickets",
    name: "tickets",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets")
  },
  {
    path: "/ticket-detail",
    name: "ticket-detail",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets/detail")
  },
  //影票频道搜索
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets/search")
  },
  //影票频道购票
  {
    path: "/booking",
    name: "booking",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets/booking")
  },
  //影票频道选座
  {
    path: "/choseSeat",
    name: "choseSeat",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets/choseSeat")
  },
  //影票频道订单确认
  {
    path: "/orderConfirm",
    name: "orderConfirm",
    component: () =>
      import(/* webpackChunkName: "tickets" */ "../views/tickets/orderConfirm")
  }
];
