import { ConstructorType } from './types';
interface IInjector {
    register(klass: any, instance: ConstructorType<any>): void;
    getService(klass: ConstructorType<any>): Record<string, any>;
    removeService(klass: ConstructorType<any>): any;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
