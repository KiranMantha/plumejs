const klass = Symbol('klass');
const isObject = (value: unknown) => value !== null && typeof value === 'object';
const isFunction = (value: unknown) => typeof value === 'function';
const isUndefined = (value: unknown) => typeof value == 'undefined';
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';

const CSS_SHEET_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {
    return false;
  }
})();

const ofObs = <T>(input: T) => ({
  subscribe: (fn: (param: T) => void) => {
    fn(input);
  }
});

const fromPromiseObs = <T>(input: T) => ({
  subscribe: (fn: (param: T) => void) => {
    Promise.resolve(input).then((value) => {
      fn(value);
    });
  }
});

const createToken = () => Math.random().toString(36).substring(2);

class SubjectObs<T> {
  private _callbackCollection: Record<string, (param: T) => void> = {};

  private unsubscribe(token: string) {
    delete this._callbackCollection[token];
  }

  asObservable() {
    return {
      subscribe: (fn: (() => void) | ((param: T) => void)) => this.subscribe(fn)
    };
  }

  subscribe(fn: (() => void) | ((param: T) => void)) {
    const token = createToken();
    this._callbackCollection[token] = fn;
    return () => this.unsubscribe(token);
  }

  next(value: T) {
    for (const token in this._callbackCollection) {
      this._callbackCollection[token](value);
    }
  }
}

class BehaviourSubjectObs<T> extends SubjectObs<T> {
  private _initialValue: T;

  constructor(initialValue: T) {
    super();
    this._initialValue = initialValue;
  }

  subscribe(fn: (() => void) | ((param: T) => void)) {
    const unsub = super.subscribe(fn);
    super.next(this._initialValue);
    return unsub;
  }

  next(newvalue: T): void {
    this._initialValue = newvalue;
    super.next(newvalue);
  }
}

class Subscriptions {
  private _subcribers: Array<() => void> = [];

  add(fn: () => void) {
    this._subcribers.push(fn);
  }

  unsubscribe() {
    for (const fn of this._subcribers) {
      fn();
    }
    this._subcribers = [];
  }
}

const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return fromPromiseObs(Promise.resolve(value));
  }

  return ofObs(value);
};

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

const sanitizeHTML = (htmlString: string): string => {
  /**
   * Convert the string to an HTML document
   * @return {Node} An HTML document
   */
  const stringToHTML = (): HTMLElement => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body || document.createElement('body');
  };

  /**
   * Remove <script> elements
   * @param  {Node} html The HTML
   */
  const removeScripts = (html: HTMLElement) => {
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
  const isPossiblyDangerous = (name: string, value: string) => {
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
  const removeAttributes = (element: Element) => {
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
  const cleanAttributes = (html: Element) => {
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

const proxifiedClass = (setRenderIntoQueue: () => void, target) => {
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
      setRenderIntoQueue();
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

const promisify = <T = unknown>(): [Promise<T>, (value?: T | PromiseLike<T>) => void] => {
  let resolver: (value?: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
};

export {
  BehaviourSubjectObs,
  createToken,
  CSS_SHEET_SUPPORTED,
  fromEvent,
  isFunction,
  isObject,
  isPromise,
  isUndefined,
  klass,
  promisify,
  proxifiedClass,
  sanitizeHTML,
  SubjectObs,
  Subscriptions,
  wrapIntoObservable
};
