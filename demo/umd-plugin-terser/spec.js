var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

describe('umd-plugin-terser', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:terser - invalid', () => {
        assert.throws(() => {
            require('./umd-plugin-terser/src/build')
        })
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}