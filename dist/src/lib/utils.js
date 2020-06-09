"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_SHEET_NOT_SUPPORTED = exports.INPUT_METADATA_KEY = exports.klass = exports.wrapIntoObservable = exports.isPromise = exports.isObservable = exports.isDefined = exports.isUndefined = exports.isFunction = exports.isString = exports.isObject = exports.isArray = exports.lookup = exports.isNumber = exports.foreach = void 0;
const rxjs_1 = require("rxjs");
let $object = "object", $string = "string", $function = "function", $undefined = "undefined", $number = "number";
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
const klass = Symbol("klass");
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
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
exports.isObservable = isObservable;
const isPromise = (obj) => !!obj && typeof obj.then === "function";
exports.isPromise = isPromise;
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return rxjs_1.from(Promise.resolve(value));
    }
    return rxjs_1.of(value);
}
exports.wrapIntoObservable = wrapIntoObservable;
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        let k = new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
exports.CSS_SHEET_NOT_SUPPORTED = CSS_SHEET_NOT_SUPPORTED;
