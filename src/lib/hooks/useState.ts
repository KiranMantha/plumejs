import { isFunction } from '../utils';

const useState = <T extends Record<string, any>>(obj: T): [T, (obj: (fn: T) => void | Partial<T>) => void] => {
  const initialState = obj;
  const reducer = (fn: (k: T) => void | Partial<T>) => {
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
