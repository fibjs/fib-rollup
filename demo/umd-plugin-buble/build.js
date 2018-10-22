const path = require('path');
const { default: rollup, plugins } = require('../../')

const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.js'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        buble(),
        commonjs(),
        plugins['rollup-plugin-uglify-js']()
    ]
}).catch(e => console.error(e.stack));

// console.log('========generating==========');

const {
    code,
    map
} = await bundle.generate({
    format: 'umd',
    name: 'bubleTest'
}).catch(e => console.error(e.stack));

// console.log('========generated==========');

// console.log('========writing==========');

await bundle.write({
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'umd',
    name: 'bubleTest'
}).catch(e => console.error(e.stack));

// console.log('========written==========');
