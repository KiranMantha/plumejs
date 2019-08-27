"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let $object = 'object', $string = 'string', $function = 'function', $undefined = 'undefined', $number = 'number';
const foreach = (collection, callback, scope = {}) => {
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
exports.foreach = foreach;
const lookup = (obj, path, defaultValue) => {
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
exports.lookup = lookup;
const klass = Symbol('klass');
exports.klass = klass;
const isNumber = (value) => typeof value === $number;
exports.isNumber = isNumber;
const isArray = (value) => value instanceof Array;
exports.isArray = isArray;
const isObject = (value) => value !== null && typeof value === $object;
exports.isObject = isObject;
const isString = (value) => typeof value === $string;
exports.isString = isString;
const isFunction = (value) => typeof value === $function;
exports.isFunction = isFunction;
const isUndefined = (value) => typeof value == $undefined;
exports.isUndefined = isUndefined;
const isDefined = (value) => typeof value != $undefined;
exports.isDefined = isDefined;
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
//# sourceMappingURL=utils.js.map