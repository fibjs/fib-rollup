/// <reference path="../../@types/resolve-id.d.ts" />

// import * as path from 'path'
// import * as vm from 'vm'

interface ResolveIdCallback {
    (err: Error, code: string): void
}

import { vbox } from '../../'

export default function resolveId(importee: string, options: RollupPluginFibjsResolve_InternalResolveOptions, cb: ResolveIdCallback) {
    const resolvedPath = vbox.resolve(importee, options.basedir)

    cb(null, resolvedPath)
}