"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getValue = (obj, key) => {
    return obj[key] || null;
};
const mo = (() => {
    'use strict';
    let listeners = [], doc = window.document, MutationObserver = getValue(window, "MutationObserver") || getValue(window, "WebKitMutationObserver"), listenersObj = {};
    const _ready = (selector, callback) => {
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
    };
    const _destroy = (selector) => {
        listenersObj[selector] && listenersObj[selector].disconnect();
    };
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
    };
    return {
        ready: _ready,
        destroy: _destroy
    };
})();
exports.default = mo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL211dGF0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFRLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDMUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsWUFBWSxDQUFDO0lBQ2IsSUFBSSxTQUFTLEdBQU8sRUFBRSxFQUNwQixHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDckIsZ0JBQWdCLEdBQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxJQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsRUFDMUcsWUFBWSxHQUFPLEVBQUUsQ0FBQztJQUV4QixNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQWUsRUFBRSxRQUFZLEVBQUUsRUFBRTtRQUMvQyxrREFBa0Q7UUFDbEQsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNiLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLEVBQUUsRUFBRSxRQUFRO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsb0NBQW9DO1FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFO1lBQ3BDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRWxDLCtDQUErQztRQUMvQyxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUMsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBZSxFQUFFLEVBQUU7UUFDbkMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRSxDQUFDLENBQUE7SUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7UUFDakIsd0RBQXdEO1FBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4RSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHFEQUFxRDtZQUNyRCxRQUFRLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQjtTQUNGO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsT0FBTztRQUNMLEtBQUssRUFBRSxNQUFNO1FBQ2IsT0FBTyxFQUFFLFFBQVE7S0FDbEIsQ0FBQztBQUVKLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxrQkFBZSxFQUFFLENBQUMifQ==