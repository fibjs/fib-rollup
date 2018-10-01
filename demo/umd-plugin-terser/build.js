const path = require('path');
const { default: rollup, plugins } = require('../../')

const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        buble(),
        commonjs(),
        terser()
    ]
}).catch(e => console.error(e));

// console.log('========generating==========');

const {
    code,
    map
} = await bundle.generate({
    format: 'umd',
    name: 'simple'
}).catch(e => console.error(e));

// console.log('========generated==========');

// console.log('========writing==========');

await bundle.write({
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'umd',
    name: 'simple'
}).catch(e => console.error(e));

// console.log('========written==========');
