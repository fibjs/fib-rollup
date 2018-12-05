var cleanDist = require('./_utils').cleanDist

var test = require('test')
test.setup()

describe('all', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    run('./server-umd-simple/spec')

    run('./cjs-simple/spec')
    run('./cjs-simple-ts/spec')

    run('./umd-simple/spec')
    run('./umd-simple-ts/spec')

    run('./umd-iplugin-babel-standalone/spec')
    run('./umd-iplugin-uglify-js/spec')

    run('./umd-plugin-alias/spec')
    run('./umd-plugin-json/spec')
    run('./umd-plugin-buble/spec')
    run('./umd-plugin-typescript/spec')
    run('./umd-plugin-virtual/spec')

    run('./umd-plugin-uglify/spec')
    run('./umd-plugin-terser/spec')
    run('./umd-plugin-graph/spec')

    run('./umd-frontend/spec')

    run('./vue-component/spec')
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}
