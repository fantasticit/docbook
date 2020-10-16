const { escape } = require('scapegoat')

module.exports = {
  loader: 'vue-md-loader',
  options: {
    plugins: [
      [
        require('markdown-it-container'),
        'demo',
        {
          validate(params) {
            return new RegExp('demo').test(params.trim())
          },
          // 将捕获的代码块装进自定义组件block-demo中
          render(tokens, idx) {
            if (tokens[idx].nesting === 1) {
              let tip = tokens[idx].info
              tip = tip.replace('demo', '').trim()

              let source = tokens[idx + 1].content

              return `<block-demo tip="${tip}" source="${escape(source)}">`
            }
            return '</block-demo>'
          }
        }
      ]
    ],
    afterProcess(vueFile) {
      // 移除注释
      return vueFile.trim()
    },
    afterProcessLiveTemplate(template) {
      return `<div class="block-demo__live">${template}</div>`
    }
  }
}
