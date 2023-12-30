declare const klass: unique symbol;
declare const isObject: (value: any) => boolean;
declare const isFunction: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;
declare const CSS_SHEET_SUPPORTED: boolean;
declare class SubjectObs<T> {
    private _callbacks;
    asObservable(): {
        subscribe: (fn: (param?: T) => void) => () => void;
    };
    subscribe(fn: (param?: T) => void): () => void;
    unsubscribe(): void;
    next(value: T): void;
}
declare class BehaviourSubjectObs<T> extends SubjectObs<T> {
    private _initialValue;
    constructor(initialValue: T);
    subscribe(fn: (param?: T) => void): () => void;
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
declare const proxifiedClass: (elementInstance: any, target: any) => {
    new (...args: any[]): {
        [x: string]: any;
    };
    [x: string]: any;
};
declare const promisify: () => any[];
export { BehaviourSubjectObs, CSS_SHEET_SUPPORTED, SubjectObs, Subscriptions, fromEvent, isFunction, isObject, isUndefined, klass, promisify, proxifiedClass, sanitizeHTML, wrapIntoObservable };
