var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

describe('umd-plugin-graph', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    it('plugin:graph - invalid', () => {
        assert.throws(() => {
            require('./src/build')
        })
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}