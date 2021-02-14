import { from, of } from "rxjs";
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
const klass = Symbol("klass");
const isNumber = (value) => typeof value === $number;
const isArray = (value) => value instanceof Array;
const isObject = (value) => value !== null && typeof value === $object;
const isString = (value) => typeof value === $string;
const isFunction = (value) => typeof value === $function;
const isUndefined = (value) => typeof value == $undefined;
const isDefined = (value) => typeof value != $undefined;
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
const isPromise = (obj) => !!obj && typeof obj.then === "function";
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return from(Promise.resolve(value));
    }
    return of(value);
}
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        let k = new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
export { foreach, isNumber, lookup, isArray, isObject, isString, isFunction, isUndefined, isDefined, isObservable, isPromise, wrapIntoObservable, klass, INPUT_METADATA_KEY, CSS_SHEET_NOT_SUPPORTED };
