interface IInjector {
    get(serviceName: string): void | {};
    register(name: string, fn: Function | Object, serviceNames?: Array<string>): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
