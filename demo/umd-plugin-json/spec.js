var cleanDist = require('../_utils').cleanDist

var registerTsCompiler = require('fib-typify').registerTsCompiler

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../')

describe('umd-plugin-json', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:json', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.deepEqual(bundle(), require('./src/index.json'))
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}