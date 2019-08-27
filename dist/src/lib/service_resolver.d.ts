declare const Injector: {
    register: (name: string, fn: Object | Function, deps?: string[] | undefined) => void;
    get: (name: string) => void | {};
};
export { Injector };
