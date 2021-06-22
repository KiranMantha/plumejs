import { from, of } from 'rxjs';
const klass = Symbol('klass');
const isObject = (value) => value !== null && typeof value === 'object';
const isFunction = (value) => typeof value === 'function';
const isUndefined = (value) => typeof value == 'undefined';
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';
const wrapIntoObservable = (value) => {
    if (isObservable(value)) {
        return value;
    }
    else if (isPromise(value)) {
        return from(Promise.resolve(value));
    }
    else {
        return of(value);
    }
};
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
export { isObject, isFunction, isUndefined, isObservable, isPromise, wrapIntoObservable, klass, CSS_SHEET_NOT_SUPPORTED };
