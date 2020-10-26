const fs = require('fs-extra')
const path = require('path')
const rootPath = process.cwd()
const docsPath = path.join(rootPath, 'docs')

if (!fs.existsSync(docsPath)) {
  throw new Error('No docs folder find in ' + process.cwd())
}

let configPath = path.join(docsPath, 'config.js') // 配置文件
const outputSrc = path.join(docsPath, '.docbook') // 源文件生成路径
const routesPath = path.join(outputSrc, 'routes.js')

let config = {}

if (fs.existsSync(configPath)) {
  config = require('./esmodule-require')(configPath)
} else {
  configPath = ''
}

if (!config.icon) {
  config.icon = 'assets/favicon.ico'
  config.loadDefaultFavicon = true
}


exports.extensions = ['.vue', '.md']
exports.rootPath = rootPath
exports.docsPath = docsPath
exports.configPath = configPath
exports.routesPath = routesPath
exports.config = config
exports.port = config.port || 9090
exports.outputSrc = outputSrc
exports.outputDir = path.join(process.cwd(), config.outputDir || 'docs-build') // 编译输出路径
