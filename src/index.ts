export {
    default as vbox,
    recommendedVBoxModules,
    recommendedVBoxModuleFallback,
    getCustomizedVBox
} from './vbox'

import { vbox } from './'

export { default as plugins } from './plugins'
export const fibjsResolve = require('./').plugins['rollup-plugin-fibjs-resolve']

export default vbox.require('rollup', __dirname);
