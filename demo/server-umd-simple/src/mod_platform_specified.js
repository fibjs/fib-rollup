let gui = null

if (process.platform === 'win32') {
    gui = require('gui')
}

export default gui