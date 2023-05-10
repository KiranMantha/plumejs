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
            if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1 &&
                !('__metadata__' in obj[prop])) {
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
export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromEvent, sanitizeHTML, proxifiedClass, promisify };
