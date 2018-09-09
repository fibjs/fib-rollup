/// <reference path="../../@types/resolve-id.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
function resolveId(importee, options, cb) {
    const resolvedPath = __1.vbox.resolve(importee, options.basedir);
    cb(null, resolvedPath);
}
exports.default = resolveId;
