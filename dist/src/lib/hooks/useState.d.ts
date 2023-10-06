declare const useState: <T extends Record<string, unknown>>(obj: T) => [T, (obj: (fn: T) => Partial<T>) => void];
export { useState };
