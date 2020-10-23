# docbook

[website](https://docbook.vercel.app/)

`docbook` 致力于静态文档站快速生成。

- 强约定使用 `docs` 下文件生成文档
- 默认支持 `Service Work`
- 支持 `PWA`，通过 `config.manifest` 配置

## 安装

### 全局安装

```shell
npm i -g @fantasticit/docbook
```

### 项目中使用

```shell
npm i -D @fantasticit/docbook
```

在项目中撰写 `docs` 内容，在 `package.json` 中加入如下 `scripits`。

```json
{
  "doc:dev": "docbook dev",
  "doc:build": "docbook build"
}
```

执行 `npm run doc:dev` 即可打开文档站。

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

## 文档撰写

`docbook` 支持 `.vue` 和 `.md` 两种格式文档。支持属性如下：

- `title`: 文件名称配置，字符串
- `index`: 文件索引，数字

### `.vue` 格式

在 vue 文件 `script` 部分添加 `title` 和 `index` 属性配置形如：

```vue
<template></template>

<script>
export default {
  title: '文档',
  index: 0,
};
</script>

<style lang="scss" scoped></style>
```

### `.md` 格式

在 md 文件中添加 `title` 和 `index` 属性配置形如：

```md
---
title: '文档'
index: 1
---

<!-- 以下为正文 -->
```
