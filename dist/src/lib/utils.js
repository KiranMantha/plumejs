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
var klass = Symbol('klass');
exports.klass = klass;
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
var INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
//# sourceMappingURL=utils.js.map