const klass = Symbol('klass');
const isObject = (value: any) => value !== null && typeof value === 'object';
const isFunction = (value: any) => typeof value === 'function';
const isUndefined = (value: any) => typeof value == 'undefined';

const CSS_SHEET_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {
    return false;
  }
})();

const fromEvent = (
  target: HTMLElement | Window,
  eventName: string,
  onNext: EventListenerOrEventListenerObject,
  options = false
): (() => void) => {
  target.addEventListener(eventName, onNext, options);
  const unsubscribe = () => {
    target.removeEventListener(eventName, onNext, options);
  };
  return unsubscribe;
};

const sanitizeHTML = (htmlString: string) => {
  /**
   * Convert the string to an HTML document
   * @return {Node} An HTML document
   */
  const stringToHTML = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body || document.createElement('body');
  };

  /**
   * Remove <script> elements
   * @param  {Node} html The HTML
   */
  const removeScripts = (html) => {
    const scripts = html.querySelectorAll('script');
    for (const script of scripts) {
      script.remove();
    }
  };

  /**
   * Check if the attribute is potentially dangerous
   * @param  {String}  name  The attribute name
   * @param  {String}  value The attribute value
   * @return {Boolean}       If true, the attribute is potentially dangerous
   */
  const isPossiblyDangerous = (name, value) => {
    value = value.replace(/\s+/g, '').toLowerCase();
    if (['src', 'href', 'xlink:href'].includes(name)) {
      if (value.includes('javascript:') || value.includes('data:')) return true;
    }
    if (name.startsWith('on')) return true;
  };

  /**
   * Remove potentially dangerous attributes from an element
   * @param  {Node} elem The element
   */
  const removeAttributes = (element) => {
    // Loop through each attribute
    // If it's dangerous, remove it
    const attributes = element.attributes;
    for (const { name, value } of attributes) {
      if (!isPossiblyDangerous(name, value)) continue;
      element.removeAttribute(name);
    }
  };

  /**
   * Remove dangerous stuff from the HTML document's nodes
   * @param  {Node} html The HTML document
   */
  const cleanAttributes = (html) => {
    const nodes = html.children;
    for (const node of nodes) {
      removeAttributes(node);
      cleanAttributes(node);
    }
  };

  // Convert the string to HTML
  const html = stringToHTML();

  // Sanitize it
  removeScripts(html);
  cleanAttributes(html);

  // If the user wants HTML nodes back, return them
  // Otherwise, pass a sanitized string back
  return html.innerHTML;
};

const debounceRender = function (elementInstance) {
  if (elementInstance.renderCount === 1) {
    queueMicrotask(() => {
      elementInstance.update();
      elementInstance.renderCount = 0;
    });
  }
};

const proxifiedClass = (elementInstance, target) => {
  const handler = () => ({
    get(obj: object, prop: string) {
      const propertyType = Object.prototype.toString.call(obj[prop]);
      if (['[object Object]', '[object Array]'].indexOf(propertyType) > -1 && !('__metadata__' in obj[prop])) {
        return new Proxy(obj[prop], handler());
      }
      return obj[prop];
    },
    set(obj: object, prop: string, value: unknown) {
      obj[prop] = value;
      ++elementInstance.renderCount;
      debounceRender(elementInstance);
      return true;
    }
  });

  return class extends target {
    constructor(...args) {
      super(...args);
      return new Proxy(this, handler());
    }
  };
};

const promisify = () => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
};

export {
  CSS_SHEET_SUPPORTED,
  fromEvent,
  isFunction,
  isObject,
  isUndefined,
  klass,
  promisify,
  proxifiedClass,
  sanitizeHTML
};
