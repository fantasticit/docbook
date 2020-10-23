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
- `navs`: 文档站头部导航，形如：`[{title: '首页', path: '/home' },]`
- `renderFooter`: 正文底部渲染函数，注意类型是函数，不配置不渲染底部

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
};
```
