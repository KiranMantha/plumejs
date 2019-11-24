"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = mo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL211dGF0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFRLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDMUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsWUFBWSxDQUFDO0lBQ2IsSUFBSSxTQUFTLEdBQU8sRUFBRSxFQUNwQixHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDckIsZ0JBQWdCLEdBQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsRUFDMUcsWUFBWSxHQUFPLEVBQUUsQ0FBQztJQUV4QixNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQWUsRUFBRSxRQUFZLEVBQUUsRUFBRTtRQUUvQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2IsUUFBUSxFQUFFLFFBQVE7WUFDbEIsRUFBRSxFQUFFLFFBQVE7U0FDYixDQUFDLENBQUM7UUFHSCxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRTtZQUNwQyxTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUdsQyxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBZSxFQUFFLEVBQUU7UUFDbkMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRSxDQUFDLENBQUE7SUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7UUFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hFLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7U0FDRjtJQUNILENBQUMsQ0FBQTtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUM7QUFFSixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsa0JBQWUsRUFBRSxDQUFDIn0=