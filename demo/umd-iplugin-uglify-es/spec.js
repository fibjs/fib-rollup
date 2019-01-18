var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var fs = require('fs')
var path = require('path')

var { getCustomizedVBox } = require('../../').utils.vbox

describe('umd-iplugin-uglify-es', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('iplugin:uglify-es', () => {
        require('./src/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./dist/bundle.js', __dirname)

        assert.isObject(bundle.ES6_Class)
        assert.isFunction(bundle.arrow_function)
        assert.equal(bundle.arrow_function(), 'hello, world')
        assert.deepEqual(bundle.destruct_object, {foo: 'bar'})
        assert.deepEqual(bundle.array_spread, [1, 2, 3, 4 ,5])

        var bundleCode = fs.readTextFile(path.resolve(__dirname, './dist/bundle.js'))

        // check class name 
        assert.isTrue(bundleCode.includes('ES6_Class'))
        // check class constructor
        assert.isTrue(bundleCode.includes('=class{constructor()'))
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}