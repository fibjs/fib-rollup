import util = require('util')
import fs = require('fs')
import path = require('path')

const DEFAULT_TRANSFORM_CFG = {
    presets: [
        ['es2015', { "modules": false }],
        'es2016', 'es2017',
    ]
}

export default function rollupPluginBabelStandalone(userOptions) {
    const babelStandalone = require('@babel/standalone')

    userOptions = userOptions && util.isObject(userOptions) ? userOptions : {}

    const useBabelRc = userOptions.babelrc !== false
    
    const babelRCs: any = {
        current: null,
        cwd: null,
        basedir: null, 
        get result () {
            return (babelRCs.basedir || babelRCs.cwd || babelRCs.current)
        }
    }
    if (useBabelRc) 
        babelRCs.cwd = findCwdBabelrc()
    
    return {
        name: 'rollup-plugin-babel-standalone',
        transform (code, id) {
            if (useBabelRc) 
                babelRCs.basedir = findBabelrc(path.dirname(id))

            let transformConfig = babelRCs.current = babelRCs.result ? babelRCs.result : util.extend(
                DEFAULT_TRANSFORM_CFG,
                userOptions.transformConfig
            )

            const transformed = babelStandalone.transform(code, transformConfig)
            
            return {
                code: transformed.code,
                map: transformed.map
            }
        },
      
        renderError(e) {
            console.error('[fib-rollup.plugins.rollup-plugin-babel-standalone]renderError', e && (e.stack || e.message))
        }
    }
}

function findBabelrc (basedir: string = __dirname) {
    const babelrcpath = path.resolve(basedir, '.babelrc')

    if (!fs.exists(babelrcpath)) {
        return null
    }

    return JSON.parse(fs.readTextFile(babelrcpath))
}

function findCwdBabelrc () {
    return findBabelrc(process.cwd())
}