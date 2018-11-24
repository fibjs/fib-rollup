var cleanDist = require('../_utils').cleanDist

var registerTsCompiler = require('fib-typify').registerTsCompiler

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-plugin-alias', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:alias', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.equal(bundle.a, 'a')
        assert.equal(bundle.b, 'b')
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}