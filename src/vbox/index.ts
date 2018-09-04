const vm = require('vm');
const util = require('util');
const builtinModules = util.buildInfo().modules

import PatchedModule from '../patched-module'

export const vbox = new vm.SandBox(
    {
        path: require('path'),
        fs: require('fs'),
        events: require('events'),
        util: {
            deprecate: require('util-deprecate/browser'),
            ...require('util'),
        },
        crypto: require('crypto'),
        buffer: require('buffer'),
        // constants: {},
        module: PatchedModule,
        'builtin-modules': builtinModules
    },
    (name) => {
        if (builtinModules.includes(name)) {
            return require(name)
        }
    }
);

export default vbox