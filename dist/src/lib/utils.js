"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let $object = 'object', $string = 'string', $function = 'function', $undefined = 'undefined', $number = 'number';
//foreach for arrays, collections, objects
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBSSxPQUFPLEdBQUcsUUFBUSxFQUNwQixPQUFPLEdBQUcsUUFBUSxFQUNsQixTQUFTLEdBQUcsVUFBVSxFQUN0QixVQUFVLEdBQUcsV0FBVyxFQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQ3JCLDBDQUEwQztBQUMxQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQXFCLEVBQUUsUUFBNkMsRUFBRSxRQUFZLEVBQUUsRUFBRSxFQUFFO0lBQ3ZHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO1FBQ3BFLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMxRDtTQUNGO0tBQ0Y7U0FBTTtRQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDcEQ7S0FDRjtBQUNILENBQUMsQ0FBQTtBQWlDUSwwQkFBTztBQS9CaEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFlLEVBQUUsSUFBWSxFQUFFLFlBQWlCLEVBQUUsRUFBRTtJQUNsRSxJQUFJLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxHQUFHLEVBQUU7WUFDUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNyQixLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNWLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7WUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7S0FDRjtJQUNELE9BQU8sS0FBSyxJQUFJLFlBQVksQ0FBQztBQUMvQixDQUFDLENBQUE7QUFZMkIsd0JBQU07QUFWbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBVXVFLHNCQUFLO0FBVDFHLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxPQUFPLENBQUM7QUFTdkMsNEJBQVE7QUFSMUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUM7QUFRbEIsMEJBQU87QUFQM0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssT0FBTyxDQUFDO0FBTzlCLDRCQUFRO0FBTnJELE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxPQUFPLENBQUM7QUFNRiw0QkFBUTtBQUwvRCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBS0ksZ0NBQVU7QUFKM0UsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLFVBQVUsQ0FBQztBQUllLGtDQUFXO0FBSHhGLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxVQUFVLENBQUM7QUFHOEIsOEJBQVM7QUFGbkcsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVxRCxnREFBa0IifQ==