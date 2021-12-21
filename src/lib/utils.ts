import { from, Observable, of } from 'rxjs';

const klass = Symbol('klass');
const isObject = (value: any) => value !== null && typeof value === 'object';
const isFunction = (value: any) => typeof value === 'function';
const isUndefined = (value: any) => typeof value == 'undefined';
const isObservable = (obj: any | Observable<any>): obj is Observable<any> =>
  !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj: any): obj is Promise<any> => !!obj && typeof obj.then === 'function';

const wrapIntoObservable = <T>(value: T | Promise<T> | Observable<T>): Observable<T> => {
  if (isObservable(value)) {
    return value;
  } else if (isPromise(value)) {
    return from(Promise.resolve(value));
  } else {
    return of(value);
  }
};

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

export {
  isObject,
  isFunction,
  isUndefined,
  isObservable,
  isPromise,
  wrapIntoObservable,
  klass,
  CSS_SHEET_NOT_SUPPORTED,
  fromEvent
};
