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

const fromVanillaEvent = (
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

export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromVanillaEvent };
