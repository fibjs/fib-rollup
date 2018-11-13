# fib-rollup

[![Build Status](https://travis-ci.org/fibjs/fib-rollup.svg)](https://travis-ci.org/fibjs/fib-rollup)
[![NPM version](https://img.shields.io/npm/v/fib-rollup.svg)](https://www.npmjs.org/package/fib-rollup)

fibjs wrapper for rollup

## Pre-requisite

* fibjs `>= 0.26.1`/ fibos `>= 0.26.x`

It's recommended to use top-level `await` in fib-rollup's build script, just like case in [demo/] directory.

* rollup knowledge

Benefited by rollup's distinctive and predictive design, fibjs can run [rollup] perferctly with internal `vbox` Sandbox. [rollup] defined itself as `Next-generation ES module bundler`, and was written with typescript which can run in browser, nodejs and any other javascript context.

Just get javascript API document in [rollupjs.org] later, before that, there're some issues you should notice. 

fibjs doesn't support all plugins of rollup(including those popular plugins such as [rollup-plugin-node-resolve]) because they use some nodejs APIs that fibjs haven't been compatible with yet.

You can alway run rollup, and write your own plugin, just like `fib-rollup`'s internal plugin "rollup-plugin-fibjs-resolve"(exported as 'fibjsResolve').

We also provide some [API](#API) to run existed rollup-plugin-\* packages. See details about `vbox` and `getCustomizedVBox` in [API](#API) Section.

## Usage

```
npm i -D fib-rollup
```

### Via Javascript API

sample build config

```javascript
const { default: rollup, plugins } = require('fib-rollup')

const commonjs = require('rollup-plugin-commonjs');

// yes, just use top-level await!
// get rollup instance `bundle`
const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.js'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        commonjs()
    ]
}).catch(e => console.error(e));

// generate code and map by `bundle.generate`
const { code, map } = await bundle.generate({
    format: 'cjs'
}).catch(e => console.error(e));

// write bundled result with `bundle.write`
await bundle.write({
    file: path.resolve(__dirname, './dist/bundle.js'),
    format: 'cjs'
}).catch(e => console.error(e));
```

view more demos in [demo/]

### CLI

would be supported in the future.

## APIs

* module default

rollup running in fibjs.

* `vbox: Object`

Virtual box, it's based on fibjs's [vm.Sandbox], see detail in [src/vbox/index.ts]. It provided some customzied global modules to make plugins running.

Some of rollup-plugins can be run directly in raw fibjs's default global context, but some others must be hacked(or rewritten with fibjs). See details in [Plugins Test Result](#Plugins Test Result) below

For example, in fibjs there's no `module` module, which in nodejs is internal module and used to load nodejs' module. More and more npm packages use API in `module` module of nodejs, rollup did so. So I made one patched `module` module in default virtual box, and `vbox.require('rollup', __dirname)` to make rollup running. some of rollup's plugin can be run by this vbox.

default patched module is `recommendedVBoxModules`, see details in [src/vbox/index.ts].

* `getCustomizedVBox (myModules: any, myFallback: Function = recommendedVBoxModuleFallback)`

get your own vbox by this API, vbox has some patched global module(such as `module`, `util`), but sometimes you need to another version patched global modules.

* `fibjsResolve(options: RollupPluginFibjsResolveOptions = {})`

equivalent to internal plugin `rollup-plugin-fibjs-resolve`

* `recommendedVBoxModules`

see details in [src/vbox/index.ts]

* `recommendedVBoxModuleFallback`

see details in [src/vbox/index.ts]

## Internal Plugins

**rollup-plugin-fibjs-resolve**
---

[rollup-plugin-node-resolve]'s fibjs version.

[rollup-plugin-node-resolve] depends on nodejs's `module` module API heavily, it's hard, or say, impossible to provide one compatible `module` module to simulate [load-mechanism in nodejs] and make [rollup-plugin-node-resolve] running.

fibjs's load-mechanism is based on [vm.Sandbox], which distinguished from `module` module in nodejs. I have to write the plugin with same API with [rollup-plugin-node-resolve], but only for fibjs.

**type**: `fibjsResolve(options: RollupPluginFibjsResolveOptions = {})`

```javascript
const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.js'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        // use it with rollup-plugin-commonjs
        commonjs()
    ]
}).catch(e => console.error(e));
```
**rollup-plugin-uglify-js**
---

`uglify-js` wrapper for rollup on fibjs.

```javascript
const path = require('path');
const { default: rollup, plugins } = require('../../')

const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        // transpile es201X feature such as template string
        buble(),
        commonjs(),
        plugins['rollup-plugin-uglify-js']()
    ]
}).catch(e => console.error(e));
```

**rollup-plugin-babel-standalone(Beta)**
---

use `babel-standalone` to transform javascript

```javascript
const path = require('path');
const { default: rollup, plugins } = require('../../')

const commonjs = require('rollup-plugin-commonjs');

const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './index.ts'),
    external: ['coroutine'],
    plugins: [
        plugins['rollup-plugin-fibjs-resolve'](),
        // transpile es201X feature such as template string
        plugins['rollup-plugin-babel-standalone']({
            // ...transform options, you can also set it in `$CWD/.babelrc` or `path.dirname(input)/.babelrc`
            presets: [
                ["es2015", { "modules": false }],
                // ...
            ]
        }),
        commonjs(),
        plugins['rollup-plugin-uglify-js']()
    ]
}).catch(e => console.error(e));
```

## Document

[rollupjs.org]

## Feature

- [x] pure javascript bundle
    - [ ] fibos
- [x] server-side bundle
- [x] frontend javacript bundle
    - [x] vue
    - [ ] react
    - [ ] angular
    - [ ] jquery
    - [ ] cheerio

## Plugins Test Result

| Plugin Name | required version | Is Valid? | Comment |
| --- | --- | --- | --- |
| [rollup-plugin-buble] | `v0.2.0`  | ✔️ | valid but it's not recommended to use with `http.Server`, it would lead to memory leak sometimes. |
| [rollup-plugin-commonjs] | `v0.2.0`  | ✔️ | |
| [rollup-plugin-pug] | `v0.2.0`  | ✔️ | |
| [rollup-plugin-vue] | `v0.2.0`  | ✔️ | |
| [rollup-plugin-json] | `v0.2.0`  | ✔️ | |
| [rollup-plugin-graph] | -  | ❌ | |
| [rollup-plugin-typescript] | `v0.2.2`  | ✔️ | **pass `extensions: ['.ts']`**; <br> rollup compile typescript file(entry or module) automatically. |
| [rollup-plugin-virtual] | `v0.2.0`  | ✔️ | |
| [rollup-plugin-uglify] | -  | ❌  | |
| [rollup-plugin-terser] | -  | ❌  | |
| [rollup-plugin-alias] | `v0.2.0`  | ✔️  | |

<!-- ❌ -->

## Development

fork this repo, run commands

```bash
npm i -D

# build
npm run build

# run test
npm run ci
```

## License

[GPL-3.0](https://opensource.org/licenses/GPL-3.0)

Copyright (c) 2018-present, Richard

[demo/]:demo/
[rollup]:https://github.com/rollup/rollup
[rollupjs.org]:https://rollupjs.org/
[rollup-plugin-node-resolve]:https://www.npmjs.com/package/rollup-plugin-node-resolve
[vm.Sandbox]:https://github.com/fibjs/fibjs/blob/master/idl/zh-cn/SandBox.idl
[src/vbox/index.ts]:src/vbox/index.ts
[load-mechanism in nodejs]:https://github.com/nodejs/node/blob/master/lib/module.js

[rollup-plugin-buble]:https://www.npmjs.com/package/rollup-plugin-buble
[rollup-plugin-commonjs]:https://www.npmjs.com/package/rollup-plugin-commonjs
[rollup-plugin-pug]:https://www.npmjs.com/package/rollup-plugin-pug
[rollup-plugin-json]:https://www.npmjs.com/package/rollup-plugin-json
[rollup-plugin-vue]:https://www.npmjs.com/package/rollup-plugin-vue
[rollup-plugin-typescript]:https://www.npmjs.com/package/rollup-plugin-typescript
[rollup-plugin-graph]:https://www.npmjs.com/package/rollup-plugin-graph
[rollup-plugin-virtual]:https://www.npmjs.com/package/rollup-plugin-virtual
[rollup-plugin-uglify]:https://www.npmjs.com/package/rollup-plugin-uglify
[rollup-plugin-terser]:https://www.npmjs.com/package/rollup-plugin-terser
[rollup-plugin-alias]:https://www.npmjs.com/package/rollup-plugin-alias
