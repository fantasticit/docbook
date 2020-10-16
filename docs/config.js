export default {
  title: 'docbook',
  logo: 'Docbook',
  js: [
    "https://unpkg.com/spritejs@3.7.27/dist/spritejs.min.js",
    "https://www.qcharts.cn/qcharts.js"
  ],
  navs: [
    {
      title: '首页',
      path: '/home'
    },
    {
      title: '文档',
      path: '/doc'
    },
    {
      title: "Github",
      path: "https://github.com/fantasticit/docbook"
    }
  ],
  routes: [
    {
      title: '',
      path: '',
      redirect: 'home'
    },
    {
      title: '首页',
      path: '/home',
      component: () => import('./home.vue')
    },
    {
      title: '文档',
      path: '/doc',
      children: [
        {
          title: '',
          path: '',
          redirect: 'overview'
        },
        {
          title: '概述',
          path: 'overview',
          component: () => import('./doc/overview.md')
        },
        {
          title: '配置',
          path: 'config',
          component: () => import('./doc/config.md')
        },
        {
          title: '编辑器',
          path: 'editor',
          component: () => import('./doc/editor.md')
        },
      ]
    }
  ]
}
