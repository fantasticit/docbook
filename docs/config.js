export default {
  title: 'docbook',
  logo: 'Docbook',
  port: 4000,
  github: "https://github.com/fantasticit/docbook",
  js: ["https://s2.ssl.qhres.com/!f868948f/vue.min.js"],
  toc: true,
  navs: [
    {
      title: '首页',
      path: '/index'
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
  renderFooter: (buildTime, relativeFilePath) => `Bulid at ${buildTime}, Modify on <a href="https://github.com/fantasticit/docbook/tree/main${relativeFilePath}" target="_blank">Github</a>` 
}
