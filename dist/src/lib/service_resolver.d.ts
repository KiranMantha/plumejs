import { jsonObject } from "./types";
interface IInjector {
    getService(serviceName: string): void | {};
    register(name: string, instance: jsonObject): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
