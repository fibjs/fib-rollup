import path = require('path');
import vm = require('vm');

import PatchedModule from '../patched-module'

export const builtinModules = require('@fibjs/builtin-modules')
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

export function recommendedVBoxModuleFallback (name: string) {
    if (builtinModules.includes(name)) {
        return require(name)
    }
}

export function getCustomizedVBox (myModules: any = {}, myFallback: Function = recommendedVBoxModuleFallback) {
    return new vm.SandBox(
        {
            ...recommendedVBoxModules,
            ...myModules
        },
        myFallback
    )
}

export function getVueSsrVBox (myModules: any = {}, myFallback: Function = recommendedVBoxModuleFallback, opts: any = {}) {
    const vbox = new vm.SandBox(
        {
            ...recommendedVBoxModules,
            ...myModules
        },
        myFallback
    )

    const { env = {} } = opts || {}

    vbox.addScript('__VUE_NODE_ENV__', `process.env.NODE_ENV="${env.NODE_ENV || 'development'}";` as any)
    vbox.run(path.resolve(__dirname, '../snippets/vue-ssr.js'))

    return vbox
}