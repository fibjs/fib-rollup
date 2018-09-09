const {default: rollup, fibjsResolve, getCustomizedVBox} = require('../../')

const vbox = getCustomizedVBox({
  prettier: {
    format: (content) => content
  }
})
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const vuePlugin = vbox.require('rollup-plugin-vue', __dirname).default
const pugjs = require('rollup-plugin-pug')

exports.compile = async function (srcpath, targetpath, umdName = 'umdComponent') {
  const bundle = await rollup.rollup({
      input: srcpath,
      external: [
        'coroutine',
        'vue'
      ],
      plugins: [
          vuePlugin({
            css: true,
            style: {
              trim: true
            }
          }),
          pugjs(),
          buble(),
          fibjsResolve({
              browser: true
          }),
          commonjs()
      ]
  }).catch(e => {
    console.log('[e] bundle', e, e.stack)
  });

  console.log(`========generating: ${srcpath} --> ${targetpath} ==========`);

  await bundle.write({
      file: targetpath,
      format: 'umd', // 'iife'
      name: umdName,
      globals: {
        vue: 'Vue'
      }
  }).catch(e => {
    console.log('[e] write', e, e.stack)
  });

  console.log(`========generated: ${srcpath} --> ${targetpath} ==========`);
}