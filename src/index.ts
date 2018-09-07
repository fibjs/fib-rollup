export {
    default as vbox,
    recommendedVBoxModules,
    recommendedVBoxModuleFallback,
    getCustomizedVBox
} from './vbox'

import { vbox } from './'

export const fibjsResolve = require('./resolve')

export default vbox.require('rollup', __dirname);