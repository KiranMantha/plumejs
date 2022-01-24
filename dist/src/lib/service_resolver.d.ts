import { ConstructorType } from './types';
interface IInjector {
    getService(klass: ConstructorType<any>): Record<string, any>;
    register(metadata: {
        name: string;
    }, instance: Record<string, any>): void;
    clear(): void;
}
declare const Injector: IInjector;
export { Injector };
