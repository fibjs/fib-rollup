Object.defineProperty(exports, "__esModule", { value: true });
var vbox_1 = require("./vbox");
exports.vbox = vbox_1.default;
exports.recommendedVBoxModules = vbox_1.recommendedVBoxModules;
exports.recommendedVBoxModuleFallback = vbox_1.recommendedVBoxModuleFallback;
exports.getCustomizedVBox = vbox_1.getCustomizedVBox;
const _1 = require("./");
exports.fibjsResolve = require('./resolve');
exports.default = _1.vbox.require('rollup', __dirname);
