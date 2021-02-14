const getValue = (obj, key) => {
    return obj[key] || null;
};
const mo = (() => {
    'use strict';
    let listeners = [], doc = window.document, MutationObserver = getValue(window, "MutationObserver") || getValue(window, "WebKitMutationObserver"), listenersObj = {};
    const _ready = (selector, callback) => {
        listeners.push({
            selector: selector,
            fn: callback
        });
        let observer = new MutationObserver(check);
        observer.observe(doc.documentElement, {
            childList: true,
            subtree: true
        });
        listenersObj[selector] = observer;
        check();
    };
    const _destroy = (selector) => {
        listenersObj[selector] && listenersObj[selector].disconnect();
    };
    const check = () => {
        for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            elements = doc.querySelectorAll(listener.selector);
            for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                let k = element.constructor();
                element.connectedCallback.call(k);
                console.log('element:', element);
                listener.fn(k);
            }
        }
    };
    return {
        ready: _ready,
        destroy: _destroy
    };
})();
export default mo;
