var cleanDist = require('../_utils').cleanDist

var registerTsCompiler = require('fib-typify').registerTsCompiler

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-plugin-typescript', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:typescript', () => {
        require('./src/build')

        var vbox = getCustomizedVBox()
        // registerTsCompiler(vbox)
        
        var bundle = vbox.require('./dist/bundle.js', __dirname)

        assert.equal(Object.values(vbox.modules).find(x => x === bundle), bundle)

        assert.isFunction(bundle.foo)

        assert.equal(bundle.bar_constant, 123)
        assert.equal(bundle.bar_let, 123)
        assert.equal(bundle.bar_var, 123)

        assert.isObject(bundle.required)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}