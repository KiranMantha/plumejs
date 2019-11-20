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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxPQUFPLEdBQUcsUUFBUSxFQUNwQixPQUFPLEdBQUcsUUFBUSxFQUNsQixTQUFTLEdBQUcsVUFBVSxFQUN0QixVQUFVLEdBQUcsV0FBVyxFQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRXJCLElBQU0sT0FBTyxHQUFHLFVBQUMsVUFBcUIsRUFBRSxRQUE2QyxFQUFFLEtBQWM7SUFBZCxzQkFBQSxFQUFBLFVBQWM7SUFDbkcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssaUJBQWlCLEVBQUU7UUFDcEUsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDM0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7S0FDRjtTQUFNO1FBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNwRDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBaUNRLDBCQUFPO0FBL0JoQixJQUFNLE1BQU0sR0FBRyxVQUFDLEdBQU8sRUFBRSxJQUFXLEVBQUUsWUFBZ0I7SUFDcEQsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0QixJQUFJLElBQUksRUFBRTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksR0FBRyxFQUFFO1lBQ1AsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNYO0tBQ0Y7SUFDRCxPQUFPLEtBQUssSUFBSSxZQUFZLENBQUM7QUFDL0IsQ0FBQyxDQUFBO0FBWTJCLHdCQUFNO0FBVmxDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVV1RSxzQkFBSztBQVQxRyxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVMsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBeEIsQ0FBd0IsQ0FBQztBQVN2Qyw0QkFBUTtBQVIxQixJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQVMsSUFBSyxPQUFBLEtBQUssWUFBWSxLQUFLLEVBQXRCLENBQXNCLENBQUM7QUFRbEIsMEJBQU87QUFQM0MsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBMUMsQ0FBMEMsQ0FBQztBQU85Qiw0QkFBUTtBQU5yRCxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVMsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBeEIsQ0FBd0IsQ0FBQztBQU1GLDRCQUFRO0FBTC9ELElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBUyxJQUFLLE9BQUEsT0FBTyxLQUFLLEtBQUssU0FBUyxFQUExQixDQUEwQixDQUFDO0FBS0ksZ0NBQVU7QUFKM0UsSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFTLElBQUssT0FBQSxPQUFPLEtBQUssSUFBSSxVQUFVLEVBQTFCLENBQTBCLENBQUM7QUFJZSxrQ0FBVztBQUh4RixJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQVMsSUFBSyxPQUFBLE9BQU8sS0FBSyxJQUFJLFVBQVUsRUFBMUIsQ0FBMEIsQ0FBQztBQUc4Qiw4QkFBUztBQUZuRyxJQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXFELGdEQUFrQiJ9