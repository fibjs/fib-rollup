var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

describe('cjs-simple-ts', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    it('simple', () => {
        require('./src/build')

        var bundle = require('./dist/bundle.js')

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}
