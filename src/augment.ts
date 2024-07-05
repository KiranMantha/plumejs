import { createToken } from './utils';

const isFunction = (value: unknown) => typeof value === 'function';
const updateFnRegistry: Record<string, () => void> = {};
let token: string = null;

export type Signal<T> = {
  (): T;
  set(value: T | ((previousValue: T) => T)): void;
};

function signalWrapper(updateFn: () => void, fn: () => void): string {
  const prev = token;
  let generatedToken: string;
  token = createToken();
  updateFnRegistry[token] = updateFn;
  try {
    fn();
  } finally {
    generatedToken = token;
    token = prev;
  }
  return generatedToken;
}

function signal<T>(initialValue: T, reducer?: (previousState: T, newState: T) => T): Signal<T> {
  const updateFn = updateFnRegistry[token];
  let value = initialValue;
  function boundSignal(): T {
    return value;
  }
  boundSignal.set = function (v: T | ((initialValue: T) => T)) {
    if (reducer && isFunction(reducer)) {
      value = reducer(value, v as T);
    } else {
      value = isFunction(v) ? (v as (previousValue: T) => T)(value) : (v as T);
    }
    try {
      updateFn();
    } catch (e) {
      console.trace(e);
    }
  };
  return boundSignal;
}

function augmentor(updateFn: () => void, fn: () => void): () => void {
  const generatedToken = signalWrapper(updateFn, fn);
  return function () {
    delete updateFnRegistry[generatedToken];
  };
}

export { augmentor, signal };
