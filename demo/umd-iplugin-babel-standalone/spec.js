const test = require('test')
test.setup()

const getCustomizedVBox = require('../../lib').utils.vbox.getCustomizedVBox
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
        require('./src/build')
    })

    it('default', () => {
        var vbox = getCustomizedVBox()
        
        var bundle = vbox.require('./dist/default/bundle.js', __dirname)

        assert.equal(Object.values(vbox.modules).find(x => x === bundle), bundle)

        assert.isFunction(bundle.foo)

        assert.equal(bundle.bar_constant, 123)
        assert.equal(bundle.bar_let, 123)
        assert.equal(bundle.bar_var, 123)
    })

    it('babelrc', () => {
        var vbox = getCustomizedVBox()
        
        var bundle = vbox.require('./dist/babelrc/bundle.js', __dirname)

        assert.equal(Object.values(vbox.modules).find(x => x === bundle), bundle)

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