const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');

;[
    './babelrc',
    './default'
].forEach(async basedir => {
    const bundle = await rollup.rollup({
        input: path.resolve(__dirname, basedir, './index.js'),
        external: ['coroutine'],
        plugins: [
            plugins['rollup-plugin-fibjs-resolve'](),
            plugins['rollup-plugin-babel-standalone'](),
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
        name: 'bableStandaloneTest'
    }).catch(e => console.error(e.stack));

    // console.log('========generated==========');

    // console.log('========writing==========');

    await bundle.write({
        file: path.resolve(__dirname, `./dist/${basedir}/bundle.js`),
        format: 'umd',
        name: 'bableStandaloneTest'
    }).catch(e => console.error(e.stack));

    // console.log('========written==========');
})
