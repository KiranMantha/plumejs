const klass = Symbol('klass');
const isObject = (value: any) => value !== null && typeof value === 'object';
const isFunction = (value: any) => typeof value === 'function';
const isUndefined = (value: any) => typeof value == 'undefined';

const CSS_SHEET_NOT_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return false;
  } catch (e) {
    return true;
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

const sanitizeHTML = (htmlString) => {
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

export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromEvent, sanitizeHTML };
