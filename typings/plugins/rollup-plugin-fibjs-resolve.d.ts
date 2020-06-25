declare namespace FibRollupResolve {
    type BooleanableVar<T = any> = T | boolean;
    interface RollupPluginFibjsResolve_ConsoleWarnFN {
        (...args: any[]): void;
    }
    interface RollupPluginFibjsResolve_InternalResolveOptions {
        basedir: string;
        packageFilter: RollupPluginFibjsResolve_PkgFilter;
        readFile: RollupPluginFibjsResolve_cachedReadFile;
        isFile: RollupPluginFibjsResolve_cachedIsFile;
        extensions: string[];
        preserveSymlinks?: string;
    }
    interface RollupPluginFibjsResolve_PkgFilter {
        (pkg: RollupPluginFibjsResolve_PkgInfo, pkgPath: string): RollupPluginFibjsResolve_PkgInfo;
    }
    interface RollupPluginFibjsResolve_PkgInfo {
        browser?: any;
        main?: any;
        module?: any;
        'jsnext:main': any;
    }
    interface RollupPluginFibjsResolve_cachedReadFile {
        (file: any, cb: Function): any;
    }
    interface RollupPluginFibjsResolve_cachedIsFile {
        (file: any, cb: Function): any;
    }
    interface RollupPluginFibjsResolveOptions {
        module?: boolean;
        main?: boolean;
        jsnext?: boolean;
        preferBuiltins?: boolean;
        customResolveOptions?: boolean;
        jail?: string;
        only?: any[];
        onwarn?: RollupPluginFibjsResolve_ConsoleWarnFN;
        skip?: boolean;
        preserveSymlinks?: boolean;
        browser?: boolean;
        extensions?: string[];
        modulesOnly?: boolean;
    }
    interface ResolveIdCallback {
        (err: Error, code: string): void;
    }
}
declare function fibjsResolve(options?: FibRollupResolve.RollupPluginFibjsResolveOptions): {
    name: string;
    options(options: FibRollupResolve.RollupPluginFibjsResolveOptions): void;
    generateBundle(): void;
    resolveId(importee: any, importer: any): string | Promise<unknown>;
};
export = fibjsResolve;
