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
export default mo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0YXRpb24tb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL211dGF0aW9uLW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQzFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUN6QixDQUFDLENBQUM7QUFFRixNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLFlBQVksQ0FBQztJQUNiLElBQUksU0FBUyxHQUFPLEVBQUUsRUFDcEIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQ3JCLGdCQUFnQixHQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsSUFBSyxRQUFRLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLEVBQzFHLFlBQVksR0FBTyxFQUFFLENBQUM7SUFFeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFlLEVBQUUsUUFBWSxFQUFFLEVBQUU7UUFDL0Msa0RBQWtEO1FBQ2xELFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDYixRQUFRLEVBQUUsUUFBUTtZQUNsQixFQUFFLEVBQUUsUUFBUTtTQUNiLENBQUMsQ0FBQztRQUVILG9DQUFvQztRQUNwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRTtZQUNwQyxTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUVsQywrQ0FBK0M7UUFDL0MsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQWUsRUFBRSxFQUFFO1FBQ25DLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEUsQ0FBQyxDQUFBO0lBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLHdEQUF3RDtRQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixxREFBcUQ7WUFDckQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7U0FDRjtJQUNILENBQUMsQ0FBQTtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRSxRQUFRO0tBQ2xCLENBQUM7QUFFSixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsZUFBZSxFQUFFLENBQUMifQ==