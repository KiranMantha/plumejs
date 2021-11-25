interface IInjector {
    getService(serviceName: string): Record<string, any>;
    register(name: string, instance: Record<string, any>): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
