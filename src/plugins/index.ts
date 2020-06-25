export default {
    'rollup-plugin-fibjs-resolve': require('./rollup-plugin-fibjs-resolve').default,
    'rollup-plugin-uglify-js': require('./rollup-plugin-uglify-js').default,
    'rollup-plugin-uglify-es': require('./rollup-plugin-uglify-es').default,
    'rollup-plugin-babel-standalone': require('./rollup-plugin-babel-standalone').default,
} as {
    'rollup-plugin-fibjs-resolve': typeof import('./rollup-plugin-fibjs-resolve')
    'rollup-plugin-uglify-js': typeof import('./rollup-plugin-uglify-js')
    'rollup-plugin-uglify-es': typeof import('./rollup-plugin-uglify-es')
    'rollup-plugin-babel-standalone': typeof import('./rollup-plugin-babel-standalone')
};
