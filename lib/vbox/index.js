Object.defineProperty(exports, "__esModule", { value: true });
const vm = require('vm');
const util = require('util');
const builtinModules = util.buildInfo().modules;
const patched_module_1 = require("../patched-module");
exports.vbox = new vm.SandBox({
    path: require('path'),
    fs: require('fs'),
    events: require('events'),
    util: require('util'),
    crypto: require('crypto'),
    buffer: require('buffer'),
    // constants: {},
    module: patched_module_1.default,
    'builtin-modules': builtinModules
});
exports.default = exports.vbox;
