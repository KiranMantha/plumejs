import { ConstructorType } from './types';
interface IInjector {
    getService(klass: ConstructorType<any>): Record<string, any>;
    register(klass: any, instance: ConstructorType<any>): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
