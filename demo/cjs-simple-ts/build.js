const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        commonjs()
    ]
}).catch(e => console.error(e));

// console.log('========generating==========');

const {
    code,
    map
} = await bundle.generate({
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'cjs',
    name: 'simpleTs'
}).catch(e => console.error(e));

// console.log('========generated==========');

// console.log('========writing==========');

await bundle.write({
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'cjs'
}).catch(e => console.error(e));

// console.log('========written==========');
