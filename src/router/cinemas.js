export default [
  //影院列表
  {
    path: "/cinemas",
    name: "cinemas",
    component: () => import(/* webpackChunkName: "pages" */ "../views/cinemas")
  },
  //影院详情
  {
    path: "/cinemas/detail",
    name: "cinemasdetail",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/cinemas/detail")
  },
  //影院购票
  {
    path: "/cinemas/booking",
    name: "cinemasbooking",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/cinemas/booking")
  },
  //影院地图
  {
    path: "/cinemas/map",
    name: "cinemasmap",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/cinemas/map")
  }
];
