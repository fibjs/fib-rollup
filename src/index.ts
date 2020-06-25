/// <reference types="@fibjs/types" />

import { getCustomizedVBox } from './utils/vbox'

export { default as plugins } from './plugins'
export { default as utils } from './utils'

const fibRollup: typeof import('rollup') = getCustomizedVBox({
    /**
     * used by
     * - internal plugin 'buble'
     */
    acorn: require('acorn')
}).require('rollup', __dirname)

export default fibRollup
