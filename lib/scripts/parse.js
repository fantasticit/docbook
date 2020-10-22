const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml');
const nunjucks = require('nunjucks')
const { docsPath, outputSrc, extensions } = require('./resolve')

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
`

/**
 * 提取文件 meta 信息
 * 拷贝文件到源文件输出目录
 * @param {*} file 
 */
const parseFile = (file) => {
  const content = fs.readFileSync(file, 'utf-8')
  let yamlstr = ''
  let outputContent = ''

  if (/\.vue$/.test(file)) {
    // 匹配 vue 导出属性
    const reg = /(?<=\<script\>(.|\s)*?\{)(.|\s)*?(?=(data|methods|props|component|watch|extend|computed))/
    const js = content.match(reg)
    yamlstr = js && js[0].replace(/,/g, '') || ''
    outputContent = content
  } else {
    // 匹配 ---text---- 内容
    const matches = content.match(/(?<=---)(.|\s)*?(?=---)/)
    yamlstr = matches && matches[0] || ''
    outputContent = content.replace(/---(.|\s)*?---/, '')
  }

  let meta = {}
  
  try {
    meta = yaml.load(yamlstr)
  } catch (e) {}

  return { meta, outputContent }
}

/**
 * 路由排序
 * @param {*} a 
 * @param {*} b 
 */
const sort = (a, b) => a.index && b.index ? a.index - b.index : 0

/**
 * 重定向路由注入
 * @param {*} routes 
 */
const genRedirect = routes => {
  if (!Array.isArray(routes) || !routes[0]) return
  if (routes[0].redirect) return

  const target = routes.find(route => !Array.isArray(route.children) && route.path)

  if (target) {
    routes.unshift({ title: '', path: '', redirect: target.path })
  }
}

/**
 * 解析文件生成路由
 * @param {*} dir 
 */
function read(dir){
  const dirOrFiles = fs.readdirSync(dir, 'utf-8')

  const routes = dirOrFiles.reduce((ret, dirOrFile) => {
    const abspath = path.join(dir, dirOrFile)
    const dirname = abspath.split(path.sep).pop()
    const isdir = fs.statSync(abspath).isDirectory()

    if (abspath === outputSrc) {
      return ret
    }

    if (isdir) {
      const children = read(abspath, dirname)
      let first = children.find(item => item.title)
      let tmp = {
        path: dirname,
        title: first ? first.title : '',
        children
      }
      genRedirect(children)
      ret.push(tmp)
    } else {
      const ext = path.extname(abspath)

      if (extensions.includes(ext)) {
        const { meta, outputContent } = parseFile(abspath)
        // 重新生成符合的格式文件
        const output = path.join(outputSrc, abspath.replace(docsPath, ''))
        fs.ensureFileSync(output)
        fs.writeFileSync(output, outputContent)

        ret.push({
          path: path.basename(abspath).replace(ext, ''),
          file: output,
          component: () => import(abspath),
          meta,
          ...meta
        })
      } else {
        // 其他文件拷贝
        const output = path.join(outputSrc, abspath.replace(docsPath, ''))
        fs.copyFileSync(abspath, output)
      }
    }

    return ret
  }, []).sort(sort)

  genRedirect(routes)

  return routes
}

const write = (content) => {
  fs.writeFileSync(path.join(outputSrc, 'routes.js'), `export default ${content}`)
}

exports.parse = function parse() {
  fs.ensureDirSync(outputSrc)
  const routes = read(docsPath)
  write(nunjucks.renderString(template, { routes }))
}