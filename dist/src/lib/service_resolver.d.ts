declare const Injector: {
    get: (name: string) => any;
    register: {
        (name: string, fn: Function, deps: string[]): void;
        (name: string, fn: Object): void;
    };
};
export { Injector };
