var cleanDist = require('../_utils').cleanDist

var registerTsCompiler = require('fib-typify').registerTsCompiler

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-plugin-virtual', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:virtual', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        // used to be compared
        var foo = sb.require('./src/virmodule.foo', __dirname).default
        var bar = sb.require('./src/virmodule.bar', __dirname).default

        assert.equal(Object.values(sb.modules).find(x => x.default === foo).default, foo)
        assert.equal(Object.values(sb.modules).find(x => x.default === bar).default, bar)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}