var mo = (function() {
  'use strict';
  var listeners = [],
    doc = window.document,
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    listenersObj = {};

  var _ready = function(selector, fn) {
    // Store the selector and callback to be monitored
    listeners.push({
      selector: selector,
      fn: fn
    });
    
    // Watch for changes in the document
    var observer = new MutationObserver(check);
    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true
    });
    listenersObj[selector] = observer;
    
    // Check if the element is currently in the DOM
    check();
  }

  var _destroy = function(selector) {
    listenersObj[selector] && listenersObj[selector].disconnect();
  }

  var check = function() {
    // Check the DOM for elements matching a stored selector
    for (let i = 0, len = listeners.length, listener, elements; i < len; i++) {
      listener = listeners[i];
      // Query for elements matching the specified selector
      elements = doc.querySelectorAll(listener.selector);
      for (let j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        // Make sure the callback isn't invoked with the 
        // same element more than once
        if (!element.ready) {
          element.ready = true;
          // Invoke the callback with the element
          listener.fn.call(element, element);
        }
      }
    }
  }

  return {
    ready: _ready,
    destroy: _destroy
  };

})();

export default mo;