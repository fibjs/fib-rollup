const path = require('path');
const { default: rollup, plugins } = require('../../../lib')


const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.js'),
    external: ['coroutine'],
    plugins: [
        {
            renderChunk () {
                return 'module.exports = 123'
            }
        }
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
