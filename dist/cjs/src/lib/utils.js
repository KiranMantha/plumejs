"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromVanillaEvent = exports.CSS_SHEET_NOT_SUPPORTED = exports.klass = exports.isUndefined = exports.isFunction = exports.isObject = void 0;
const klass = Symbol('klass');
exports.klass = klass;
const isObject = (value) => value !== null && typeof value === 'object';
exports.isObject = isObject;
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
const isUndefined = (value) => typeof value == 'undefined';
exports.isUndefined = isUndefined;
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
const fromVanillaEvent = (target, eventName, onNext, options = false) => {
    target.addEventListener(eventName, onNext, options);
    const unsubscribe = () => {
        target.removeEventListener(eventName, onNext, options);
    };
    return unsubscribe;
};
exports.fromVanillaEvent = fromVanillaEvent;
