"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQTRDO0FBRTVDLElBQUksT0FBTyxHQUFHLFFBQVEsRUFDckIsT0FBTyxHQUFHLFFBQVEsRUFDbEIsU0FBUyxHQUFHLFVBQVUsRUFDdEIsVUFBVSxHQUFHLFdBQVcsRUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUVwQixNQUFNLE9BQU8sR0FBRyxDQUNmLFVBQXNCLEVBQ3RCLFFBQWlELEVBQ2pELFFBQWEsRUFBRSxFQUNkLEVBQUU7SUFDSCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtRQUNyRSxLQUFLLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUM1QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzNELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDekQ7U0FDRDtLQUNEO1NBQU07UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25EO0tBQ0Q7QUFDRixDQUFDLENBQUM7QUE4REQsMEJBQU87QUE1RFIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFlLEVBQUUsSUFBWSxFQUFFLFlBQWlCLEVBQUUsRUFBRTtJQUNuRSxJQUFJLEtBQUssRUFBRSxPQUFPLEVB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