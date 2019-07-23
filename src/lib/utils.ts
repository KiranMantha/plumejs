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
const lookup = (obj:any, path:string, defaultValue:string = '') => {
  let value, patharr, k;
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
        if (isDefined(defaultValue)) value = defaultValue;
        else value = "noprop";
      }
    }
  }
  return value;
}
const _id = Symbol('id');
const klass = Symbol('klass');
const _nextId = Symbol('nextId');
const _componentRegistry = Symbol('componentRegistry');
const isNumber = (value:any) => typeof value === $number;
const isArray = (value:any) => value instanceof Array;
const isObject = (value:any) => value !== null && typeof value === $object;
const isString = (value:any) => typeof value === $string;
const isFunction = (value:any) => typeof value === $function;
const isUndefined = (value:any) => typeof value == $undefined;
const isDefined = (value:any) => typeof value != $undefined;
const valueFn = (value:any) => () => { return value; };
const ajaxHtmlLoad = (url: string, method: string) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onloadend = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.open(method.toUpperCase(), url);
    xhr.send();
  });
}
const INPUT_METADATA_KEY = Symbol("design:inputTypes");

export { foreach, _id, _nextId, _componentRegistry, lookup, isNumber, isArray, isObject, isString, isFunction, isUndefined, isDefined, valueFn, ajaxHtmlLoad, klass, INPUT_METADATA_KEY };