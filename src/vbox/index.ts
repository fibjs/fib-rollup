import vm = require('vm');
import util = require('util');

import PatchedModule from '../patched-module'

export const builtinModules = util.buildInfo().modules
export const recommendedVBoxModules = {
    fs: require('fs'),
    path: require('path'),
    events: require('events'),
    util: {
        deprecate: require('util-deprecate/browser'),
        ...require('util'),
    },
    crypto: require('crypto'),
    buffer: require('buffer'),
    module: PatchedModule,
    'builtin-modules': builtinModules
}

export function recommendedVBoxModuleFallback (name) {
    if (builtinModules.includes(name)) {
        return require(name)
    }
}

export function getCustomizedVBox (myModules: any, myFallback: Function = recommendedVBoxModuleFallback) {
    return new vm.SandBox(
        {
            ...recommendedVBoxModules,
            ...myModules
        },
        myFallback
    )
}

export const vbox = getCustomizedVBox({}, recommendedVBoxModuleFallback.bind(this))

export default vbox