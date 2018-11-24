import { getCustomizedVBox } from "../utils/vbox";

function requireAsPlain (buf: Class_Buffer) {
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

export default function resolveId(importee: string, options: FibRollupResolve.RollupPluginFibjsResolve_InternalResolveOptions, cb: FibRollupResolve.ResolveIdCallback) {
    const vbox = makeResolveBox(options.extensions)
    const resolvedPath = vbox.resolve(importee, options.basedir)

    cb(null, resolvedPath)
}