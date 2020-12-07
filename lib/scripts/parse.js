const fs = require('fs-extra');
const url = require('url');
const path = require('path');
const yaml = require('js-yaml');
const nunjucks = require('nunjucks');
const pinyin = require('pinyin');
const { rootPath, docsPath, outputSrc, extensions, config: docConfig } = require('./resolve');

function winPath(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

const template = `
{% macro renderRoute(route) %}
{
    "title": "{{ route.title }}",
    "path": "{{ route.path }}",
    {% if route.redirect %}
    "redirect": "{{ route.redirect }}",
    {% endif %}
    {% if route.file %}
    "component": () => import("{{ route.file }}"),
    {% endif %}
    {% if route.children %}
    "children": [
        {% for item in route.children %}
            {{ renderRoute(item) }}
        {% endfor %}
    ]
    {% endif %}
    {% if route.meta %}
    "meta": {{ route.meta | dump | safe }}
    {% endif %}
},
{% endmacro %}
[
{% for item in routes %}
  {{ renderRoute(item) }}
{% endfor %}
]
`;

/**
 * 提取文件 meta 信息
 * 拷贝文件到源文件输出目录
 * @param {*} file
 */
const parseFile = (file) => {
  const content = fs.readFileSync(file, 'utf-8');
  let yamlstr = '';
  let outputContent = '';

  if (/\.vue$/.test(file)) {
    // 匹配 vue 导出属性
    const reg = /(?<=\<script\>(.|\s)*?\{)(.|\s)*?(?=(data|methods|props|component|watch|extend|computed))/;
    const js = content.match(reg);
    yamlstr = (js && js[0].replace(/,/g, '')) || '';
    outputContent = content;
  } else {
    // 匹配 ---text---- 内容
    const matches = content.match(/(?<=---)(.|\s)*?(?=---)/);
    yamlstr = (matches && matches[0]) || '';
    outputContent = content.replace(/---(.|\s)*?---/, '');
  }

  let meta = {};

  try {
    meta = yaml.load(yamlstr);
  } catch (e) {}

  return { meta: typeof meta === 'object' ? meta : {}, outputContent };
};

/**
 * 路由排序
 * @param {*} a
 * @param {*} b
 */
const sort = (a, b) => (a.index && b.index ? a.index - b.index : 0);

/**
 * 重定向路由注入
 * @param {*} routes
 */
const genRedirect = (routes, parentPath = '') => {
  if (!Array.isArray(routes)) return;
  if (routes[0] && routes[0].redirect) return;

  const indexPathes = ['index', 'home'].map((sub) => url.resolve(parentPath, sub));

  const target =
    routes.find((route) => {
      if (!route.title) return false;
      return indexPathes.includes(route.path);
    }) || routes.find((route) => route.title && route.path);

  if (target) {
    routes.unshift({ title: '', path: '', redirect: target.path });
  }
};

/**
 * 解析文件生成路由
 * @param {*} dir
 */
function read(dir) {
  const dirOrFiles = fs.readdirSync(dir, 'utf-8');

  const routes = dirOrFiles
    .reduce((ret, dirOrFile) => {
      const abspath = path.join(dir, dirOrFile);
      const output = path.join(outputSrc, abspath.replace(docsPath, ''));
      const dirname = abspath.split(path.sep).pop();
      const isdir = fs.statSync(abspath).isDirectory();

      if (abspath === outputSrc) return ret;

      if (dirOrFile === 'assets') {
        fs.copySync(abspath, output);
        return ret;
      }

      if (isdir) {
        const children = read(abspath, dirname);
        const configPath = path.join(abspath, 'config.yaml');
        let title = '';
        let route = dirname;

        if (fs.existsSync(configPath)) {
          const config = yaml.load(fs.readFileSync(configPath, 'utf-8'));
          title = config.title || title;
          route = config.path || route;
        } else {
          let first = children.find((item) => item.title);
          title = (first && first.title) || title;
        }

        let tmp = {
          path: route,
          title,
          children,
        };

        genRedirect(children, route);
        ret.push(tmp);
      } else {
        const ext = path.extname(abspath);

        if (extensions.includes(ext)) {
          const { meta, outputContent } = parseFile(abspath);
          meta.location = abspath.replace(rootPath, '');

          // 重新生成符合的格式文件
          fs.ensureFileSync(output);
          fs.writeFileSync(output, outputContent);

          ret.push({
            path: pinyin(path.basename(abspath).replace(ext, ''), {
              style: pinyin.STYLE_NORMAL,
            }).join('-'),
            file: winPath(output),
            meta,
            ...meta,
          });
        } else {
          // 其他文件拷贝
          fs.ensureFileSync(output);
          fs.copyFileSync(abspath, output);
        }
      }

      return ret;
    }, [])
    .sort(sort);

  genRedirect(routes);

  return routes;
}

const write = (content) => {
  fs.writeFileSync(path.join(outputSrc, 'routes.js'), `export default ${content}`);
};

exports.parse = function parse() {
  fs.ensureDirSync(outputSrc);
  const routes = read(docsPath);
  write(nunjucks.renderString(template, { routes }));
};
