const fs = require('fs')

const {default: rollup, fibjsResolve} = require('../../')

const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')

const fn = async () => {
    const bundle = await rollup.rollup({
        input: './index.js',
        external: ['coroutine'],
        plugins: [
            fibjsResolve({
                browser: true
            }),
            buble(),
            commonjs()
        ]
    });
    
    console.log('========generating==========');
    
    await bundle.write({
        file: './dist/bundle.js',
        format: 'umd',
        name: 'frontend'
    });
}

fn()