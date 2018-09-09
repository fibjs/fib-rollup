const path = require('path')
const { compile } = require('./build')

function _resolve (filepath) {
  return path.resolve(__dirname, './', filepath)
}

function _compile (widget_name) {
  compile(_resolve(`./components/${widget_name}/index.js`), _resolve(`./dist/${widget_name}/index.js`), widget_name)
}

_compile('test')

