var cleanDist = require('../_utils').cleanDist

var test = require('test')
test.setup()

var VueSsr = require('../_utils').getVueSSRInstance()
var cheerio = require('cheerio')
var Vue = require('vue')

describe('vue-component ssr', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })
    
    var vueSSRInstance
    before(() => {
        require('./src/build')

        vueSSRInstance = VueSsr.createRenderer()
    })

    it('vue-ssr module', () => {
        assert.isObject(VueSsr)
        assert.isFunction(VueSsr.createRenderer)

        assert.isObject(vueSSRInstance)
        assert.isFunction(vueSSRInstance.renderToString)
    })

    xit('test', () => {
        var vcOptions = require('./dist/test')
        assert.isObject(vcOptions)
        assert.property(vcOptions, 'name')
        assert.isFunction(vcOptions.data)
        assert.isFunction(vcOptions.render)
        assert.isArray(vcOptions.staticRenderFns)
        assert.isFunction(vcOptions.beforeCreate[0])

        var vueComponent = Vue.extend(vcOptions)
        var vm = new Vue(vueComponent)

        assert.isObject(vm)
        assert.property(vm, '$data')

        // use special vue-ssr to render component
        vueSSRInstance.renderToString(vm).then(html => {
            var $ = cheerio.load(html)
            assert.equal($('div').attr('data-server-rendered'), 'true')
            assert.equal($('div').text(), 'lalala')
        }).catch(err => {
            console.error(err)
        })
    })
})

if (require.main === module) {
    test.run(console.DEBUG)
    process.exit()
}