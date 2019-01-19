const coroutine = require('coroutine')
const hash = require('hash')

function md5(content: string = '') {
    return hash['md5'](content).digest().hex()
}

import { transform } from './utils/uglify-transform'

export default function rollupPluginUglifyJS(userOptions = {}) {
    const minifierOptions = {
        ...userOptions
    }

    const evs = {}

    return {
        name: 'rollup-plugin-uglify-js',

        // renderStart() { // console.log('renderStart') },
      
        renderChunk(code) {
            const hash = md5(code)

            let result = null, err = null
            let ev = evs[hash]

            if (!ev) {
                ev = evs[hash] = new coroutine.Event()
                coroutine.start(() => {
                    result = transform(code, minifierOptions)
                    ev.set()
                    delete evs[hash]
                })
            }

            return new Promise(function (resolve, reject) {
                ev.wait()

                if (err) {
                    reject(err)
                }

                resolve(result.code)
            });
        },
      
        // generateBundle() { // console.log('generateBundle') },
      
        renderError(err) {
            console.log('[fib-rollup.plugins.rollup-plugin-uglify-js]renderError', err)
        }
    }
}
