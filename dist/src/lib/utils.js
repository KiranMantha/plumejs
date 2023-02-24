const klass = Symbol('klass');
const isObject = (value) => value !== null && typeof value === 'object';
const isFunction = (value) => typeof value === 'function';
const isUndefined = (value) => typeof value == 'undefined';
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
const fromEvent = (target, eventName, onNext, options = false) => {
    target.addEventListener(eventName, onNext, options);
    const unsubscribe = () => {
        target.removeEventListener(eventName, onNext, options);
    };
    return unsubscribe;
};
export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromEvent };
