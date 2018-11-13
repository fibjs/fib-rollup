var cleanDist = require('../_utils').cleanDist

var registerTsCompiler = require('fib-typify').registerTsCompiler

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../')

describe('umd-plugin-buble', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:buble', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.isFunction(bundle.foo)

        assert.equal(bundle.bar_constant, 123)
        assert.equal(bundle.bar_let, 123)
        assert.equal(bundle.bar_var, 123)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}