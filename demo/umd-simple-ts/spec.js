var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../')

describe('umd-simple-ts', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    it('simple-ts', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}
