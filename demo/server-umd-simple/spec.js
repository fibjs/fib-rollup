var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

describe('server-umd-simple', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    it('function', () => {
        require('./build')

        var bundle = require('./dist/bundle.js')

        assert.isFunction(bundle.hello)
        assert.equal(bundle.hello(), 'hello, fib-rollup')

        assert.isFunction(bundle.getHttp)
        assert.equal(bundle.getHttp(), require('http'))

        assert.isObject(bundle.mod1)
        bundle.mod_platform_specified && assert.isObject(bundle.mod_platform_specified)
        assert.isObject(bundle.mod3)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}
