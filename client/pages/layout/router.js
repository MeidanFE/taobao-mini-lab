export const basePath = "/lottie";

export const routerConfig = {
  routes: [
    {
      path: "/form",
      component: "form",
    },
    {
      path: "/chart",
      component: "chart",
      children: [
        { path: "/line", component: "line" },
        { path: "/pie", component: "pie" },
      ],
    },
    // {
    //   path: '/component',
    //   component: 'component',
    //   children: [
    //     { path: '/button', component: 'button' },
    //     { path: '/icon', component: 'icon' }
    //   ],
    // },
    // {
    //   path: '/api',
    //   component: 'api',
    //   children: [
    //     { path: '/interface', component: 'interface' },
    //     { path: '/base', component: 'base' }
    //   ],
    // },
    // {
    //   path: '/sence',
    //   component: 'sence'
    // }
  ],
  option: {
    initPath: basePath,
  },
};
