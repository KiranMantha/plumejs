declare const klass: unique symbol;
declare const isObject: (value: unknown) => boolean;
declare const isFunction: (value: unknown) => value is Function;
declare const isUndefined: (value: unknown) => value is undefined;
declare const isPromise: (obj: any) => boolean;
declare const CSS_SHEET_SUPPORTED: boolean;
declare const createToken: () => string;
declare class SubjectObs<T> {
    private _callbackCollection;
    private unsubscribe;
    asObservable(): {
        subscribe: (fn: (() => void) | ((param: T) => void)) => () => void;
    };
    subscribe(fn: (() => void) | ((param: T) => void)): () => void;
    next(value: T): void;
}
declare class BehaviourSubjectObs<T> extends SubjectObs<T> {
    private _initialValue;
    constructor(initialValue: T);
    subscribe(fn: (() => void) | ((param: T) => void)): () => void;
    next(newvalue: T): void;
}
declare class Subscriptions {
    private _subcribers;
    add(fn: () => void): void;
    unsubscribe(): void;
}
declare const wrapIntoObservable: (value: any) => any;
declare const fromEvent: (target: HTMLElement | Window, eventName: string, onNext: EventListenerOrEventListenerObject, options?: boolean) => (() => void);
declare const sanitizeHTML: (htmlString: string) => string;
declare const proxifiedClass: (setRenderIntoQueue: () => void, target: any) => {
    new (...args: any[]): {
        [x: string]: any;
    };
    [x: string]: any;
};
declare const promisify: <T = unknown>() => [Promise<T>, (value?: T | PromiseLike<T>) => void];
export { BehaviourSubjectObs, createToken, CSS_SHEET_SUPPORTED, fromEvent, isFunction, isObject, isPromise, isUndefined, klass, promisify, proxifiedClass, sanitizeHTML, SubjectObs, Subscriptions, wrapIntoObservable };
