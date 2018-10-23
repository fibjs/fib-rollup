const test = require('test')
test.setup()

const getCustomizedVBox = require('../../').getCustomizedVBox
const { cleanDist } = require('../_utils')

describe('umd-iplugin-babel-standalone', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    before(() => {
        require('./build')
    })

    it('default', () => {
        var sb = getCustomizedVBox()
        
        var bundle = sb.require('./dist/default/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.isFunction(bundle.foo)

        assert.equal(bundle.bar_constant, 123)
        assert.equal(bundle.bar_let, 123)
        assert.equal(bundle.bar_var, 123)
    })

    it('babelrc', () => {
        var sb = getCustomizedVBox()
        
        var bundle = sb.require('./dist/babelrc/bundle.js', __dirname)

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