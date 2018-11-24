var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-iplugin-uglify-js', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('iplugin:uglify-js', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.property(bundle, 'foo')
        assert.property(bundle, 'bar')
        assert.equal(bundle.bar(), bundle.foo)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}