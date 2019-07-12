"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let $object = 'object', $array = 'array', $string = 'string', $function = 'function', $undefined = 'undefined', $number = 'number';
const parseHtml = (tmpl) => {
    let template;
    template = document.createElement("template");
    template.innerHTML = tmpl;
    return template.content.cloneNode(true);
};
exports.parseHtml = parseHtml;
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
const lookup = (obj, path, defaultValue = '') => {
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
const _$ = Symbol('_internals_');
const _id = Symbol('id');
exports._id = _id;
const klass = Symbol('klass');
exports.klass = klass;
const _nextId = Symbol('nextId');
exports._nextId = _nextId;
const _componentRegistry = Symbol('componentRegistry');
exports._componentRegistry = _componentRegistry;
const rxProp = /(.+[^(\((.+)\))])/;
exports.rxProp = rxProp;
const rxMethod = /(.+)(\((.+)?\)){1}/;
exports.rxMethod = rxMethod;
const rxExpression = /{{(.+?)}}/g;
exports.rxExpression = rxExpression;
const rxOutput = /\((.*?)\)/g;
exports.rxOutput = rxOutput;
const rxWCElement = /(\-\w)/gm;
exports.rxWCElement = rxWCElement;
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
const valueFn = (value) => () => { return value; };
exports.valueFn = valueFn;
const ajaxHtmlLoad = (url, method) => {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onloadend = () => {
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
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
//# sourceMappingURL=utils.js.map