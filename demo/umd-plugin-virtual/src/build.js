const fs = require('fs');
const util = require('util');
const path = require('path');
const { default: rollup, plugins } = require('../../../lib')

const commonjs = require('rollup-plugin-commonjs');
const buble = require('rollup-plugin-buble');
const virtual = require('rollup-plugin-virtual');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: [].concat(require('@fibjs/builtin-modules')),
    plugins: [
        virtual({
            foo: fs.readTextFile( path.resolve(__dirname, './virmodule.foo.ts' ) ),
            'bar.js': fs.readTextFile( path.resolve(__dirname, './virmodule.bar.ts') ),
        }),
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
