"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
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
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
exports.isObservable = isObservable;
const isPromise = (obj) => !!obj && typeof obj.then === 'function';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQTRDO0FBRTVDLElBQUksT0FBTyxHQUFHLFFBQVEsRUFDcEIsT0FBTyxHQUFHLFFBQVEsRUFDbEIsU0FBUyxHQUFHLFVBQVUsRUFDdEIsVUFBVSxHQUFHLFdBQVcsRUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUVyQixNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQXFCLEVBQUUsUUFBNkMsRUFBRSxRQUFZLEVBQUUsRUFBRSxFQUFFO0lBQ3ZHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO1FBQ3BFLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMxRDtTQUNGO0tBQ0Y7U0FBTTtRQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDcEQ7S0FDRjtBQUNILENBQUMsQ0FBQTtBQWlEUSwwQkFBTztBQS9DaEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFlLEVBQUUsSUFBWSxFQUFFLFlBQWlCLEVBQUUsRUFBRTtJQUNsRSxJQUFJLEtBQUssRUFBRSxPQUFPLEVB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