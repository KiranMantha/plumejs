import { createToken } from './utils';

const isFunction = (value: unknown) => typeof value === 'function';
const updateFnRegistry: Record<string, () => void> = Object.create(null);
let token = null;

type Signal<T> = {
  (): T;
  set(v: T | ((previousValue: T) => T)): void;
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

function signal<T>(initialValue: T): Signal<T> {
  const updateFn = updateFnRegistry[token];
  let value = initialValue;
  function boundSignal(): T {
    return value;
  }
  boundSignal.set = function (v: T | ((initialValue: T) => T)) {
    if (isFunction(v)) {
      value = (v as (previousValue: T) => T)(value);
    } else {
      value = v as T;
    }
    updateFn();
  };
  return boundSignal;
}

function augmentor(updateFn: () => void, fn: () => void): () => void {
  const generatedToken = signalWrapper(updateFn, fn);
  return function () {
    delete updateFnRegistry[generatedToken];
  };
}

export { Signal, augmentor, signal };
