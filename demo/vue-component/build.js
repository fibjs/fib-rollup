const { compile } = require('./compile')
const { resolveFromCurdir } = require('../_utils')

function _resolve (filepath) {
  // return path.resolve(__dirname, './', filepath)
  return resolveFromCurdir(__dirname)(filepath)
}

async function _compile (widget_name) {
  await compile(
    _resolve(`./components/${widget_name}/index.js`),
    _resolve(`./dist/${widget_name}/index.js`),
    widget_name
  )
}

await _compile('test')

