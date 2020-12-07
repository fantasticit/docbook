const { escape } = require('scapegoat');
const uslug = require('uslug');
const uslugify = (s) => uslug(s);
// 避免 vue 语法报错
const transform = (source) => {
  let str = String(source);
  const reg = /(?<={{)(.|\S)*?(?=\}\})/;
  let matches = null;
  while ((matches = reg.exec(str)) !== null) {
    const text = matches[0];
    const index = matches.index;
    str =
      str.substring(0, index - 2) + '({({' + text + '})})' + str.substring(index + text.length + 2);
  }
  return str;
};

module.exports = {
  loader: 'vue-md-loader',
  options: {
    live: false,
    plugins: [
      [
        require('markdown-it-anchor'),
        {
          permalink: true,
          permalinkSymbol: '',
          slugify: uslugify,
        },
      ],
      [
        require('markdown-it-container'),
        'demo',
        {
          validate(params) {
            return new RegExp('demo').test(params.trim());
          },
          // 将捕获的代码块装进自定义组件block-demo中
          render(tokens, idx) {
            if (tokens[idx].nesting === 1) {
              let tip = tokens[idx].info;
              tip = tip.replace('demo', '').trim();

              let str1 = tokens[idx + 1];
              let str2 = tokens[idx + 2];
              let str3 = tokens[idx + 3];
              const arr = [str1, str2, str3];

              const find = (type) => {
                const target = arr.find((t) => t && t.info.toLowerCase() === type.toLowerCase());
                return (target && target.content) || '';
              };

              const js = find('js') || find('javascript');
              const css = find('css');
              const html = find('html');

              return `<block-demo tip="${tip}" js="${escape(js)}" css="${escape(
                css
              )}" html="${transform(escape(html))}">`;
            }
            return '</block-demo>';
          },
        },
      ],
    ],
    afterProcess(vueFile) {
      // 移除注释
      return vueFile.trim();
    },
    afterProcessLiveTemplate(template) {
      return `<div class="block-demo__live">${template}</div>`;
    },
  },
};
