"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.foreach = foreach;
var lookup = function (obj, path, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
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
            if (isUndefined(value)) {
                if (isDefined(defaultValue))
                    value = defaultValue;
                else
                    value = "noprop";
            }
        }
    }
    return value;
};
exports.lookup = lookup;
var _id = Symbol('id');
exports._id = _id;
var klass = Symbol('klass');
exports.klass = klass;
var _nextId = Symbol('nextId');
exports._nextId = _nextId;
var _componentRegistry = Symbol('componentRegistry');
exports._componentRegistry = _componentRegistry;
var isNumber = function (value) { return typeof value === $number; };
exports.isNumber = isNumber;
var isArray = function (value) { return value instanceof Array; };
exports.isArray = isArray;
var isObject = function (value) { return value !== null && typeof value === $object; };
exports.isObject = isObject;
var isString = function (value) { return typeof value === $string; };
exports.isString = isString;
var isFunction = function (value) { return typeof value === $function; };
exports.isFunction = isFunction;
var isUndefined = function (value) { return typeof value == $undefined; };
exports.isUndefined = isUndefined;
var isDefined = function (value) { return typeof value != $undefined; };
exports.isDefined = isDefined;
var valueFn = function (value) { return function () { return value; }; };
exports.valueFn = valueFn;
var ajaxHtmlLoad = function (url, method) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onloadend = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            }
            else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.open(method.toUpperCase(), url);
        xhr.send();
    });
};
exports.ajaxHtmlLoad = ajaxHtmlLoad;
var INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
//# sourceMappingURL=utils.js.map