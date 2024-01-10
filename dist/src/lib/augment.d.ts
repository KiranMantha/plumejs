declare function signal<T>(initialValue: T): {
    (): T;
    set(v: T | ((initialValue: T) => T)): void;
};
declare function augmentor(updateFn: () => void, fn: () => void): () => void;
export { augmentor, signal };
