const { isDebugDemo } = require('../../_utils')

const {default: rollup, plugins, utils} = require('../../../lib')

const vbox = utils.vbox.getCustomizedVBox({
  prettier: {
    format: (content) => content
  }
})
const commonjs = require('rollup-plugin-commonjs')
const VuePlugin = vbox.require('rollup-plugin-vue', __dirname)
const pugjs = require('rollup-plugin-pug')

exports.compile = async function (srcpath, targetpath, umdName = 'umdComponent') {
  const bundle = await rollup.rollup({
      input: srcpath,
      external: [
        'coroutine',
        'vue'
      ],
      plugins: [
          VuePlugin({
            css: true
          }),
          pugjs(),
          plugins['rollup-plugin-fibjs-resolve']({
              browser: true
          }),
          commonjs()
      ]
  }).catch(e => {
    console.error('[e] bundle', e.stack)
  });

  isDebugDemo() && console.log(`========generating: ${srcpath} --> ${targetpath} ==========`);

  await bundle.write({
      file: targetpath,
      format: 'umd', // 'iife'
      name: umdName,
      globals: {
        vue: 'Vue'
      }
  }).catch(e => {
    console.error('[e] write', e.stack)
  });

  isDebugDemo() && console.log(`========generated: ${srcpath} --> ${targetpath} ==========`);
}
