Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const os = require('os');
const process = require('process');
const preserveSymlinks = []; // !!process.binding('config').preserveSymlinks;
const preserveSymlinksMain = []; // !!process.binding('config').preserveSymlinksMain;
const experimentalModules = []; // !!process.binding('config').experimentalModules;
var modulePaths = [];
var indexChars = [105, 110, 100, 101, 120, 46];
var indexLen = indexChars.length;
var warned = false;
const stat = function (filename) {
    filename = path.toNamespacedPath(filename);
    const cache = stat.cache;
    if (cache !== null) {
        const result = cache.get(filename);
        if (result !== undefined)
            return result;
    }
    const result = /* internalModuleStat */ fs.stat(filename);
    if (cache !== null)
        cache.set(filename, result);
    return result;
};
stat.cache = null;
function updateChildren(parent, child, scan) {
    var children = parent && parent.children;
    if (children && !(scan && children.includes(child)))
        children.push(child);
}
const packageMainCache = Object.create(null);
function readPackage(requestPath) {
    const entry = packageMainCache[requestPath];
    if (entry)
        return entry;
    const jsonPath = path.resolve(requestPath, 'package.json');
    const json = fs.require(/* internalModuleReadJSON */ (path.toNamespacedPath(jsonPath)));
    if (json === undefined) {
        return false;
    }
    try {
        return packageMainCache[requestPath] = JSON.parse(json).main;
    }
    catch (e) {
        e.path = jsonPath;
        e.message = 'Error parsing ' + jsonPath + ': ' + e.message;
        throw e;
    }
}
function tryPackage(requestPath, exts, isMain) {
    var pkg = readPackage(requestPath);
    if (!pkg)
        return false;
    var filename = path.resolve(requestPath, pkg);
    return tryFile(filename, isMain) ||
        tryExtensions(filename, exts, isMain) ||
        tryExtensions(path.resolve(filename, 'index'), exts, isMain);
}
function tryFile(requestPath, isMain) {
    const rc = stat(requestPath);
    if (preserveSymlinks && !isMain) {
        return rc === 0 && path.resolve(requestPath);
    }
    return rc === 0 && toRealPath(requestPath);
}
function toRealPath(requestPath) {
    // return fs.realpathSync(requestPath, {
    //   [internalFS.realpathCacheKey]: realpathCache
    // });
    return fs.realpath(requestPath);
}
function tryExtensions(p, exts, isMain) {
    for (var i = 0; i < exts.length; i++) {
        const filename = tryFile(p + exts[i], isMain);
        if (filename) {
            return filename;
        }
    }
    return false;
}
class Module {
    constructor(id, parent) {
        this.loaded = false;
        this.children = [];
        console.log('this', id);
        this.id = id;
        this.exports = {};
        this.parent = parent;
        updateChildren(parent, this, false);
        this.filename = null;
        this.loaded = false;
        this.children = [];
    }
    static _nodeModulePaths(rootPath) {
        console.log('_nodeModulePaths', arguments);
        switch (os.platform()) {
            case 'win32':
                return _nodeModulePaths_win32(rootPath);
            case 'darwin':
            case 'freebsd':
            case 'linux':
            default:
                return _nodeModulePaths_posix(rootPath);
        }
    }
    static _findPath(request, paths, isMain) {
        if (path.isAbsolute(request)) {
            paths = [''];
        }
        else if (!paths || paths.length === 0) {
            return false;
        }
        var cacheKey = request + '\x00' +
            (paths.length === 1 ? paths[0] : paths.join('\x00'));
        var entry = Module._pathCache[cacheKey];
        if (entry)
            return entry;
        var exts;
        var trailingSlash = request.length > 0 &&
            request.charCodeAt(request.length - 1) === CHAR_FORWARD_SLASH;
        if (!trailingSlash) {
            trailingSlash = /(?:^|\/)\.?\.$/.test(request);
        }
        // For each path
        for (var i = 0; i < paths.length; i++) {
            // Don't search further if path doesn't exist
            const curPath = paths[i];
            if (curPath && stat(curPath) < 1)
                continue;
            var basePath = path.resolve(curPath, request);
            var filename;
            var rc = stat(basePath);
            if (!trailingSlash) {
                if (rc === 0) { // File.
                    if (!isMain) {
                        if (preserveSymlinks) {
                            filename = path.resolve(basePath);
                        }
                        else {
                            filename = toRealPath(basePath);
                        }
                    }
                    else if (preserveSymlinksMain) {
                        // For the main module, we use the preserveSymlinksMain flag instead
                        // mainly for backward compatibility, as the preserveSymlinks flag
                        // historically has not applied to the main module.  Most likely this
                        // was intended to keep .bin/ binaries working, as following those
                        // symlinks is usually required for the imports in the corresponding
                        // files to resolve; that said, in some use cases following symlinks
                        // causes bigger problems which is why the preserveSymlinksMain option
                        // is needed.
                        filename = path.resolve(basePath);
                    }
                    else {
                        filename = toRealPath(basePath);
                    }
                }
                if (!filename) {
                    // try it with each of the extensions
                    if (exts === undefined)
                        exts = Object.keys(Module._extensions);
                    filename = tryExtensions(basePath, exts, isMain);
                }
            }
            if (!filename && rc === 1) { // Directory.
                // try it with each of the extensions at "index"
                if (exts === undefined)
                    exts = Object.keys(Module._extensions);
                filename = tryPackage(basePath, exts, isMain);
                if (!filename) {
                    filename = tryExtensions(path.resolve(basePath, 'index'), exts, isMain);
                }
            }
            if (filename) {
                // Warn once if '.' resolved outside the module dir
                if (request === '.' && i > 0) {
                    if (!warned) {
                        warned = true;
                        process.emitWarning('warning: require(\'.\') resolved outside the package ' +
                            'directory. This functionality is deprecated and will be removed ' +
                            'soon.', 'DeprecationWarning', 'DEP0019');
                    }
                }
                Module._pathCache[cacheKey] = filename;
                return filename;
            }
        }
        return false;
    }
    ;
    static _resolveLookupPaths(request, parent, newReturn) {
        // if (NativeModule.nonInternalExists(request)) {
        //   debug('looking for %j in []', request);
        //   return (newReturn ? null : [request, []]);
        // }
        // Check for relative path
        if (request.length < 2 ||
            request.charCodeAt(0) !== '.'.charCodeAt(0) /* CHAR_DOT */ ||
            (request.charCodeAt(1) !== '.'.charCodeAt(0) /* CHAR_DOT */ &&
                request.charCodeAt(1) !== '/'.charCodeAt(0) /* CHAR_FORWARD_SLASH */)) {
            var paths = modulePaths;
            if (parent) {
                if (!parent.paths)
                    paths = parent.paths = [];
                else
                    paths = parent.paths.concat(paths);
            }
            // Maintain backwards compat with certain broken uses of require('.')
            // by putting the module's directory in front of the lookup paths.
            if (request === '.') {
                if (parent && parent.filename) {
                    paths.unshift(path.dirname(parent.filename));
                }
                else {
                    paths.unshift(path.resolve(request));
                }
            }
            console.debug('looking for %j in %j', request, paths);
            return (newReturn ? (paths.length > 0 ? paths : null) : [request, paths]);
        }
        // with --eval, parent.id is not set and parent.filename is null
        if (!parent || !parent.id || !parent.filename) {
            // make require('./path/to/foo') work - normally the path is taken
            // from realpath(__filename) but with eval there is no filename
            var mainPaths = ['.'].concat(Module._nodeModulePaths('.'), modulePaths);
            console.debug('looking for %j in %j', request, mainPaths);
            return (newReturn ? mainPaths : [request, mainPaths]);
        }
        // Is the parent an index module?
        // We can assume the parent has a valid extension,
        // as it already has been accepted as a module.
        const base = path.basename(parent.filename);
        var parentIdPath;
        if (base.length > indexLen) {
            var i = 0;
            for (; i < indexLen; ++i) {
                if (indexChars[i] !== base.charCodeAt(i))
                    break;
            }
            if (i === indexLen) {
                // We matched 'index.', let's validate the rest
                for (; i < base.length; ++i) {
                    const code = base.charCodeAt(i);
                    if (code !== '_'.charCodeAt(0) /* CHAR_UNDERSCORE */ &&
                        (code < '0'.charCodeAt(0) /* CHAR_0 */ || code > '9'.charCodeAt(0) /* CHAR_9 */) &&
                        (code < 'A'.charCodeAt(0) /* CHAR_UPPERCASE_A */ || code > 'Z'.charCodeAt(0) /* CHAR_UPPERCASE_Z */) &&
                        (code < 'a'.charCodeAt(0) /* CHAR_LOWERCASE_A */ || code > 'z'.charCodeAt(0) /* CHAR_LOWERCASE_Z */))
                        break;
                }
                if (i === base.length) {
                    // Is an index module
                    parentIdPath = parent.id;
                }
                else {
                    // Not an index module
                    parentIdPath = path.dirname(parent.id);
                }
            }
            else {
                // Not an index module
                parentIdPath = path.dirname(parent.id);
            }
        }
        else {
            // Not an index module
            parentIdPath = path.dirname(parent.id);
        }
        var id = path.resolve(parentIdPath, request);
        // make sure require('./path') and require('path') get distinct ids, even
        // when called from the toplevel js file
        if (parentIdPath === '.' && id.indexOf('/') === -1) {
            id = './' + id;
        }
        console.debug('RELATIVE: requested: %s set ID to: %s from %s', request, id, parent.id);
        var parentDir = [path.dirname(parent.filename)];
        console.debug('looking for %j in %j', id, parentDir);
        return (newReturn ? parentDir : [id, parentDir]);
    }
    ;
    static _resolveFilename(request, parent, isMain, options) {
        // if (NativeModule.nonInternalExists(request)) {
        //   return request;
        // }
        var paths;
        if (typeof options === 'object' && options !== null &&
            Array.isArray(options.paths)) {
            const fakeParent = new Module('', null);
            paths = [];
            for (var i = 0; i < options.paths.length; i++) {
                const path = options.paths[i];
                fakeParent.paths = Module._nodeModulePaths(path);
                const lookupPaths = Module._resolveLookupPaths(request, fakeParent, true);
                if (!paths.includes(path))
                    paths.push(path);
                for (var j = 0; j < lookupPaths.length; j++) {
                    if (!paths.includes(lookupPaths[j]))
                        paths.push(lookupPaths[j]);
                }
            }
        }
        else {
            paths = Module._resolveLookupPaths(request, parent, true);
        }
        // look up the filename first, since that's the cache key.
        var filename = Module._findPath(request, paths, isMain);
        if (!filename) {
            // eslint-disable-next-line no-restricted-syntax
            var err = new Error(`Cannot find module '${request}'`);
            err.code = 'MODULE_NOT_FOUND';
            throw err;
        }
        return filename;
    }
    ;
}
Module.builtinModules = []; /* builtinModules */
Module._cache = Object.create(null);
Module._pathCache = Object.create(null);
Module._extensions = Object.create(null);
Module.globalPaths = [];
exports.default = Module;
// 'node_modules' character codes reversed
var nmChars = [115, 101, 108, 117, 100, 111, 109, 95, 101, 100, 111, 110];
var nmLen = nmChars.length;
function _nodeModulePaths_win32(from) {
    // guarantee that 'from' is absolute.
    from = path.resolve(from);
    // note: this approach *only* works when the path is guaranteed
    // to be absolute.  Doing a fully-edge-case-correct path.split
    // that works on both Windows and Posix is non-trivial.
    // return root node_modules when path is 'D:\\'.
    // path.resolve will make sure from.length >=3 in Windows.
    if (from.charCodeAt(from.length - 1) === "\\".charCodeAt(0) /* CHAR_BACKWARD_SLASH */ &&
        from.charCodeAt(from.length - 2) === ":".charCodeAt(0) /* CHAR_COLON */)
        return [from + 'node_modules'];
    const paths = [];
    var p = 0;
    var last = from.length;
    for (var i = from.length - 1; i >= 0; --i) {
        const code = from.charCodeAt(i);
        // The path segment separator check ('\' and '/') was used to get
        // node_modules path for every path segment.
        // Use colon as an extra condition since we can get node_modules
        // path for drive root like 'C:\node_modules' and don't need to
        // parse drive name.
        if (i === '\\'.charCodeAt(0) /* CHAR_BACKWARD_SLASH */ ||
            i === '/'.charCodeAt(0) /* CHAR_FORWARD_SLASH */ ||
            i === ':'.charCodeAt(0) /* CHAR_COLON */) {
            if (p !== nmLen)
                paths.push(from.slice(0, last) + '\\node_modules');
            last = i;
            p = 0;
        }
        else if (p !== -1) {
            if (nmChars[p] === code) {
                ++p;
            }
            else {
                p = -1;
            }
        }
    }
    return paths;
}
function _nodeModulePaths_posix(from) {
    // guarantee that 'from' is absolute.
    from = path.resolve(from);
    // Return early not only to avoid unnecessary work, but to *avoid* returning
    // an array of two items for a root: [ '//node_modules', '/node_modules' ]
    if (from === '/')
        return ['/node_modules'];
    // note: this approach *only* works when the path is guaranteed
    // to be absolute.  Doing a fully-edge-case-correct path.split
    // that works on both Windows and Posix is non-trivial.
    const paths = [];
    var p = 0;
    var last = from.length;
    for (var i = from.length - 1; i >= 0; --i) {
        const code = from.charCodeAt(i);
        if (i === '/'.charCodeAt(0) /* CHAR_FORWARD_SLASH */) {
            if (p !== nmLen)
                paths.push(from.slice(0, last) + '/node_modules');
            last = i;
            p = 0;
        }
        else if (p !== -1) {
            if (nmChars[p] === code) {
                ++p;
            }
            else {
                p = -1;
            }
        }
    }
    // Append /node_modules to handle root paths.
    paths.push('/node_modules');
    return paths;
}
const CHAR_FORWARD_SLASH = '/'.charCodeAt(0);
