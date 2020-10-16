const fs = require('fs-extra')
const path = require('path')
const docsPath = path.join(process.cwd(), 'docs')
const docsConfigPath = path.join(process.cwd(), 'docs', 'config.js')

if (!fs.existsSync(docsPath)) {
  throw new Error('No docs folder find in ' + process.cwd())
}

if (!fs.existsSync(docsConfigPath)) {
  throw new Error('No config.js find in docs folder in' + process.cwd())
}

exports.docsPath = docsPath
exports.docsConfigPath = docsConfigPath
exports.config = require('./esmodule-require')(docsConfigPath)
exports.port = exports.config.port || 9090
exports.outputDir = path.join(process.cwd(), 'docs-build')
