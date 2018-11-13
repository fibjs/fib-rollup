var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../')

describe('fe-pplugin-postcss', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:json', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}