const util = require('util');
const path = require('path');
const { default: rollup, plugins } = require('../../../lib')

const commonjs = require('rollup-plugin-commonjs');
const graph = require('rollup-plugin-graph');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: [].concat(util.buildInfo().modules),
    plugins: [
        graph({prune: true}),
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
    file: path.resolve(__dirname, '../dist/bundle.js'),
    format: 'umd',
    name: 'simple'
}).catch(e => console.error(e));

// console.log('========written==========');
