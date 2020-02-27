"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $object = 'object', $string = 'string', $function = 'function', $undefined = 'undefined', $number = 'number';
//foreach for arrays, collections, objects
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBSSxPQUFPLEdBQUcsUUFBUSxFQUNwQixPQUFPLEdBQUcsUUFBUSxFQUNsQixTQUFTLEdBQUcsVUFBVSxFQUN0QixVQUFVLEdBQUcsV0FBVyxFQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ3JCLDBDQUEwQztBQUMxQyxJQUFNLE9BQU8sR0FBRyxVQUFDLFVBQXFCLEVBQUUsUUFBNkMsRUFBRSxLQUFjO0lBQWQsc0JBQUEsRUFBQSxVQUFjO0lBQ25HLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO1FBQ3BFLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMxRDtTQUNGO0tBQ0Y7U0FBTTtRQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDcEQ7S0FDRjtBQUNILENBQUMsQ0FBQTtBQWlDUSwwQkFBTztBQS9CaEIsSUFBTSxNQUFNLEdBQUcsVUFBQyxHQUFlLEVBQUUsSUFBWSxFQUFFLFlBQWlCO0lBQzlELElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEIsSUFBSSxJQUFJLEVBQUU7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsRUFBRTtZQUNQLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ1YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUNELEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtLQUNGO0lBQ0QsT0FBTyxLQUFLLElBQUksWUFBWSxDQUFDO0FBQy9CLENBQUMsQ0FBQTtBQVkyQix3QkFBTTtBQVZsQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFVdUUsc0JBQUs7QUFUMUcsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxPQUFPLEVBQXhCLENBQXdCLENBQUM7QUFTdkMsNEJBQVE7QUFSMUIsSUFBTSxPQUFPLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxLQUFLLFlBQVksS0FBSyxFQUF0QixDQUFzQixDQUFDO0FBUWxCLDBCQUFPO0FBUDNDLElBQU0sUUFBUSxHQUFHLFVBQUMsS0FBUyxJQUFLLE9BQUEsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxPQUFPLEVBQTFDLENBQTBDLENBQUM7QUFPOUIsNEJBQVE7QUFOckQsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxPQUFPLEtBQUssS0FBSyxPQUFPLEVBQXhCLENBQXdCLENBQUM7QUFNRiw0QkFBUTtBQUwvRCxJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQVMsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBMUIsQ0FBMEIsQ0FBQztBQUtJLGdDQUFVO0FBSjNFLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBUyxJQUFLLE9BQUEsT0FBTyxLQUFLLElBQUksVUFBVSxFQUExQixDQUEwQixDQUFDO0FBSWUsa0NBQVc7QUFIeEYsSUFBTSxTQUFTLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxPQUFPLEtBQUssSUFBSSxVQUFVLEVBQTFCLENBQTBCLENBQUM7QUFHOEIsOEJBQVM7QUFGbkcsSUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVxRCxnREFBa0IifQ==