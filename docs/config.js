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
  renderFooter: (buildTime, relativeFilePath) => `Bulid at ${buildTime}, Modify on <a href="https://github.com/fantasticit/docbook/tree/main${relativeFilePath}" target="_blank">Github</a>` ,
  manifest: { 
    "name" : "Docbook" , 
    "short_name" : "静态文档生成" , 
    "display" : "standalone" , 
    "start_url" : "/" , 
    "theme_color" : "#000" , 
    "background_color" : "#000" , 
    "icons" : [
      {
        "src": "assets/doc16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "assets/doc32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "assets/doc48.png",
        "sizes": "48x48",
        "type": "image/png"
      },
      {
        "src": "assets/doc64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "assets/doc128.png",
        "sizes": "128x128",
        "type": "image/png"
      }
    ]
  }  
}
