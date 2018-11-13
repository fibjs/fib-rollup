/// <reference path="../../@types/resolve-id.d.ts" />

import { getCustomizedVBox } from "../vbox";

// import * as path from 'path'
// import * as vm from 'vm'

interface ResolveIdCallback {
    (err: Error, code: string): void
}

function requireAsPlain (buf: Class_Buffer, info) {
    return JSON.stringify(buf + '')
}

function makeResolveBox (extensions) {
    const vbox = getCustomizedVBox({})

    if (Array.isArray(extensions)) {
        extensions = extensions.filter(ext => {
            return !['.js', '.json', '.jsc'].includes(ext)
        })
        
        extensions.forEach(ext => {
            // just make vbox can resolve extension
            vbox.setModuleCompiler(ext, requireAsPlain.bind(this))
        })
    }

    return vbox
}

export default function resolveId(importee: string, options: RollupPluginFibjsResolve_InternalResolveOptions, cb: ResolveIdCallback) {
    const vbox = makeResolveBox(options.extensions)
    const resolvedPath = vbox.resolve(importee, options.basedir)

    cb(null, resolvedPath)
}