const getValue = (obj: any, key: string) => {
	return obj[key] || null;
};

const mo = (() => {
  'use strict';
  let listeners:any = [],
    doc = window.document,
    MutationObserver:any = getValue(window, "MutationObserver") ||  getValue(window, "WebKitMutationObserver"),
    listenersObj:any = {};

  const _ready = (selector:string, callback:any) => {
    // Store the selector and callback to be monitored
    listeners.push({
      selector: selector,
      fn: callback
    });
    
    // Watch for changes in the document
    let observer = new MutationObserver(check);
    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true
    });
    listenersObj[selector] = observer;
    
    // Check if the element is currently in the DOM
    check();
  }

  const _destroy = (selector:string) => {
    listenersObj[selector] && listenersObj[selector].disconnect();
  }

  const check = () => {
    // Check the DOM for elements matching a stored selector
    for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
      listener = listeners[i];
      // Query for elements matching the specified selector
      elements = doc.querySelectorAll(listener.selector);
      for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        let k = element.constructor();
        element.connectedCallback.call(k);
        console.log('element:', element);
        listener.fn(k);
      }
    }
  }

  return {
    ready: _ready,
    destroy: _destroy
  };

})();

export default mo;