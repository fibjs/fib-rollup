const vm = require('vm');
const util = require('util');
const builtinModules = util.buildInfo().modules

import PatchedModule from '../patched-module'

export const vbox = new vm.SandBox(
    {
        path: require('path'),
        fs: require('fs'),
        events: require('events'),
        util: require('util'),
        crypto: require('crypto'),
        buffer: require('buffer'),
        // constants: {},
        module: PatchedModule,
        'builtin-modules': builtinModules
    }
);

export default vbox