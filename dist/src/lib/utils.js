const klass = Symbol('klass');
const isObject = (value) => value !== null && typeof value === 'object';
const isFunction = (value) => typeof value === 'function';
const isUndefined = (value) => typeof value == 'undefined';
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';
const CSS_SHEET_SUPPORTED = (() => {
    try {
        new CSSStyleSheet();
        return true;
    }
    catch (e) {
        return false;
    }
})();
const ofObs = (input) => ({
    subscribe: (fn) => {
        fn(input);
    }
});
const fromPromiseObs = (input) => ({
    subscribe: (fn) => {
        Promise.resolve(input).then((value) => {
            fn(value);
        });
    }
});
const createToken = () => Math.random().toString(36).substring(2);
class SubjectObs {
    _callbackCollection = {};
    asObservable() {
        return {
            subscribe: (fn) => this.subscribe(fn)
        };
    }
    subscribe(fn) {
        const token = createToken();
        this._callbackCollection[token] = fn;
        return () => this.unsubscribe(token);
    }
    unsubscribe(token) {
        delete this._callbackCollection[token];
    }
    next(value) {
        for (const token in this._callbackCollection) {
            this._callbackCollection[token](value);
        }
    }
}
class BehaviourSubjectObs extends SubjectObs {
    _initialValue;
    constructor(initialValue) {
        super();
        this._initialValue = initialValue;
    }
    subscribe(fn) {
        const unsub = super.subscribe(fn);
        super.next(this._initialValue);
        return unsub;
    }
    next(newvalue) {
        this._initialValue = newvalue;
        super.next(newvalue);
    }
}
class Subscriptions {
    _subcribers = [];
    add(fn) {
        this._subcribers.push(fn);
    }
    unsubscribe() {
        for (const fn of this._subcribers) {
            fn();
        }
        this._subcribers = [];
    }
}
const wrapIntoObservable = (value) => {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return fromPromiseObs(Promise.resolve(value));
    }
    return ofObs(value);
};
const fromEvent = (target, eventName, onNext, options = false) => {
    target.addEventListener(eventName, onNext, options);
    const unsubscribe = () => {
        target.removeEventListener(eventName, onNext, options);
    };
    return unsubscribe;
};
const sanitizeHTML = (htmlString) => {
    const stringToHTML = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body || document.createElement('body');
    };
    const removeScripts = (html) => {
        const scripts = html.querySelectorAll('script');
        for (const script of scripts) {
            script.remove();
        }
    };
    const isPossiblyDangerous = (name, value) => {
        value = value.replace(/\s+/g, '').toLowerCase();
        if (['src', 'href', 'xlink:href'].includes(name)) {
            if (value.includes('javascript:') || value.includes('data:'))
                return true;
        }
        if (name.startsWith('on'))
            return true;
    };
    const removeAttributes = (element) => {
        const attributes = element.attributes;
        for (const { name, value } of attributes) {
            if (!isPossiblyDangerous(name, value))
                continue;
            element.removeAttribute(name);
        }
    };
    const cleanAttributes = (html) => {
        const nodes = html.children;
        for (const node of nodes) {
            removeAttributes(node);
            cleanAttributes(node);
        }
    };
    const html = stringToHTML();
    removeScripts(html);
    cleanAttributes(html);
    return html.innerHTML;
};
const debounceRender = function (elementInstance) {
    if (elementInstance.renderCount === 1) {
        queueMicrotask(() => {
            elementInstance.update();
            elementInstance.renderCount = 0;
        });
    }
};
const proxifiedClass = (elementInstance, target) => {
    const handler = () => ({
        get(obj, prop) {
            const propertyType = Object.prototype.toString.call(obj[prop]);
            if (['[object Object]', '[object Array]'].indexOf(propertyType) > -1 && !('__metadata__' in obj[prop])) {
                return new Proxy(obj[prop], handler());
            }
            return obj[prop];
        },
        set(obj, prop, value) {
            obj[prop] = value;
            ++elementInstance.renderCount;
            debounceRender(elementInstance);
            return true;
        }
    });
    return class extends target {
        constructor(...args) {
            super(...args);
            return new Proxy(this, handler());
        }
    };
};
const promisify = () => {
    let resolver;
    const promise = new Promise((resolve) => {
        resolver = resolve;
    });
    return [promise, resolver];
};
export { BehaviourSubjectObs, CSS_SHEET_SUPPORTED, SubjectObs, Subscriptions, fromEvent, isFunction, isObject, isUndefined, klass, promisify, proxifiedClass, sanitizeHTML, wrapIntoObservable };
