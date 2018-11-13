var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var { getCustomizedVBox } = require('../../')

describe('umd-frontend', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('mvvm framework in server-side', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        var result = bundle()
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.property(result, 'Vue')
        assert.property(result, 'React')
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}