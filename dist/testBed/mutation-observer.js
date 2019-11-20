"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getValue = function (obj, key) {
    return obj[key] || null;
};
var mo = (function () {
    'use strict';
    var listeners = [], doc = window.document, MutationObserver = getValue(window, "MutationObserver") || getValue(window, "WebKitMutationObserver"), listenersObj = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL211dGF0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFRLEVBQUUsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxFQUFFLEdBQUcsQ0FBQztJQUNWLFlBQVksQ0FBQztJQUNiLElBQUksU0FBUyxHQUFPLEVBQUUsRUFDcEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQ3JCLGdCQUFnQixHQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsSUFBSyxRQUFRLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLEVBQzFHLFlBQVksR0FBTyxFQUFFLENBQUM7SUFFeEIsSUFBTSxNQUFNLEdBQUcsVUFBQyxRQUFlLEVBQUUsUUFBWTtRQUUzQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2IsUUFBUSxFQUFFLFFBQVE7WUFDbEIsRUFBRSxFQUFFLFFBQVE7U0FDYixDQUFDLENBQUM7UUFHSCxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRTtZQUNwQyxTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUdsQyxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQTtJQUVELElBQU0sUUFBUSxHQUFHLFVBQUMsUUFBZTtRQUMvQixZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hFLENBQUMsQ0FBQTtJQUVELElBQU0sS0FBSyxHQUFHO1FBRVosS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxTQUFBLEVBQUUsUUFBUSxTQUFBLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4RSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLFFBQVEsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7U0FDRjtJQUNILENBQUMsQ0FBQTtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUM7QUFFSixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsa0JBQWUsRUFBRSxDQUFDIn0=