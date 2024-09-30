import { createToken, isFunction } from './utils';

const updateFnRegistry: Record<string, () => void> = {};
let token: string = null;

export type Signal<T> = {
  (): T;
  set: (value: T | Partial<T> | ((previousValue: T) => T)) => void;
};

type SignalFunction = {
  <T>(): Signal<T | undefined>;
  <T>(initialValue: T): Signal<T>;
  <T>(initialValue: T, reducer?: (previousState: T, newState: T) => T): Signal<T>;
};

const signalWrapper = (updateFn: () => void, fn: () => void): string => {
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
};

const signal: SignalFunction = <T>(initialValue?: T, reducer?: (previousState: T, newState: T) => T) => {
  const updateFn = updateFnRegistry[token];
  let value = initialValue;

  const boundSignal: Signal<T> = () => {
    return value;
  };

  boundSignal.set = (v: T | Partial<T> | ((initialValue: T) => T)) => {
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
};

const augmentor = (updateFn: () => void, fn: () => void): (() => void) => {
  const generatedToken = signalWrapper(updateFn, fn);
  return function () {
    delete updateFnRegistry[generatedToken];
  };
};

export { augmentor, signal };
