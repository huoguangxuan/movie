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
      import(/* webpackChunkName: "pages" */ "../views/films/detail")
  }
];
