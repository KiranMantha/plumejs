import { jsonObject } from "./types";

let $object = 'object',
  $string = 'string',
  $function = 'function',
  $undefined = 'undefined',
  $number = 'number';
//foreach for arrays, collections, objects
const foreach = (collection:Array<any>, callback:(o:any, i:any, c:Array<any>) => void, scope:any = {}) => {
  if (Object.prototype.toString.call(collection) === "[object Object]") {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        callback.call(scope, collection[prop], prop, collection);
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      callback.call(scope, collection[i], i, collection);
    }
  }
}

const lookup = (obj: jsonObject, path: string, defaultValue: any) => {
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
}

const klass = Symbol('klass');
const isNumber = (value:any) => typeof value === $number;
const isArray = (value:any) => value instanceof Array;
const isObject = (value:any) => value !== null && typeof value === $object;
const isString = (value:any) => typeof value === $string;
const isFunction = (value:any) => typeof value === $function;
const isUndefined = (value:any) => typeof value == $undefined;
const isDefined = (value:any) => typeof value != $undefined;
const INPUT_METADATA_KEY = Symbol("design:inputTypes");

export { foreach, isNumber, lookup, isArray, isObject, isString, isFunction, isUndefined, isDefined, klass, INPUT_METADATA_KEY };