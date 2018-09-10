const fs = require('fs')
const path = require('path')
const rmdirr = require('@fibjs/rmdirr')

const {getCustomizedVBox} = require('../')

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
    return getCustomizedVBox().require('vue-server-renderer', __dirname)
}

exports.cleanDist = function () {
    const base = __dirname
    
    fs.readdir(__dirname).forEach(dirname => {
        rmdirr(path.resolve(base, dirname, './dist'))
    })
}