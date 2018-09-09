var process = require('process')
var rmdirr = require('@fibjs/rmdirr')
var VueSsr = require('./_utils').getVueSSRInstance()
var cheerio = require('cheerio')
var Vue = require('vue')

var test = require('test')
test.setup()

describe('cjs:package', () => {
    before(() => {
        try {
            rmdirr('./*/dist');
        } catch(err) {
            console.error(err);
        }
    })


    it('simple', () => {
        require('./simple/build')

        var bundle = require('./simple/dist/bundle.js')

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
    })
})

describe('umd:package', () => {
    before(() => {
        try {
            rmdirr('./*/dist');
        } catch(err) {
            console.error(err);
        }
    })

    it('mvvm framework in server-side', () => {
        require('./frontend/build')

        var bundle = require('./frontend/dist/bundle.js')

        assert.isFunction(bundle)
        var result = bundle()

        assert.property(result, 'Vue')
        assert.property(result, 'React')
    })

    describe('vue-component ssr', () => {
        var vueSSRInstance
        before(() => {
            require('./vue-component/build')

            vueSSRInstance = VueSsr.createRenderer()
        })

        it('vue-ssr module', () => {
            assert.isObject(VueSsr)
            assert.isFunction(VueSsr.createRenderer)

            assert.isObject(vueSSRInstance)
            assert.isFunction(vueSSRInstance.renderToString)
            
        })

        it('test', () => {
            var test = require('./vue-component/dist/test')
            assert.isObject(test)
            assert.property(test, 'name')
            assert.isFunction(test.data)
            assert.isFunction(test.render)
            assert.isArray(test.staticRenderFns)
            assert.isFunction(test.beforeCreate[0])

            var vueComponent = Vue.extend(test)
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
})

test.run(console.DEBUG)
