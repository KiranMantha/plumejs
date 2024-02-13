type Signal<T> = {
    (): T;
    set(v: T | ((initialValue: T) => T)): void;
};
declare function signal<T>(initialValue: T): Signal<T>;
declare function augmentor(updateFn: () => void, fn: () => void): () => void;
export { Signal, augmentor, signal };
