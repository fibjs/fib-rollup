Object.defineProperty(exports, "__esModule", { value: true });
const vm = require("vm");
const util = require("util");
const patched_module_1 = require("../patched-module");
const buildInfo = util.buildInfo();
exports.builtinModules = buildInfo.modules;
exports.recommendedVBoxModules = {
    fs: require('fs'),
    path: require('path'),
    events: require('events'),
    util: Object.assign({ deprecate: require('util-deprecate/browser') }, require('util')),
    crypto: require('crypto'),
    buffer: require('buffer'),
    module: patched_module_1.default,
    'builtin-modules': exports.builtinModules
};
function recommendedVBoxModuleFallback(name) {
    if (exports.builtinModules.includes(name)) {
        return require(name);
    }
}
exports.recommendedVBoxModuleFallback = recommendedVBoxModuleFallback;
function getCustomizedVBox(myModules, myFallback = recommendedVBoxModuleFallback) {
    return new vm.SandBox(Object.assign({}, exports.recommendedVBoxModules, myModules), myFallback);
}
exports.getCustomizedVBox = getCustomizedVBox;
exports.vbox = getCustomizedVBox({}, recommendedVBoxModuleFallback.bind(this));
exports.default = exports.vbox;
