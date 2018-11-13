import fs = require('fs')
import path = require('path')

import { getCustomizedVBox } from "../vbox";

const pplugins = {}
let vbox = null

pplugins['rollup-plugin-vue'] = getCustomizedVBox({
    prettier: {
        // no prettier
        format: (content) => content
    }
}).require('rollup-plugin-vue', __dirname).default

// vbox = getCustomizedVBox({
//     constants: {}
//     // 'graceful-fs': {
//     //     ...require('fs'),
//     //     ensureDir (_path) {
//     //         const p = Promise.resolve(
//     //             require('@fibjs/mkdirp')(_path)
//     //         ).catch(e => console.error(e.stack))

//     //         return p
//     //     }
//     // }
// })
// vbox.addScript('temp.js', requireHackScripts('./hack_scripts/rollup-plugin-postcss.js'))

// pplugins['rollup-plugin-postcss'] = vbox.require('rollup-plugin-postcss', __dirname)

export default pplugins

function requireHackScripts(relPath) {
    return fs.readTextFile(
        path.resolve(__dirname, relPath)
    )
}