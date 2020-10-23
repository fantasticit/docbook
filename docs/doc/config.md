---
title: '配置'
index: 4
---

## 配置

通过 `docs/config.js` 指定文档配置。

- `icon`: favicon 配置
- `title`: 文档站标题
- `logo`: Logo 配置，支持 HTML 字符串
- `github`: github 地址，配置后将在网页右上角添加 github 图标
- `js`: 需要额外注入的 js 资源地址，形如：`["https://www.qcharts.cn/qcharts.js"]`，同时注入到编辑器，编辑器中也可使用
- `toc`: 是否为文章开启目录
- `navs`: 文档站头部导航，形如：`[{title: '首页', path: '/home' },]`
- `renderFooter`: 正文底部渲染函数，注意类型是函数，不配置不渲染底部
- `manifest`: PWA manifest 清单配置（_请将资源放置在 `docs/assets` 内_）

开发配置：

- `port`: 本地开发端口，默认 `9090`
- `debug`: 是否开启调试模式，默认 `false`
- `outputDir`: 文档编译输出目录，默认 `docs-build`

### 本站配置

```js
export default {
  title: 'docbook',
  logo: 'Docbook',
  port: 4000,
  github: 'https://github.com/fantasticit/docbook',
  js: ['https://s2.ssl.qhres.com/!f868948f/vue.min.js'],
  toc: true,
  navs: [
    {
      title: '首页',
      path: '/index',
    },
    {
      title: '文档',
      path: '/doc',
    },
    {
      title: 'Github',
      path: 'https://github.com/fantasticit/docbook',
    },
  ],
  renderFooter: (buildTime, relativeFilePath) =>
    `Bulid at ${buildTime}, Modify on <a href="https://github.com/fantasticit/docbook/tree/main${relativeFilePath}" target="_blank">Github</a>`,
  manifest: {
    name: 'Docbook',
    short_name: 'Docbook',
    display: 'standalone',
    start_url: '/',
    theme_color: '#000',
    background_color: '#000',
    icons: [
      {
        src: 'assets/doc144.png',
        sizes: '144x144',
        type: 'image/png',
      },
    ],
  },
};
```

## 其他

1. PWA 所需图片大小

`Android`:

```
icon-72x72
icon-96x96
icon-128x128
icon-144x144
icon-152x152
icon-192x192
icon-384x384
icon-512x512
```

`iOS`:

```
icon-120x120
icon-180x180
```
