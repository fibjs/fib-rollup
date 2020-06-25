/// <reference types="@fibjs/types" />

import { getCustomizedVBox } from './utils/vbox'

const fibRollup: any = {}

fibRollup.plugins = require('./plugins').default
fibRollup.utils = require('./utils').default
fibRollup.default = getCustomizedVBox().require('rollup', __dirname)

export = fibRollup
