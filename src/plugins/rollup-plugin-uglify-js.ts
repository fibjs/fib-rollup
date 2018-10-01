const coroutine = require('coroutine')
const hash = require('hash')

function md5(content: string = '') {
    return hash['md5'](content).digest().hex()
}

import { transform } from './utils/uglify-transform.js'

export default function rollupPluginUglifyJS(userOptions = {}) {
    const minifierOptions = {
        ...userOptions
    }

    const fibers = {}

    return {
        name: 'rollup-plugin-uglify-js',

        // renderStart() { // console.log('renderStart') },
      
        renderChunk(code) {
            const hash = md5(code)
            let result = null
            if (!fibers[hash]) {
                fibers[hash] = coroutine.start(() => {
                    result = transform(code, minifierOptions)
                })
            }
            
            fibers[hash].join()
            delete fibers[hash]

            return result.code
        },
      
        // generateBundle() { // console.log('generateBundle') },
      
        renderError() {
            console.log('[fib-rollup.plugins.rollup-plugin-uglify-js]renderError')
        }
    }
}
