const fs = require('fs');
const util = require('util');
const path = require('path');
const { default: rollup, fibjsResolve } = require('../../')

const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: [].concat(util.buildInfo().modules),
    plugins: [
        alias({
            '@': './alias',
            resolve: ['.ts']
        }),
        fibjsResolve(),
        commonjs()
    ]
}).catch(e => console.error(e));

// console.log('========generating==========');

const {
    code,
    map
} = await bundle.generate({
    file: path.resolve(__dirname, './dist/bundle.js'),
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
