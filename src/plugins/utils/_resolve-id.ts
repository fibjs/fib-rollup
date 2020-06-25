/// <reference lib="es2016" />

import { getCustomizedVBox } from "../../utils/vbox";

function requireAsPlain (buf: Class_Buffer) {
    return JSON.stringify(buf + '')
}

export function makeResolveBox (extensions) {
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