const fs = require('fs')
const path = require('path')
const rmdirr = require('@fibjs/rmdirr')

const {getVueSsrVBox} = require('../').utils.vbox

exports.getDebugPrefix = function (demopath = '') {
    return `[fib-rollup:${demopath}]`
}

exports.resolveFromDemoSrc = function (demopath = '') {
    return path.resolve(__dirname, demopath)
}

exports.resolveFromCurdir = function (dirname = __dirname) {
    return (demopath = '') => {
        return path.resolve(dirname, demopath)
    }
}

exports.isDebugDemo = function () {
    return !!process.env.DEBUG_DEMO
}

exports.getVueSSRInstance = function () {
    return getVueSsrVBox().require('vue-server-renderer', __dirname)
}

exports.cleanDist = function () {
    if (process.env.FIB_ROLLUP_DEBUG_NO_CLEAN) return ;
    
    const base = __dirname
    
    fs.readdir(__dirname).forEach(dirname => {
        rmdirr(path.resolve(base, dirname, './dist'))
    })
}
