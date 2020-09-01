export default [
  //影片列表
  {
    path: "/films",
    name: "films",
    redirect: "/films/hotfilms",
    component: () => import(/* webpackChunkName: "pages" */ "../views/films"),
    children: [
      {
        path: "hotfilms",
        name: "hotfilms",
        component: () =>
          import(
            /* webpackChunkName: "pages" */ "../views/films/component/hotfilms"
          )
      },
      {
        path: "thefilms",
        name: "thefilms",
        component: () =>
          import(
            /* webpackChunkName: "pages" */ "../views/films/component/thefilms"
          )
      }
    ]
  },
  //影片详情
  {
    path: "/film-detail",
    name: "film-detail",
    component: () =>
      import(/* webpackChunkName: "pages" */ "../views/films/detail")
  }
];
