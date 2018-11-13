const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        // require('rollup-plugin-buble')(),
        plugins['rollup-plugin-fibjs-resolve']({
            extensions: ['.js', '.ts']
        }),
        typescript({
            typescript: require('typescript'), 
            tslib: require('tslib'), 
        }),
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
