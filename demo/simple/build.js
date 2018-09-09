const {default: rollup, vbox} = require('../../')

const commonjs = require('rollup-plugin-commonjs');
const resolve = vbox.require('rollup-plugin-node-resolve', __dirname);

const bundle = await rollup.rollup({
    input: './index.js',
    external: ['coroutine'],
    plugins: [
        resolve(),
        commonjs()
    ]
});

// console.log('==================');

const {
    code,
    map
} = await bundle.generate({
    file: './dist/bundle.js',
    format: 'cjs'
});

await bundle.write({
    file: './dist/bundle.js',
    format: 'cjs'
});