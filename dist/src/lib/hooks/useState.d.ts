import { jsonObject } from '../types';
declare const useState: <T extends jsonObject>(obj: T) => [T, (obj: (fn: T) => void | Partial<T>) => void];
export { useState };
