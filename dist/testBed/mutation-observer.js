var mo = (function () {
    'use strict';
    var listeners = [], doc = window.document, MutationObserver = window.MutationObserver || window.WebKitMutationObserver, listenersObj = {};
    var _ready = function (selector, callback) {
        listeners.push({
            selector: selector,
            fn: callback
        });
        var observer = new MutationObserver(check);
        observer.observe(doc.documentElement, {
            childList: true,
            subtree: true
        });
        listenersObj[selector] = observer;
        check();
    };
    var _destroy = function (selector) {
        listenersObj[selector] && listenersObj[selector].disconnect();
    };
    var check = function () {
        for (var i = 0, len = listeners.length, listener = void 0, elements = void 0; i < len; i++) {
            listener = listeners[i];
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element = void 0; j < jLen; j++) {
                element = elements[j];
                var k = element.constructor();
                element.connectedCallback.call(k);
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
//# sourceMappingURL=mutation-observer.js.map