declare const klass: unique symbol;
declare const isObject: (value: any) => boolean;
declare const isFunction: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;
declare const CSS_SHEET_NOT_SUPPORTED: boolean;
declare const fromVanillaEvent: (target: HTMLElement | Window, eventName: string, onNext: EventListenerOrEventListenerObject, options?: boolean) => (() => void);
export { isObject, isFunction, isUndefined, klass, CSS_SHEET_NOT_SUPPORTED, fromVanillaEvent };
