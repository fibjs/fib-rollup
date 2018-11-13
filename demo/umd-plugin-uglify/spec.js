var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

describe('umd-plugin-uglify', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:uglify - invalid', () => {
        assert.throws(() => {
            require('./src/build')
        })
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}