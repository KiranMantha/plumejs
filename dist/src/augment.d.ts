export type Signal<T> = {
    (): T;
    set(value: T | ((previousValue: T) => T)): void;
};
declare function signal<T>(initialValue: T, reducer?: (previousState: T, newState: T) => T): Signal<T>;
declare function augmentor(updateFn: () => void, fn: () => void): () => void;
export { augmentor, signal };
