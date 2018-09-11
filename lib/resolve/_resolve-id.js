/// <reference path="../../@types/resolve-id.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
function resolveId(importee, options, cb) {
    const _vbox = options.vbox || __1.vbox;
    try {
        const resolvedPath = _vbox.resolve(importee, options.basedir);
        cb(null, resolvedPath);
    }
    catch (e) {
        console.error(`resolveId Error when trying to import ${importee} on ${options.basedir}\n`, e.stack);
    }
}
exports.default = resolveId;
