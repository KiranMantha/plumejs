import { from, Observable, of } from 'rxjs';
import { jsonObject } from './types';

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

const useState = (obj: jsonObject): [jsonObject, (obj: () => void | jsonObject) => void] => {
  const initialState = obj;
  const reducer = (fn) => {
    let newState;
    if (isFunction(fn)) {
      newState = fn(initialState);
    } else {
      newState = fn;
    }
    Object.assign(initialState, newState);
  };
  return [initialState, reducer];
};

export {
  isObject,
  isFunction,
  isUndefined,
  isObservable,
  isPromise,
  wrapIntoObservable,
  useState,
  klass,
  CSS_SHEET_NOT_SUPPORTED
};
