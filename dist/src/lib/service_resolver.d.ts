import { jsonObject } from './types';
interface IInjector {
    getService(serviceName: string): jsonObject;
    register(name: string, instance: jsonObject): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
