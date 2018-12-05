const fibTypify = require('fib-typify')

const vbox = fibTypify.generateLoaderbox()

module.exports = vbox.require('./src', __dirname)
