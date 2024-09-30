export type Signal<T> = {
    (): T;
    set: (value: T | Partial<T> | ((previousValue: T) => T)) => void;
};
type SignalFunction = {
    <T>(): Signal<T | undefined>;
    <T>(initialValue: T): Signal<T>;
    <T>(initialValue: T, reducer?: (previousState: T, newState: T) => T): Signal<T>;
};
declare const signal: SignalFunction;
declare const augmentor: (updateFn: () => void, fn: () => void) => (() => void);
export { augmentor, signal };
