/// <reference types="@fibjs/types" />
import PatchedModule from '../patched-module';
export declare const builtinModules: any;
export declare const recommendedVBoxModules: {
    fs: any;
    path: any;
    events: any;
    util: any;
    crypto: any;
    buffer: any;
    module: typeof PatchedModule;
    'builtin-modules': any;
};
export declare function recommendedVBoxModuleFallback(name: string): any;
export declare function getCustomizedVBox(myModules?: any, myFallback?: Function): Class_SandBox;
export declare function getVueSsrVBox(myModules?: any, myFallback?: Function, opts?: any): Class_SandBox;
