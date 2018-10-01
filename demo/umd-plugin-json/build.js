const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        json(),
        plugins['rollup-plugin-fibjs-resolve'](),
        commonjs()
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
