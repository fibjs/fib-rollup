import { getCustomizedVBox } from "../vbox";

const pplugins = {}

pplugins['rollup-plugin-vue'] = getCustomizedVBox({
    prettier: {
        // no prettier
        format: (content) => content
    }
}).require('rollup-plugin-vue', __dirname).default

// pplugins['rollup-plugin-postcss'] = getCustomizedVBox({
//     constants: {},
//     'graceful-fs': {
//         ...require('fs'),
//         ensureDir (_path) {
//             const p = Promise.resolve(
//                 require('@fibjs/mkdirp')(_path)
//             ).catch(e => console.error(e.stack))

//             return p
//         }
//     }
// }).require('rollup-plugin-postcss', __dirname)

export default pplugins