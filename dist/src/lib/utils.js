var $object = 'object', $string = 'string', $function = 'function', $undefined = 'undefined', $number = 'number';
var foreach = function (collection, callback, scope) {
    if (scope === void 0) { scope = {}; }
    if (Object.prototype.toString.call(collection) === "[object Object]") {
        for (var prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                callback.call(scope, collection[prop], prop, collection);
            }
        }
    }
    else {
        for (var i = 0; i < collection.length; i++) {
            callback.call(scope, collection[i], i, collection);
        }
    }
};
var lookup = function (obj, path, defaultValue) {
    var value, patharr, k;
    if (path) {
        if (!isNaN(parseInt(path))) {
            return path;
        }
        patharr = path.trim().split(".");
        if (obj) {
            for (var i = 0; i < patharr.length; i++) {
                k = k ? k[patharr[i]] : obj[patharr[i]];
                if (k && !isObject(k)) {
                    value = k;
                    return value;
                }
            }
            value = k;
        }
    }
    return value || defaultValue;
};
var klass = Symbol('klass');
var isNumber = function (value) { return typeof value === $number; };
var isArray = function (value) { return value instanceof Array; };
var isObject = function (value) { return value !== null && typeof value === $object; };
var isString = function (value) { return typeof value === $string; };
var isFunction = function (value) { return typeof value === $function; };
var isUndefined = function (value) { return typeof value == $undefined; };
var isDefined = function (value) { return typeof value != $undefined; };
var INPUT_METADATA_KEY = Symbol("design:inputTypes");
export { foreach, isNumber, lookup, isArray, isObject, isString, isFunction, isUndefined, isDefined, klass, INPUT_METADATA_KEY };
//# sourceMappingURL=utils.js.map