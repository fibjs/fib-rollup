var VueSsr = require('./_utils').getVueSSRInstance()
var cleanDist = require('./_utils').cleanDist
var getCustomizedVBox = require('../').getCustomizedVBox
var registerTsCompiler = require('fib-typify').registerTsCompiler

var cheerio = require('cheerio')
var Vue = require('vue')

var test = require('test')
test.setup()

describe('cjs:package', () => {
    after(() => {
        try {
            cleanDist()
        } catch(err) {
            console.error(err);
        }
    })

    it('simple', () => {
        require('./cjs-simple/build')

        var bundle = require('./cjs-simple/dist/bundle.js')

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
    })

    it('simple-ts', () => {
        require('./cjs-simple-ts/build')

        var bundle = require('./cjs-simple-ts/dist/bundle.js')

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
    })
})

describe('umd:package', () => {
    after(() => {
        try {
            cleanDist();
        } catch(err) {
            console.error(err);
        }
    })

    it('simple', () => {
        require('./umd-simple/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./umd-simple/dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)
    })

    it('simple-ts', () => {
        require('./umd-simple-ts/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./umd-simple-ts/dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        assert.equal(bundle(), 'hello, fib-rollup')
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)
    })

    it('iplugin:uglify-js', () => {
        require('./umd-iplugin-uglify-js/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./umd-iplugin-uglify-js/dist/bundle.js', __dirname)

        assert.property(bundle, 'foo')
        assert.property(bundle, 'bar')
        assert.equal(bundle.bar(), bundle.foo)
    })

    it('plugin:json', () => {
        require('./umd-plugin-json/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./umd-plugin-json/dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.deepEqual(bundle(), require('./umd-plugin-json/index.json'))
    })

    it('plugin:uglify - invalid', () => {
        assert.throws(() => {
            require('./umd-plugin-uglify/build')
        })
    })

    it('plugin:terser - invalid', () => {
        assert.throws(() => {
            require('./umd-plugin-terser/build')
        })
    })

    it('plugin:graph - invalid', () => {
        assert.throws(() => {
            require('./umd-plugin-graph/build')
        })
    })

    it('plugin:buble', () => {
        require('./umd-plugin-buble/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./umd-plugin-buble/dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.isFunction(bundle.foo)

        assert.equal(bundle.bar_constant, 123)
        assert.equal(bundle.bar_let, 123)
        assert.equal(bundle.bar_var, 123)
    })

    it('plugin:alias', () => {
        require('./umd-plugin-alias/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./umd-plugin-alias/dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        assert.equal(bundle.a, 'a')
        assert.equal(bundle.b, 'b')
    })

    it('plugin:virtual', () => {
        require('./umd-plugin-virtual/build')

        var sb = getCustomizedVBox()
        registerTsCompiler(sb)
        
        var bundle = sb.require('./umd-plugin-virtual/dist/bundle.js', __dirname)

        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

        // used to be compared
        var foo = sb.require('./umd-plugin-virtual/virmodule.foo', __dirname).default
        var bar = sb.require('./umd-plugin-virtual/virmodule.bar', __dirname).default

        assert.equal(Object.values(sb.modules).find(x => x.default === foo).default, foo)
        assert.equal(Object.values(sb.modules).find(x => x.default === bar).default, bar)
    })

    it('mvvm framework in server-side', () => {
        require('./umd-frontend/build')

        var sb = getCustomizedVBox()
        var bundle = sb.require('./umd-frontend/dist/bundle.js', __dirname)

        assert.isFunction(bundle)
        var result = bundle()
        assert.equal(Object.values(sb.modules).find(x => x === bundle), bundle)

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
