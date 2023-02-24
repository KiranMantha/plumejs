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
export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromEvent, sanitizeHTML };
