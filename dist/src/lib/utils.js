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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBSSxPQUFPLEdBQUcsUUFBUSxFQUNwQixPQUFPLEdBQUcsUUFBUSxFQUNsQixTQUFTLEdBQUcsVUFBVSxFQUN0QixVQUFVLEdBQUcsV0FBVyxFQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRXJCLE1BQU0sT0FBTyxHQUFHLENBQUMsVUFBcUIsRUFBRSxRQUE2QyxFQUFFLFFBQVksRUFBRSxFQUFFLEVBQUU7SUFDdkcsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssaUJBQWlCLEVBQUU7UUFDcEUsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDM0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7S0FDRjtTQUFNO1FBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNwRDtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBaUNRLDBCQUFPO0FBL0JoQixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQWUsRUFBRSxJQUFZLEVBQUUsWUFBaUIsRUFBRSxFQUFFO0lBQ2xFLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEIsSUFBSSxJQUFJLEVBQUU7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLEdBQUcsRUFBRTtZQUNQLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ1YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUNELEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtLQUNGO0lBQ0QsT0FBTyxLQUFLLElBQUksWUFBWSxDQUFDO0FBQy9CLENBQUMsQ0FBQTtBQVkyQix3QkFBTTtBQVZsQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFVdUUsc0JBQUs7QUFUMUcsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLE9BQU8sQ0FBQztBQVN2Qyw0QkFBUTtBQVIxQixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQVMsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQztBQVFsQiwwQkFBTztBQVAzQyxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVMsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxPQUFPLENBQUM7QUFPOUIsNEJBQVE7QUFOckQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLE9BQU8sQ0FBQztBQU1GLDRCQUFRO0FBTC9ELE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7QUFLSSxnQ0FBVTtBQUozRSxNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLElBQUksVUFBVSxDQUFDO0FBSWUsa0NBQVc7QUFIeEYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLFVBQVUsQ0FBQztBQUc4Qiw4QkFBUztBQUZuRyxNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXFELGdEQUFrQiJ9