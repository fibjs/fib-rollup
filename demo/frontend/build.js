const { resolveFromCurdir, isDebugDemo } = require('../_utils')

const {default: rollup, fibjsResolve} = require('../../')

const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')

const bundle = await rollup.rollup({
    input: resolveFromCurdir(__dirname)('./index.js'),
    external: ['coroutine'],
    plugins: [
        fibjsResolve({
            browser: true
        }),
        buble(),
        commonjs()
    ]
});

isDebugDemo() && console.log('========generating==========');

await bundle.write({
    file: resolveFromCurdir(__dirname)('./dist/bundle.js'),
    format: 'umd',
    name: 'frontend'
});
