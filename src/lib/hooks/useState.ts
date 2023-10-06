import { isFunction } from '../utils';

const useState = <T extends Record<string, unknown>>(
  obj: T
): [T, (obj: (fn: T) => Partial<T> | Partial<T>) => void] => {
  const initialState = obj;
  const reducer = (fn: (k: T) => Partial<T> | Partial<T>) => {
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

export { useState };
