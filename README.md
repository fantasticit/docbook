# docbook

<img src="./assets/doc.png" width="50%">

`docbook` 致力于静态文档站快速生成。

- 零配置撰写文档站，无需关心 webpack 配置
- 强约定使用 `docs` 下文件生成文档

### 安装

#### 全局安装

```shell
npm i -g @fantasticit/docbook
```

#### 项目中使用

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

[注意] 需要在 `docs` 内编写 `config.js`，具体配置如下：

- `icon`: favicon 配置
- `title`: 文档站标题
- `logo`: Logo 配置，支持 HTML 字符串
- `js`: 需要额外注入的 js 资源地址，形如：`["https://www.qcharts.cn/qcharts.js"]`
- `navs`: 文档站头部导航，形如：`[{title: '首页', path: '/home' },]`
- `routes`: `vue-router` 路由配置
- `port`: 本地开发端口，默认 `9090`
- `debug`: 是否开启调试模式，默认 `false`
- `outputDir`: 文档编译输出目录，默认 `docs-build`
