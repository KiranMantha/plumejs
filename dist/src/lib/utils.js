import { from, of } from "rxjs";
const klass = Symbol("klass");
const isObject = (value) => value !== null && typeof value === "object";
const isFunction = (value) => typeof value === "function";
const isUndefined = (value) => typeof value == "undefined";
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
const isPromise = (obj) => !!obj && typeof obj.then === "function";
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
        let k = new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
function getArgs(func) {
    return Function.toString
        .call(func)
        .replace(/[/][/].*$/gm, '')
        .replace(/\s+/g, '')
        .replace(/[/][*][^/*]*[*][/]/g, '')
        .split('){', 1)[0]
        .replace(/^[^(]*[(]/, '')
        .replace(/=[^,]+/g, '')
        .split(',')
        .filter(Boolean);
}
const useState = (obj) => {
    let initialState = obj;
    const reducer = fn => {
        let newState;
        if (isFunction(fn)) {
            newState = fn(initialState);
        }
        else {
            newState = fn;
        }
        Object.assign(initialState, newState);
    };
    return [initialState, reducer];
};
export { isObject, isFunction, isUndefined, isObservable, isPromise, wrapIntoObservable, useState, getArgs, klass, CSS_SHEET_NOT_SUPPORTED };
