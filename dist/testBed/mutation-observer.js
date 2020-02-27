"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getValue = function (obj, key) {
    return obj[key] || null;
};
var mo = (function () {
    'use strict';
    var listeners = [], doc = window.document, MutationObserver = getValue(window, "MutationObserver") || getValue(window, "WebKitMutationObserver"), listenersObj = {};
    var _ready = function (selector, callback) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: callback
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
    };
    var _destroy = function (selector) {
        listenersObj[selector] && listenersObj[selector].disconnect();
    };
    var check = function () {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener = void 0, elements = void 0; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element = void 0; j < jLen; j++) {
                element = elements[j];
                var k = element.constructor();
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
exports.default = mo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL211dGF0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFRLEVBQUUsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxFQUFFLEdBQUcsQ0FBQztJQUNWLFlBQVksQ0FBQztJQUNiLElBQUksU0FBUyxHQUFPLEVBQUUsRUFDcEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQ3JCLGdCQUFnQixHQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsSUFBSyxRQUFRLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLEVBQzFHLFlBQVksR0FBTyxFQUFFLENBQUM7SUFFeEIsSUFBTSxNQUFNLEdBQUcsVUFBQyxRQUFlLEVBQUUsUUFBWTtRQUMzQyxrREFBa0Q7UUFDbEQsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNiLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEVBQUUsRUFBRSxRQUFRO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsb0NBQW9DO1FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFO1lBQ3BDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRWxDLCtDQUErQztRQUMvQyxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQTtJQUVELElBQU0sUUFBUSxHQUFHLFVBQUMsUUFBZTtRQUMvQixZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hFLENBQUMsQ0FBQTtJQUVELElBQU0sS0FBSyxHQUFHO1FBQ1osd0RBQXdEO1FBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsU0FBQSxFQUFFLFFBQVEsU0FBQSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixxREFBcUQ7WUFDckQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQjtTQUNGO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsT0FBTztRQUNMLEtBQUssRUFBRSxNQUFNO1FBQ2IsT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQztBQUVKLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxrQkFBZSxFQUFFLENBQUMifQ==