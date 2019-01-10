var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-custom-plugin-1', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    it('custom-plugin-1', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.isNumber(bundle)

        assert.equal(bundle, 123)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}
