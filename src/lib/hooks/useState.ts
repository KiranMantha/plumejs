import { jsonObject } from '../types';
import { isFunction } from '../utils';

const useState = <T extends jsonObject>(obj: T): [T, (obj: (fn: T) => void | Partial<T>) => void] => {
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

export { useState };
