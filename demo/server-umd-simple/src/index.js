import * as http from 'http'

export function hello () {
    return 'hello, fib-rollup';
}

export function getHttp () {
    return http
}

import mod1 from './mod1'
export { mod1 }
import mod_platform_specified from './mod_platform_specified'
export { mod_platform_specified }