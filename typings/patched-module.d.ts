declare type ModuleIdType = string;
export default class Module {
    id: string;
    filename: string;
    paths: string[];
    exports: {
        [key: string]: any;
    };
    parent: Module | null;
    loaded: boolean;
    children: Module[];
    static builtinModules: any[];
    static _cache: any;
    static _pathCache: any;
    static _extensions: any;
    static globalPaths: any[];
    constructor(id: string, parent: Module | null);
    static _nodeModulePaths(rootPath: string): any[];
    static _findPath(request: ModuleIdType, paths: string[], isMain: boolean): any;
    static _resolveLookupPaths(request: string, parent: any, newReturn: any): any[];
    static _resolveFilename(request: any, parent: any, isMain: any, options: any): any;
}
export {};
