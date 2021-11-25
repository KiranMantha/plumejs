declare const useState: <T extends Record<string, any>>(obj: T) => [T, (obj: (fn: T) => void | Partial<T>) => void];
export { useState };
