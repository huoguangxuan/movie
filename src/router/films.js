export default [
  //影片列表
  {
    path: "/films",
    name: "films",
    component: () => import(/* webpackChunkName: "pages" */ "../views/films")
  },
  //影片详情
  {
    path: "/film-detail",
    name: "film-detail",
    component: () =>
      import(/* webpackChunkName: "film" */ "../views/films/detail")
  },
  //更多剧照
  {
    path: "/film-detail/photos",
    name: "film-photos",
    component: () =>
      import(/* webpackChunkName: "film" */ "../views/films/photos")
  },
  {
    path: "/ylh",
    name: "ylh",
    component: () => import(/* webpackChunkName: "film" */ "../views/films/ylh")
  }
];
