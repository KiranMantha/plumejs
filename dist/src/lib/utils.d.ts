declare const klass: unique symbol;
declare const isObject: (value: any) => boolean;
declare const isFunction: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;
declare const CSS_SHEET_SUPPORTED: boolean;
declare const fromEvent: (target: HTMLElement | Window, eventName: string, onNext: EventListenerOrEventListenerObject, options?: boolean) => (() => void);
declare const sanitizeHTML: (htmlString: string) => string;
declare const proxifiedClass: (elementInstance: any, target: any) => {
    new (...args: any[]): {
        [x: string]: any;
    };
    [x: string]: any;
};
declare const promisify: () => any[];
export { CSS_SHEET_SUPPORTED, fromEvent, isFunction, isObject, isUndefined, klass, promisify, proxifiedClass, sanitizeHTML };
