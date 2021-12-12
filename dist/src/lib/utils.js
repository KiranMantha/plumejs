"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEvent = exports.CSS_SHEET_NOT_SUPPORTED = exports.klass = exports.wrapIntoObservable = exports.isPromise = exports.isObservable = exports.isUndefined = exports.isFunction = exports.isObject = void 0;
const rxjs_1 = require("rxjs");
const klass = Symbol('klass');
exports.klass = klass;
const isObject = (value) => value !== null && typeof value === 'object';
exports.isObject = isObject;
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
const isUndefined = (value) => typeof value == 'undefined';
exports.isUndefined = isUndefined;
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
exports.isObservable = isObservable;
const isPromise = (obj) => !!obj && typeof obj.then === 'function';
exports.isPromise = isPromise;
const wrapIntoObservable = (value) => {
    if (isObservable(value)) {
        return value;
    }
    else if (isPromise(value)) {
        return (0, rxjs_1.from)(Promise.resolve(value));
    }
    else {
        return (0, rxjs_1.of)(value);
    }
};
exports.wrapIntoObservable = wrapIntoObservable;
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
exports.CSS_SHEET_NOT_SUPPORTED = CSS_SHEET_NOT_SUPPORTED;
const fromEvent = (target, eventName, onNext, options = false) => {
    target.addEventListener(eventName, onNext, options);
    const unsubscribe = () => {
        target.removeEventListener(eventName, onNext, options);
    };
    return unsubscribe;
};
exports.fromEvent = fromEvent;
