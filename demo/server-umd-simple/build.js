const builtinModules = require('@fibjs/builtin-modules');
const path = require('path');
const { default: rollup, plugins } = require('../../lib')

const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './src/index.js'),
    external: builtinModules,
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
    format: 'cjs',
}).catch(e => console.error(e));

// console.log('========generated==========');

// console.log('========writing==========');

await bundle.write({
    format: 'cjs',
    file: path.resolve(__dirname, './dist/bundle.js'),
}).catch(e => console.error(e));

// console.log('========written==========');
